const mongoose = require("mongoose");
const { Schema } = mongoose;

const loanSchema = new Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: String,
      enum: ["education", "wedding", "business", "home construction"], 
      required: true,
    },
    subCategory: {
      type: String,
      required: true, 
    },
    loanAmount: {
      type: Number,
      required: true,
    },
    duration: {
      type: Number, 
      required: true,
    },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    approvalDate: {
      type: Date,
    },
    repaymentDetails: {
      type: String, 
    },
  },
  { timestamps: true }
);

const Loan = mongoose.model("Loan", loanSchema);
module.exports = Loan;
