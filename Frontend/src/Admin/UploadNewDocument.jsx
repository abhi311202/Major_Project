import React, { useState, useRef, useEffect } from "react";
import JoditEditor from "jodit-react";
import { useForm } from "react-hook-form";
import axios from "axios";
import pdfToText from "react-pdftotext"; // Import react-pdftotext
import mammoth from "mammoth";
import { FiUpload, FiLoader } from "react-icons/fi";
import { toast } from "react-hot-toast";



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
  const [selectedFileName, setSelectedFileName] = useState('');

  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [file, setFile] = useState(null);
  const [filePreview, setFilePreview] = useState("");
  const [summary, setSummary] = useState("");
  const [Class, SetClass] = useState("");
  const [Other, setOther] = useState(null);
  const [loading1, setLoading1] = useState(false); // Add loading state
  const [loading2, setLoading2] = useState(false); // Add loading state
  const [summarizationError, setSummarizationError] = useState(null);
  const [classificationError, setClassificationError] = useState(null);
  const [entitymetaError, setEntitymetaError] = useState(null);

  const [classification, setClassification] = useState("");
  const [entitymeta, setEntitymeta] = useState("");
  const [caseno, setCaseno] = useState("");
  const [casetype, setCasetype] = useState("");
  const [filingdate, setFilingdate] = useState("");
  const [casestatus, setCasestatus] = useState("");
  const [judgmentdate, setJudgmentdate] = useState("");
  const [courtname, setCourtname] = useState("");
  const [bench, setBench] = useState("");
  const [petitioner, setPetitioner] = useState("");
  const [respondent, setRespondent] = useState("");
  const [advofpetitioner, setAdvofpetitioner] = useState("");
  const [advofrespondent, setAdvofrespondent] = useState("");
  const [prevcasecitation, setPrevcasecitation] = useState("");
  const [penaltydetail, setPenaltydetail] = useState("");
  const [headnote, setHeadnote] = useState("");
  const [courtno, setCourtno] = useState("");
  const [judgementauthor, setJudgementauthor] = useState("");
  const [judgementtype, setJudgementtype] = useState("");
  const [langofjudgement, setLangofjudgement] = useState("");
  const [dateofhearing, setDateofhearing] = useState("");
  const [dateoforderpro, setDateoforderpro] = useState("");
  const [benchcomposition, setBenchcomposition] = useState("");
  const [referredacts, setReferredacts] = useState("");
  const [classificationReason, setClassificationReason] = useState("");
  const [classError, setClassError] = useState("");
  // const [PdfUrl, setPdfUrl] = useState("");
  // const [fileKey, setFileKey] = useState("");

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

  const handleEntitymeta = async () => {
    console.log("Meta and Entity extraction");
    setLoading2(true);
    setEntitymetaError(null); // Reset error state before starting
    setEntitymeta(""); // Clear previous summary

    let pages = [];
    if (!file) {
      setEntitymetaError("No file selected.");
      setLoading2(false);
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
          .post("http://52.66.174.249:7000/apirequired", jsonData)
          .then((res) => {
            console.log(JSON.stringify(res.data));
            reset({ entitymeta: res.data.entitymetapipeline });
            setSummary(markdownToPlainText(res.data.entitymetapipeline));
          })
          .catch((err) => {
            console.error(err);
            setEntitymetaError("Failed to fetch summary."); // Show error message in UI
          })
          .finally(() => {
            setLoading(false); // Stop loading after request completes
          });
      } catch (error) {
        console.error("Error processing file:", error);
        setEntitymetaError(
          "An error occurred while processing the document."
        );
        setLoading2(false);
      }
    };

    reader.onerror = () => {
      console.error("Error reading the file.");
      setEntitymetaError("Failed to read the file.");
      setLoading2(false);
    };
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

    // const success = await Helper(data.title);
    // if (!success) {
    //   alert("Error: Pdf upload in S3 failed!!");
    //   return;
    // }

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

      return toast.error("Invalid case type!");
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
      caseno: data.caseno,
      casetype: data.casetype,
      casestatus: data.casestatus,
      filingdate: data.filingdate,
      judgmentdate: data.judgmentdate,
      courtname: data.courtname,
      courtno: data.courtno,
      bench: data.bench,
      petitioner: data.petitioner,
      respondent: data.respondent,
      advofpetitioner: data.advofpetitioner,
      advofrespondent: data.advofrespondent,
      prevcasecitation: data.prevcasecitation,
      penaltydetail: data.penaltydetail,
      headnote: data.headnote,
      judgementauthor: data.judgementauthor,
      judgementtype: data.judgementtype,
      langofjudgement: data.langofjudgement,
      dateofhearing: data.dateofhearing,
      dateoforderpro: data.dateoforderpro,
      benchcomposition: data.benchcomposition,
      referredacts: data.referredacts,
      // pdfUrl: PdfUrl ? PdfUrl : url,
      // filekey: fileKey ? fileKey : fileK,
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
      .post("http://localhost:4001/Admin/adminDocuments", documentInfo)
      .then((res) => {
        // console.log(res.data);
        if (res.data) {
          // console.log(res.data);
          // Remove "Please wait..." toast
          toast.success(res.data.message);
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
          toast.error("Error: " + err.response.data.message);
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

  const handleShowResult = () => {
    if (file) {
      // setTimeout(() => {
      const mockSummary =
        "This is the automatically generated summary for your uploaded document.";
      setSummary(mockSummary);

      const mockClass = "Criminal";
      SetClass(mockClass);
      // }, 1000);
    }
  };
  const handleClear = () => {
    setCaseno("");
    setCasetype("");
    setCasestatus("");
    setFilingdate("");
    setJudgmentdate("");
    setCourtno("");
    setCourtname("");
    setBench("");
    setPetitioner("");
    setRespondent("");
    setAdvofpetitioner("");
    setAdvofrespondent("");
    setPrevcasecitation("");
    setPenaltydetail("");
    setHeadnote("");
  
    // Optional: if you're using useForm() from react-hook-form
    // reset();
  };
  

  const handleFileClick = () => {
    if (file) {
      // Create a URL for the file to open it in a new tab
      const fileURL = URL.createObjectURL(file);
      window.open(fileURL, "_blank");
    }
  };
  const [isInScope, setIsInScope] = useState(null);

  const [documentContent, setDocumentContent] = useState(null);
  const [responseValue, setResponseValue] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [expectedValue, setExpectedValue] = useState(null);
  const [matchMessage, setMatchMessage] = useState("");

  useEffect(() => {
    const fetchExpectedValue = async () => {
      try {
        const response = await axios.get("http://localhost:4001/SuperAdmin/get-threshhold1");
        const expectedValue = response.data.data.threshold_value;
        localStorage.setItem("Threshold_Id", response.data.data.threshold_id);
        console.log("Fetched Expected Value:", expectedValue);
        setExpectedValue(expectedValue);
      } catch (error) {
        console.error("Error fetching expected value:", error);
      }
    };
  
    fetchExpectedValue();
  }, []);
  

  

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setLoading(true);
      setSelectedFileName(file.name);

  
      const reader = new FileReader();
      reader.onload = () => {
        const content = reader.result;
        setDocumentContent(content);
  
        const simulatedResponseValue = 75;
        setResponseValue(simulatedResponseValue);
        setLoading(false);
  
        // Check match
        if (expectedValue !== null) {
          if (simulatedResponseValue >= expectedValue) {
            setIsInScope(true);  // ✅ Document is in scope
          } else {
            setIsInScope(false); // ❌ Document is out of scope
          }
        }
      };
  
      reader.readAsText(file);
    }
    else {
      setSelectedFileName('');
    }
  };
  
  

  return (
<div className="flex min-h-screen max-h-max overflow-hidden ">
  <div className="flex flex-col items-center justify-start w-full p-4">
    
    {/* File Chooser Always on Top */}
    <div className="w-full ml-[950px]">
  <label
    htmlFor="file-upload"
    className={`inline-block cursor-pointer text-white text-base font-semibold py-3 px-6 rounded-md transition-all duration-300
      ${isInScope ? 'bg-gray-400 cursor-not-allowed' : 'bg-black hover:bg-gray-700'}`}
  >
    Browse File
  </label>
  <input
    id="file-upload"
    type="file"
    accept=".txt,.pdf,.docx"
    onChange={handleFileChange}
    disabled={isInScope}
    className="hidden"
  />
  {selectedFileName && (
    <p className="mt-2 text-sm text-gray-700">{selectedFileName}</p>
  )}
</div>



    <br></br>


    {/* Loading or Error Messages */}
    {loading && <p className="text-black mb-4">Loading...</p>}
    {error && (
      <div className="bg-red-500 text-white p-4 mb-4 w-full max-w-3xl rounded-md">
        Error fetching expected value
      </div>
    )}

    {/* In Scope Form */}
    {isInScope === true && (
      <div className="w-full px-0 mx-[-125px]">
        <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Upload New Document
        </h2>

        <form method="dialog" className="space-y-6 text-black">

          {/* Title */}
          <div>
            <label className="block text-gray-600 dark:text-white font-medium mb-1">
              Document Title:
            </label>
            <input
              type="text"
              className="w-full p-2 rounded-md border border-gray-300 dark:bg-black dark:border-gray-600"
              placeholder="Enter document title"
              {...register("title", { required: true })}
            />
            {errors.title && (
              <span className="text-sm text-red-500">This field is required</span>
            )}
          </div>

          {/* Serial No */}
          <div>
            <label className="block text-gray-600 dark:text-white font-medium mb-1">
              Serial No:
            </label>
            <input
              type="text"
              className="w-full p-2 rounded-md border border-gray-300 dark:bg-black dark:border-gray-600"
              placeholder="Enter serial number"
              {...register("serialnum", { required: true })}
            />
            {errors.serialnum && (
              <span className="text-sm text-red-500">This field is required</span>
            )}
          </div>

          {/* Upload + View + Show Result */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            

            

            <button
              className={`w-full sm:w-auto bg-black text-white font-medium px-6 py-2 rounded-md ${
                file ? "hover:bg-gray-700" : "opacity-50 cursor-not-allowed"
              }`}
              onClick={() => {
                handleSummarize();
                handleClassify();
              }}
              disabled={!file}
            >
              Show Result
            </button>
          </div>

<div className="border rounded-lg p-6 shadow-md bg-white dark:bg-gray-900">
          <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Key Entities</h2>
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  {/* Case No */}
  <div>
    <label className="block text-sm font-semibold text-gray-700 dark:text-white mb-1">
      Case No:
    </label>
    <textarea
      rows="2"
      className="w-full border rounded-md resize-none border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
      onChange={(e) => {
        setCaseno(e.target.value);
        setValue("caseno", e.target.value);
      }}
    />
  </div>

  {/* Case Type */}
  <div>
    <label className="block text-sm font-semibold text-gray-700 dark:text-white mb-1">
      Case Type:
    </label>
    <textarea
      rows="2"
      className="w-full border rounded-md resize-none border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
      onChange={(e) => {
        setCasetype(e.target.value);
        setValue("casetype", e.target.value);
      }}
    />
  </div>

  {/* Case Status */}
  <div>
    <label className="block text-sm font-semibold text-gray-700 dark:text-white mb-1">
      Case Status:
    </label>
    <textarea
      rows="2"
      className="w-full border rounded-md resize-none border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
      onChange={(e) => {
        setCasestatus(e.target.value);
        setValue("casestatus", e.target.value);
      }}
    />
  </div>

  {/* Filing Date */}
  <div>
    <label className="block text-sm font-semibold text-gray-700 dark:text-white mb-1">
      Filing Date:
    </label>
    <textarea
      rows="2"
      className="w-full border rounded-md resize-none border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
      onChange={(e) => {
        setFilingdate(e.target.value);
        setValue("filingdate", e.target.value);
      }}
    />
  </div>

  {/* Judgment Date */}
  <div>
    <label className="block text-sm font-semibold text-gray-700 dark:text-white mb-1">
      Judgment Date:
    </label>
    <textarea
      rows="2"
      className="w-full border rounded-md resize-none border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
      onChange={(e) => {
        setJudgmentdate(e.target.value);
        setValue("judgmentdate", e.target.value);
      }}
    />
  </div>

  {/* Court No */}
  <div>
    <label className="block text-sm font-semibold text-gray-700 dark:text-white mb-1">
      Court No:
    </label>
    <textarea
      rows="2"
      className="w-full border rounded-md resize-none border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
      onChange={(e) => {
        setCourtno(e.target.value);
        setValue("courtno", e.target.value);
      }}
    />
  </div>

  {/* Court Name */}
  <div>
    <label className="block text-sm font-semibold text-gray-700 dark:text-white mb-1">
      Court Name:
    </label>
    <textarea
      rows="2"
      className="w-full border rounded-md resize-none border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
      onChange={(e) => {
        setCourtname(e.target.value);
        setValue("courtname", e.target.value);
      }}
    />
  </div>

  {/* Bench */}
  <div>
    <label className="block text-sm font-semibold text-gray-700 dark:text-white mb-1">
      Bench:
    </label>
    <textarea
      rows="2"
      className="w-full border rounded-md resize-none border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
      onChange={(e) => {
        setBench(e.target.value);
        setValue("bench", e.target.value);
      }}
    />
  </div>

  {/* Petitioner */}
  <div>
    <label className="block text-sm font-semibold text-gray-700 dark:text-white mb-1">
      Petitioner:
    </label>
    <textarea
      rows="2"
      className="w-full border rounded-md resize-none border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
      onChange={(e) => {
        setPetitioner(e.target.value);
        setValue("petitioner", e.target.value);
      }}
    />
  </div>

  {/* Respondent */}
  <div>
    <label className="block text-sm font-semibold text-gray-700 dark:text-white mb-1">
      Respondent:
    </label>
    <textarea
      rows="2"
      className="w-full border rounded-md resize-none border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
      onChange={(e) => {
        setRespondent(e.target.value);
        setValue("respondent", e.target.value);
      }}
    />
  </div>

  {/* Adv. of Petitioner */}
  <div>
    <label className="block text-sm font-semibold text-gray-700 dark:text-white mb-1">
      Adv. of Petitioner:
    </label>
    <textarea
      rows="2"
      className="w-full border rounded-md resize-none border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
      onChange={(e) => {
        setAdvofpetitioner(e.target.value);
        setValue("advofpetitioner", e.target.value);
      }}
    />
  </div>

  {/* Adv. of Respondent */}
  <div>
    <label className="block text-sm font-semibold text-gray-700 dark:text-white mb-1">
      Adv. of Respondent:
    </label>
    <textarea
      rows="2"
      className="w-full border rounded-md resize-none border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
      onChange={(e) => {
        setAdvofrespondent(e.target.value);
        setValue("advofrespondent", e.target.value);
      }}
    />
  </div>

  {/* Previous case citation */}
  <div>
    <label className="block text-sm font-semibold text-gray-700 dark:text-white mb-1">
      Previous Case Citation:
    </label>
    <textarea
      rows="2"
      className="w-full border rounded-md resize-none border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
      onChange={(e) => {
        setPrevcasecitation(e.target.value);
        setValue("prevcasecitation", e.target.value);
      }}
    />
  </div>

  {/* Penalty Detail */}
  <div>
    <label className="block text-sm font-semibold text-gray-700 dark:text-white mb-1">
      Penalty Detail:
    </label>
    <textarea
      rows="2"
      className="w-full border rounded-md resize-none border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
      onChange={(e) => {
        setPenaltydetail(e.target.value);
        setValue("penaltydetail", e.target.value);
      }}
    />
  </div>

  {/* Head Note */}
  <div>
    <label className="block text-sm font-semibold text-gray-700 dark:text-white mb-1">
      Head Note:
    </label>
    <textarea
      rows="2"
      className="w-full border rounded-md resize-none border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
      onChange={(e) => {
        setHeadnote(e.target.value);
        setValue("headnote", e.target.value);
      }}
    />
  </div>
</div>
<div className="mt-6 flex flex-wrap gap-4">
  <button
    onClick={handleShowResult}
    className="bg-black hover:bg-gray-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300 dark:bg-blue-500 dark:hover:bg-blue-600"
  >
    Show Result
  </button>

  <button
    onClick={handleClear}
    className="bg-black hover:bg-gray-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
  >
    Clear
  </button>
</div>

</div>








{/* Meta Data */}

<div className="border rounded-lg p-6 shadow-md bg-white dark:bg-gray-900">
          <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">Meta Data</h2>
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">

  <div>
    <label className="block text-sm font-semibold text-gray-700 dark:text-white mb-1">
      Judgement Author:
    </label>
    <textarea
      rows="2"
      className="w-full border rounded-md resize-none border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
      onChange={(e) => {
        setJudgementauthor(e.target.value);
        setValue("judgementauthor", e.target.value);
      }}
    />
  </div>


  <div>
    <label className="block text-sm font-semibold text-gray-700 dark:text-white mb-1">
      Judgement Type:
    </label>
    <textarea
      rows="2"
      className="w-full border rounded-md resize-none border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
      onChange={(e) => {
        setJudgementtype(e.target.value);
        setValue("judgementtype", e.target.value);
      }}
    />
  </div>

  
  <div>
    <label className="block text-sm font-semibold text-gray-700 dark:text-white mb-1">
      Language of Judgement:
    </label>
    <textarea
      rows="2"
      className="w-full border rounded-md resize-none border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
      onChange={(e) => {
        setLangofjudgement(e.target.value);
        setValue("langofjudgement", e.target.value);
      }}
    />
  </div>

 
  <div>
    <label className="block text-sm font-semibold text-gray-700 dark:text-white mb-1">
     Date of Hearing:
    </label>
    <textarea
      rows="2"
      className="w-full border rounded-md resize-none border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
      onChange={(e) => {
        setDateofhearing(e.target.value);
        setValue("dateofhearing", e.target.value);
      }}
    />
  </div>

  
  <div>
    <label className="block text-sm font-semibold text-gray-700 dark:text-white mb-1">
      Date of Order Pronouncement:
    </label>
    <textarea
      rows="2"
      className="w-full border rounded-md resize-none border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
      onChange={(e) => {
        setDateoforderpro(e.target.value);
        setValue("dateoforderpro", e.target.value);
      }}
    />
  </div>

 
  <div>
    <label className="block text-sm font-semibold text-gray-700 dark:text-white mb-1">
      Bench Composition:
    </label>
    <textarea
      rows="2"
      className="w-full border rounded-md resize-none border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
      onChange={(e) => {
        setBenchcomposition(e.target.value);
        setValue("benchcomposition", e.target.value);
      }}
    />
  </div>


  <div>
    <label className="block text-sm font-semibold text-gray-700 dark:text-white mb-1">
      Referred acts:
    </label>
    <textarea
      rows="2"
      className="w-full border rounded-md resize-none border-gray-300 shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
      onChange={(e) => {
        setReferredacts(e.target.value);
        setValue("referredacts", e.target.value);
      }}
    />
  </div>

 
</div>
<div className="mt-6 flex flex-wrap gap-4">
  <button
    onClick={handleShowResult}
    className="bg-black hover:bg-gray-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300 dark:bg-blue-500 dark:hover:bg-blue-600"
  >
    Show Result
  </button>

  <button
    onClick={handleClear}
    className="bg-black hover:bg-gray-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
  >
    Clear
  </button>
</div>
</div>
{/* class */}
<div className="border rounded-lg p-6 shadow-md bg-white dark:bg-gray-900">
<label className="block text-gray-600 font-medium dark:text-white">
            Classification:
            <div className="relative w-full">
              {/* Textarea Input */}
              <textarea
                rows="3"
                defaultValue={classification}
                onChange={(e) => {
                  setClassification(e.target.value);
                  setValue("Class", e.target.value);
                }}
                {...(loading1
                  ? {}
                  : register("classification", { required: true }))}
                className={`w-full p-4 border rounded-lg resize-none text-gray-700 dark:bg-black dark:border-gray-600 dark:text-white ${
                  classError || classificationError
                    ? "border-red-500"
                    : "border-gray-300"
                }`}
              />

              {loading1 && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/80 dark:bg-black/80">
                  <span className="text-3xl font-bold text-gray-600 dark:text-gray-300 animate-pulse">
                    Processing...
                  </span>
                </div>
              )}

              {/* Display classificationError inside the textarea */}
              {classificationError && !loading1 && (
                <div className="absolute inset-0 flex items-center justify-center bg-red-100/90 dark:bg-red-900/80 border border-red-500 rounded-lg">
                  <span className="text-lg font-semibold text-red-700 dark:text-red-300">
                    {classificationError}
                  </span>
                </div>
              )}

              {/* Display classError below the textarea */}
              {!loading1 && classError && (
                <span className="text-red-500 text-sm font-medium mt-1 block">
                  {classError}
                </span>
              )}
            </div>
          </label>

           {/* Classification Reason */}
           <div>
            <label className="block text-gray-600 dark:text-white font-medium mb-1">
              Classification Reason:
            </label>
            <div className="relative">
              <textarea
                rows="8"
                defaultValue={classificationReason}
                onChange={(e) => {
                  setClassificationReason(e.target.value);
                  setValue("ClassificationReason", e.target.value);
                }}
                {...(loading1 ? {} : register("classificationReason", { required: true }))}
                className={`w-full p-3 border rounded-md resize-none dark:bg-black dark:border-gray-600 dark:text-white ${
                  classificationError ? "border-red-500" : ""
                }`}
              />
              {loading1 && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/80 dark:bg-black/80">
                  <span className="text-2xl font-bold text-gray-600 dark:text-gray-300 animate-pulse">
                    Processing...
                  </span>
                </div>
              )}
              {!loading1 && classificationError && (
                <div className="absolute inset-0 flex items-center justify-center bg-red-100 dark:bg-red-900 border border-red-500 rounded-lg">
                  <span className="text-red-700 dark:text-red-300 font-semibold">
                    {classificationError}
                  </span>
                </div>
              )}
            </div>
            {errors.ClassificationReason && (
              <span className="text-sm text-red-500">This field is required</span>
            )}
          </div>

          <div className="mt-6 flex flex-wrap gap-4">
  <button
    onClick={handleShowResult}
    className="bg-black hover:bg-gray-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300 dark:bg-blue-500 dark:hover:bg-blue-600"
  >
    Show Result
  </button>

  <button
    onClick={handleClear}
    className="bg-black hover:bg-gray-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
  >
    Clear
  </button>
</div>
</div>

          {/* Summary */}
          <div className="border rounded-lg p-6 shadow-md bg-white dark:bg-gray-900">
          <div>
            <label className="block text-gray-600 dark:text-white font-medium mb-1">
              Summary:
            </label>
            <div className="relative">
              <textarea
                rows="10"
                defaultValue={summary}
                onChange={(e) => {
                  setSummary(e.target.value);
                  setValue("summary", e.target.value);
                }}
                {...(loading ? {} : register("summary", { required: true }))}
                className={`w-full p-3 border rounded-md resize-none dark:bg-black dark:border-gray-600 dark:text-white ${
                  summarizationError ? "border-red-500" : ""
                }`}
              />
              {loading && (
                <div className="absolute inset-0 flex items-center justify-center bg-white/80 dark:bg-black/80">
                  <span className="text-2xl font-bold text-gray-600 dark:text-gray-300 animate-pulse">
                    Processing...
                  </span>
                </div>
              )}
              {!loading && summarizationError && (
                <div className="absolute inset-0 flex items-center justify-center bg-red-100 dark:bg-red-900 border border-red-500 rounded-lg">
                  <span className="text-red-700 dark:text-red-300 font-semibold">
                    {summarizationError}
                  </span>
                </div>
              )}
            </div>
            {errors.summary && (
              <span className="text-sm text-red-500">This field is required</span>
            )}
          </div>
          <div className="mt-6 flex flex-wrap gap-4">
  <button
    onClick={handleShowResult}
    className="bg-black hover:bg-gray-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300 dark:bg-blue-500 dark:hover:bg-blue-600"
  >
    Show Result
  </button>

  <button
    onClick={handleClear}
    className="bg-black hover:bg-gray-700 text-white font-semibold py-2 px-6 rounded-lg shadow-md transition duration-300 dark:bg-gray-700 dark:hover:bg-gray-600 dark:text-white"
  >
    Clear
  </button>
</div>
          </div>

         

                    {/* Content */}
                    <div>
            <label className="block text-gray-600 dark:text-white font-medium mb-1">
              Document Content:
            </label>
            <textarea
              rows="10"
              // value={content}
              onChange={(e) => {
                setContent(e.target.value);
                setValue("content", e.target.value);
              }}
              {...register("content", { required: true })}
              className="w-full p-3 border rounded-md resize-none dark:bg-black dark:border-gray-600 dark:text-white"
            />
            {errors.content && (
              <span className="text-sm text-red-500">This field is required</span>
            )}
          </div>

          {/* Submit + Reset */}
          <div className="flex justify-between">
            <button
              className="w-1/4 mr-2 bg-black text-white py-2 rounded-md"
              onClick={handleSubmit(onSubmit)}
              disabled={loading || loading1}
            >
              {loading || loading1 ? "Processing..." : "Submit"}
            </button>
            <button
              className="w-1/4 ml-2 bg-black text-white py-2 rounded-md"
              type="reset"
              onClick={handleResetButton}
              disabled={loading || loading1}
            >
              {loading || loading1 ? "Processing..." : "Reset"}
            </button>
          </div>
        </form>
      </div>
    )}

    {/* Out of Scope Warning */}
    {isInScope === false && (
      <div className="bg-yellow-500 text-black p-4 rounded-md w-full max-w-3xl text-center mt-4">
        ❌ Document is out of scope
      </div>
    )}
  </div>
</div>


  );
}

export default UploadNewDocument;
