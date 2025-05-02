import mongoose from "mongoose";


const DocumentSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  serialnum: {
    type: String,
    required: true,
    unique: true,
  },
  content: {
    type: String,
    required: true,
  },
  summary: {
    type: String,
    required: true,
  },
  Class: {
    type: String,
    required: true,
  },
  ClassificationReason:{
    type: String,
    required: true,
  },
  adminid: {
    type: String,
    required: true,
  },
  uploadDate: {
    type: String,
    required: true,
    // default: Date.now(),
  },
  caseno: {
    type: String,
    required: true,
  },
  casetype: {
    type: String,
    required: true,
  },
  casestatus: {
    type: String,
    required: true,
  },
  filingdate: {
    type: String,
    required: true,
  },
  courtno: {
    type: String,
    required: true,
  },
  courtname: {
    type: String,
    required: true,
  },
  bench: {
    type: String,
    required: true,
  },
  petitioner: {
    type: String,
    required: true,
  },
  respondent: {
    type: String,
    required: true,
  },
  advofpetitioner: {
    type: String,
    required: true,
  },
  advofrespondent: {
    type: String,
    required: true,
  },
  prevcasecitation: {
    type: String,
    required: true,
  },
  penaltydetail: {
    type: String,
    required: true,
  },
  headnote: {
    type: String,
    required: true,
  },
  judgementauthor: {
    type: String,
    required: true,
  },
  judgementtype: {
    type: String,
    required: true,
  },
  langofjudgement: {
    type: String,
    required : true,
  },
  dateofhearing: {
    type: String,
    required: true,
  },
  dateoforderpro: {
    type: String,
    required: true,
  },
  benchcomposition: {
    type: String,
    required: true,
  },
  referredacts: {
    type: String,
    required: true,
  },


  
  // pdfUrl:{
  //   type: String,
  //   required: true,
  // },
  // filekey:{
  //   type:String,
  //   required:true,
  // }

});

// DocumentSchema.pre("save", function (next) {
//   if (typeof this.Class === "string") {
//     this.Class = this.Class
//       .split("\n") // Split by newline character
//       .map(item => item.trim()) // Trim spaces before and after each item
//       .filter(item => item.length > 0); // Remove any empty strings
//   }

//   console.log(typeof this.Class);
//   next();
// });

const Document = mongoose.model("Document", DocumentSchema);

export default Document;
