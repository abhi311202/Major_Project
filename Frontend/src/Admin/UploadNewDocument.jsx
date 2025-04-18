import React, { useState, useRef, useEffect } from "react";
import JoditEditor from "jodit-react";
import { useForm } from "react-hook-form";
import axios from "axios";
import pdfToText from "react-pdftotext"; // Import react-pdftotext
import mammoth from "mammoth";
import { FiUpload, FiLoader } from "react-icons/fi";

// import toast from "react-hot-toast";
// import "../App.css";

import { getDocument, GlobalWorkerOptions } from "pdfjs-dist";
import { use } from "react";
// GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js`;
GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

function UploadNewDocument() {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState("");
  const [summary, setSummary] = useState("");
  const [Class, SetClass] = useState("");
  const [Other, setOther] = useState(null);

  const [loading, setLoading] = useState(false); // Add loading state
  const [loading1, setLoading1] = useState(false); // Add loading state
  const [summarizationError, setSummarizationError] = useState(null);
  const [classificationError, setClassificationError] = useState(null);

  const [classification, setClassification] = useState("");
  const [classificationReason, setClassificationReason] = useState("");
  const [classError, setClassError] = useState("");
  const [PdfUrl, setPdfUrl] = useState("");
  const [fileKey, setFileKey] = useState("");

  const storedObjectString = localStorage.getItem("Admin");
  const myObject = JSON.parse(storedObjectString);

  function cleanString(inputString) {
    return inputString.replace(/\s+/g, " ").trim();
  }

  // function for converting markdown to text format
  function markdownToPlainText(markdown) {
    return (
      markdown
        // Convert headings (remove # but keep spacing)
        .replace(/^#{1,6}\s*/gm, "")
        // Convert bold and italic text
        .replace(/\*\*\*(.*?)\*\*\*/g, "$1") // bold + italic (***text***)
        .replace(/\*\*(.*?)\*\*/g, "$1") // bold (**text**)
        .replace(/\*(.*?)\*/g, "$1") // italic (*text*)
        .replace(/__(.*?)__/g, "$1") // bold (__text__)
        .replace(/_(.*?)_/g, "$1") // italic (_text_)
        // Convert inline code and code blocks
        .replace(/`([^`]+)`/g, "$1") // inline code (`text`)
        .replace(/```[\s\S]*?```/g, "") // remove fenced code blocks
        // Convert lists (keep list items but remove bullets)
        .replace(/^\s*[-*+]\s+/gm, "- ") // unordered lists
        .replace(/^\s*\d+\.\s+/gm, "") // ordered lists
        // Convert blockquotes (remove > but keep indentation)
        .replace(/^\s*>+\s?/gm, "")
        // Convert links (keep text, remove URL)
        .replace(/\[([^\]]+)\]\([^\)]+\)/g, "$1")
        // Remove images ![alt](url)
        .replace(/!\[.*?\]\(.*?\)/g, "")
        // Remove extra spaces and new lines
        .trim()
    );
  }

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch,
    reset,
  } = useForm();

  const dummy1 = watch(summary);
  console.log(dummy1, "watch summary");

  useEffect(() => {
    reset({
      summary: summary,
      Class: classification,
      ClassificationReason: classificationReason,
    });
    // console.log(summary, " what ");
  }, [summary]);

  // useEffect(() => {
  //   // register("content", { required: true });
  //   // register("summary", { required: true });
  //   // register("Class", { required: true });
  //   // register("ClassificationReason", { required: true });
  // }, [register]);

  useEffect(() => {
    if (summarizationError) {
      const timer = setTimeout(() => setSummarizationError(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [summarizationError]);

  useEffect(() => {
    if (classificationError) {
      const timer = setTimeout(() => setClassificationError(""), 5000);
      return () => clearTimeout(timer);
    }
  }, [classificationError]);

  const handleSummarize = async () => {
    console.log("Quick summarize");
    setLoading(true);
    setSummarizationError(null); // Reset error state before starting
    setSummary(""); // Clear previous summary

    let pages = [];
    if (!file) {
      setSummarizationError("No file selected.");
      setLoading(false);
      return;
    }

    const reader = new FileReader();
    reader.readAsArrayBuffer(file);

    reader.onload = async function () {
      try {
        const pdfData = new Uint8Array(reader.result);
        const pdf = await getDocument({
          data: pdfData,
          standardFontDataUrl: "node_modules/pdfjs-dist/standard_fonts/",
        }).promise;

        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const textContent = await page.getTextContent();
          const text = textContent.items.map((item) => item.str).join(" ");

          pages.push({
            page_number: i,
            page_char_count: text.length,
            page_token_count: text.length / 4,
            page_word_count: text.split(" ").length,
            page_sentence_count_raw: text.split(".").length,
            text: cleanString(text),
          });
        }

        const jsonData = {
          doc_id: 12345,
          doc_name: file.name,
          metadata: {},
          pages: pages,
        };

        await axios
          .post("http://52.66.174.249:7000/summarize", jsonData)
          .then((res) => {
            console.log(JSON.stringify(res.data));
            reset({ summary: res.data.summarization });
            setSummary(markdownToPlainText(res.data.summarization));
          })
          .catch((err) => {
            console.error(err);
            setSummarizationError("Failed to fetch summary."); // Show error message in UI
          })
          .finally(() => {
            setLoading(false); // Stop loading after request completes
          });
      } catch (error) {
        console.error("Error processing file:", error);
        setSummarizationError(
          "An error occurred while processing the document."
        );
        setLoading(false);
      }
    };

    reader.onerror = () => {
      console.error("Error reading the file.");
      setSummarizationError("Failed to read the file.");
      setLoading(false);
    };
  };

  // Stimulate classification process
  const handleClassify = async () => {
    console.log("Quick Classify");
    setLoading1(true); // Set loading to true when request starts
    setClassification(null); // Clear previous classification
    setClassificationReason(null); // Clear previous reason
    setClassificationError(null); // Clear previous error

    let pages = [];

    if (file) {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);

      reader.onload = async function () {
        const pdfData = new Uint8Array(reader.result);

        try {
          const pdf = await getDocument({
            data: pdfData,
            standardFontDataUrl: "node_modules/pdfjs-dist/standard_fonts/",
          }).promise;

          for (let i = 1; i <= pdf.numPages; i++) {
            const page = await pdf.getPage(i);
            const textContent = await page.getTextContent();
            const text = textContent.items.map((item) => item.str).join(" ");

            pages.push({
              page_number: i,
              page_char_count: text.length,
              page_token_count: text.length / 4,
              page_word_count: text.split(" ").length,
              page_sentence_count_raw: text.split(".").length,
              text: cleanString(text),
            });
          }

          const jsonData1 = {
            doc_id: 12345, // You might want to generate a unique ID
            doc_name: file.name,
            metadata: {},
            pages: pages,
          };

          // Send data to the classification API
          const response = await axios.post(
            "http://52.66.174.249:8000/classify",
            jsonData1
          );

          // console.log(JSON.stringify(response.data.classification));

          // const classificationvalue = "• " + response.data.classification.category.join("<br/>• ");
          // console.log(classificationvalue);

          // Update state with classification results

          setClassification(
            // markdownToPlainText(JSON.stringify(response.data.classification.category))
            // classificationvalue
            response.data.classification.category.join("\n")
          );
          setClassificationReason(
            markdownToPlainText(
              JSON.stringify(response.data.classification.reason)
            )
          );
        } catch (err) {
          console.error("Error during classification:", err);
          setClassificationError(
            "Failed to classify the document. Please try again."
          );
        } finally {
          setLoading1(false); // Unset loading state
        }
      };
    } else {
      setClassificationError("Please upload a file before classification.");
      setLoading1(false);
    }
  };

  let fileK, url;
  const Helper = async (title) => {
    try {
      if (file) {
        const formData = new FormData();
        formData.append("title", title);
        formData.append("file", file);
        console.log(title, file);
        const result = await axios.post(
          "http://localhost:4001/upload-pdf",
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        setPdfUrl(result.data.pdf);
        setFileKey(result.data.filekey);
        fileK = result.data.filekey;
        url = result.data.pdf;
        console.log("Upload success:", result.data.pdf);
        return true;
      }
    } catch (error) {
      console.error("Upload error:", error);
      return false;
    }
  };

  // Valid Combinations of the Class type
  const validClasses = [
    "Civil Case",
    "Criminal Case",
    "Constitutional Case",
    "Civil Case\nCriminal Case",
    "Criminal Case\nCivil Case",
    "Civil Case\nConstitutional Case",
    "Constitutional Case\nCivil Case",
    "Criminal Case\nConstitutional Case",
    "Constitutional Case\nCriminal Case",
    "Civil Case\nCriminal Case\nConstitutional Case",
    "Civil Case\nConstitutional Case\nCriminal Case",
    "Criminal Case\nCivil Case\nConstitutional Case",
    "Criminal Case\nConstitutional Case\nCivil Case",
    "Constitutional Case\nCivil Case\nCriminal Case",
    "Constitutional Case\nCriminal Case\nCivil Case",
  ];

  const onSubmit = async (data) => {
    console.log("IN ON SUBMIT");
    // console.log(data,"abhi");

    const success = await Helper(data.title);
    if (!success) {
      alert("Error: Pdf upload in S3 failed!!");
      return;
    }

    // console.log(PdfUrl,"jumon");

    const c = data.classification
      .split("\n") // Split by newline
      .map((line) => line.replace(/\s+/g, " ").trim()) // Replace multiple spaces & trim
      .filter((line) => line.length > 0) // Remove empty lines
      .join("\n");
    let oth = false;
    if (c === "Category: Out of Scope!" || c === "Other") {
      setOther(true);
      oth = true;
    } else if (!validClasses.includes(c)) {
      setClassError(
        "Invalid case type! Allowed values: Civil Case, Criminal Case, Constitutional Case and their valid combinations.Multiple Values should be seperated by new line."
      ); // Set error message

      // Clear error after 5 seconds
      setTimeout(() => {
        setClassError("");
      }, 10000);

      return alert("Invalid case type!");
    }

    const documentInfo = {
      title: data.title,
      serialnum: data.serialnum,
      content: data.content,
      summary: data.summary,
      Class: oth ? "Other" : c,
      ClassificationReason: data.classificationReason,
      adminid: myObject.id,
      uploadDate: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      pdfUrl: PdfUrl ? PdfUrl : url,
      filekey: fileKey ? fileKey : fileK,
    };

    // const documentInfo = {
    //   title: data.title,
    //   serialnum: data.serialnum,
    //   content: data.content,
    //   summary: data.summary,
    //   Class: data.Class,
    //   ClassificationReason: data.ClassificationReason,
    //   adminid: myObject.id,
    //   uploadDate: new Date().toLocaleDateString("en-US", {
    //     year: "numeric",
    //     month: "long",
    //     day: "numeric",
    //   }),
    // };

    console.log(documentInfo, "abhi1");
    await axios
      .post("http://localhost:4001/admin/adminDocuments", documentInfo)
      .then((res) => {
        // console.log(res.data);
        if (res.data) {
          // console.log(res.data);
          // Remove "Please wait..." toast
          alert(res.data.message);
          handleResetButton();
          handleResetButton();
          // **Force re-render of file input field**
          document.getElementById("fileUploaded").value = "";
        }
      })
      .catch((err) => {
        if (err.response) {
          console.log(err);
          console.log("Error from backend: " + err.response.data.message);
          alert("Error: " + err.response.data.message);
        }
      });
  };

  const handleResetButton = () => {
    setValue("title", "");
    setValue("serialnum", "");
    setValue("content", "");
    setValue("summary", "");
    setValue("Class", "");
    setFile(null);
    setFilePreview("");
    setSummary("");
    setContent("");
    SetClass("");
    setClassification("");
    setClassificationReason("");
  };

  const handleFileUpload = async (e) => {
    const uploadedFile = e.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);

      if (uploadedFile.type === "application/pdf") {
        try {
          const text = await pdfToText(uploadedFile);
          setContent(text);
          setValue("content", text);
          setFilePreview("PDF text extracted successfully.");
        } catch (error) {
          console.error("Error extracting text from PDF:", error);
        }
      } else if (
        uploadedFile.type ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
      ) {
        const reader = new FileReader();
        reader.onload = async (event) => {
          try {
            const { value } = await mammoth.extractRawText({
              arrayBuffer: event.target.result,
            });
            setFilePreview(value);
            setContent(value);
            setValue("content", value);
          } catch (error) {
            console.error("Error reading .docx file:", error);
          }
        };
        reader.readAsArrayBuffer(uploadedFile);
      }
    }
  };

  // const handleShowResult = () => {
  //   if (file) {
  //     // setTimeout(() => {
  //     const mockSummary =
  //       "This is the automatically generated summary for your uploaded document.";
  //     setSummary(mockSummary);

  //     const mockClass = "Criminal";
  //     SetClass(mockClass);
  //     // }, 1000);
  //   }
  // };

  const handleFileClick = () => {
    if (file) {
      // Create a URL for the file to open it in a new tab
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL, "_blank");
    }
  };

  return (
    <div className="flex min-h-screen max-h-max dark:bg-[#222] overflow-hidden">
      <div className="flex-1 p-6 py-4">
        <h2 className="text-3xl font-semibold text-gray-800 dark:text-white mb-6">
          Upload New Document
        </h2>
        <form
          // onSubmit={handleSubmit(onSubmit)}
          method="dialog"
          className="space-y-4 text-black"
        >
          <label className="block text-gray-600 font-medium dark:text-white">
            Document Title:
            <input
              type="text"
              className="w-full p-2 rounded-xl shadow border border-gray-200 focus:outline-none focus:border-black dark:bg-black dark:border-gray-600"
              placeholder="Enter document title"
              {...register("title", { required: true })}
            />
          </label>
          {errors.title && (
            <span className="p-2 text-sm text-red-500">
              This field is required
            </span>
          )}

          <label className="block text-gray-600 font-medium dark:text-white">
            Serial No:
            <input
              type="text"
              className="w-full p-2 rounded-xl shadow border border-gray-200 focus:outline-none focus:border-black dark:bg-black dark:border-gray-600 dark:text-white"
              placeholder="Enter serial number"
              {...register("serialnum", { required: true })}
            />
          </label>
          {errors.serialnum && (
            <span className="p-2 text-sm text-red-500">
              This field is required
            </span>
          )}

          <div className="flex flex-col sm:flex-row items-center justify-between mt-6 gap-4 sm:gap-6">
            {/* Upload Button */}
            <label
              className={`w-full sm:w-auto text-center bg-black text-white font-medium px-6 py-2 rounded-md transition duration-300 cursor-pointer ${
                loading || loading1
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-700"
              }`}
            >
              <span className="whitespace-nowrap">
                {loading || loading1 ? "Processing..." : "Upload Document"}
              </span>
              <input
                type="file"
                id="fileUploaded"
                onChange={handleFileUpload}
                className="hidden"
                accept=".pdf,.docx"
                disabled={loading || loading1}
              />
            </label>

            {/* File Display - Now Fully Inline with View Document */}
            {file && (
              <div className="w-full sm:w-auto flex items-center gap-2">
                <p className="text-gray-600 text-xs sm:text-sm border border-gray-300 p-1 sm:p-2 rounded-md dark:text-white truncate max-w-[150px] sm:max-w-[200px] inline-flex items-center gap-1">
                  <strong>Uploaded File:</strong> {file.name}
                </p>
                <button
                  type="button"
                  onClick={handleFileClick}
                  className="text-blue-600 underline text-xs sm:text-sm whitespace-nowrap"
                >
                  View Document
                </button>
              </div>
            )}

            {/* Show Result Button */}
            <button
              className={`w-full sm:w-auto bg-black text-white font-medium px-6 py-2 rounded-md transition duration-300 ${
                file
                  ? "hover:bg-gray-700 cursor-pointer"
                  : "opacity-50 cursor-not-allowed"
              }`}
              onClick={() => {
                handleSummarize();
                handleClassify();
              }}
              disabled={!file}
            >
              <span className="whitespace-nowrap">Show Result</span>
            </button>
          </div>

          <label className="block text-gray-600 font-medium dark:text-white">
            Document Content:
            <textarea
              // className="dark:bg-black dark:border-gray-600"

              rows="16"
              deavalue={content}
              onChange={(newContent) => {
                setContent(newContent);
                setValue("content", newContent);
              }}
              className="w-full p-4 rounded-xl shadow border border-gray-200 resize-none text-gray-700 dark:bg-black dark:border-gray-600 dark:text-white"
              {...register("content", { required: true })}
            />
          </label>
          {errors.content && (
            <span className="p-2 text-sm text-red-500">
              This field is required
            </span>
          )}

<div className="mb-6">
  <h2 className="text-xl font-semibold text-gray-800 dark:text-white mb-3">
    Key Entities
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-white dark:bg-black border border-gray-300 dark:border-gray-600 rounded-xl p-6 shadow">

    {/* Field Generator */}
    {[
      "Case No",
      "Case Type",
      "Case Status",
      "Filing Date",
      "Judgement Date",
      "Court No",
      "Court Name",
      "Bench",
      "Petitioner",
      "Respondent",
      "Advantage of Petitioner",
      "Advantage of Respondent",
      "Previous case citation",
      "Penalty Detail",
      "Head Note"
    ].map((label, index) => (
      <div key={index} className="flex flex-col">
        <label className="text-gray-600 dark:text-white font-medium mb-1">
          {label}:
        </label>
        <input
          type="text"
          className="p-3 rounded-lg border border-gray-300 dark:border-gray-600 dark:bg-black text-gray-800 dark:text-white shadow-sm"
          placeholder={`Enter ${label.toLowerCase()}`}
          // You can add value, onChange, or register here
        />
      </div>
    ))}

  </div>
</div>


          <label className="block text-gray-600 font-medium dark:text-white">
            Summary:
            <div className="relative w-full">
              <textarea
                rows="14"
                defaultValue={summary} // Instead of value
                onChange={(e) => {
                  setSummary(e.target.value);
                  setValue("summary", e.target.value);
                }}
                {...(loading ? {} : register("summary", { required: true }))}
                className={`w-full p-4 rounded-xl shadow border border-gray-200 resize-none text-gray-700 dark:bg-black dark:border-gray-600 dark:text-white ${
                  summarizationError ? "border-red-500" : ""
                }`}
              />

              {/* Loading Overlay */}
              {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/80 dark:bg-black/80">
                  <span className="text-3xl font-bold text-gray-600 dark:text-gray-300 animate-pulse">
                    Processing...
                  </span>
                </div>
              )}

              {/* Error Overlay */}
              {!loading && summarizationError && (
                <div className="absolute inset-0 flex items-center justify-center bg-red-100/90 dark:bg-red-900/80 border border-red-500 rounded-lg">
                  <span className="text-lg font-semibold text-red-700 dark:text-red-300">
                    {summarizationError}
                  </span>
                </div>
              )}
            </div>
          </label>

          {errors.summary && (
            <span className="p-2 text-sm text-red-500">
              This field is required
            </span>
          )}

         

          <label className="block text-gray-600 font-medium dark:text-white">
            Classification Reason:
            <div className="relative w-full">
              <textarea
                rows="8"
                // value={loading1 ? "" : classificationReason || ""}
                defaultValue={classificationReason}
                onChange={(e) => {
                  setClassificationReason(e.target.value);
                  setValue("ClassificationReason", e.target.value);
                }}
                {...(loading1
                  ? {}
                  : register("classificationReason", { required: true }))}
                className={`w-full p-4 rounded-xl shadow border border-gray-200 rounded-lg resize-none text-gray-700 dark:bg-black dark:border-gray-600 dark:text-white ${
                  classificationError ? "border-red-500" : ""
                }`}

                // {...(loading1
                //   ? {}
                //   : register("ClassificationReason", { required: true }))}
              />
              {loading1 && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/80 dark:bg-black/80">
                  <span className="text-3xl font-bold text-gray-600 dark:text-gray-300 animate-pulse">
                    Processing...
                  </span>
                </div>
              )}
              {/* Error Overlay */}
              {!loading1 && classificationError && (
                <div className="absolute inset-0 flex items-center justify-center bg-red-100/90 dark:bg-red-900/80 border border-red-500 rounded-lg">
                  <span className="text-lg font-semibold text-red-700 dark:text-red-300">
                    {classificationError}
                  </span>
                </div>
              )}
            </div>
          </label>

          {errors.ClassificationReason && (
            <span className="p-2 text-sm text-red-500">
              This field is required
            </span>
          )}

          <div className="flex justify-center justify-around">
            <button
              className={`bg-black text-white font-medium px-6 py-2 rounded-md transition duration-300 w-1/4 ${
                loading || loading1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              // type="submit"
              onClick={handleSubmit(onSubmit)}
              disabled={loading || loading1}
            >
              {loading || loading1 ? "Processing..." : "Submit"}
            </button>

            <button
              className={`bg-black text-white font-medium px-6 py-2 rounded-md transition duration-300 w-1/4 ${
                loading || loading1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              type="reset"
              onClick={handleResetButton}
              disabled={loading || loading1}
            >
              {loading || loading1 ? "Processing..." : "Reset"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default UploadNewDocument;
