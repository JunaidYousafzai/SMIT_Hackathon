const Loan = require("../models/loanModel");
const User = require("../models/registerModel");

const allLoans = async (request, response) => {
  try {
    const users = await User.find().select("-password"); 
    const loans = await Loan.find().populate("user", "username email"); 
    response.status(200).json({ users, loans });
  } catch (err) { 
    response.status(500).json({ message: "Error fetching data", error: err });
  }
}
  const loanSeeker = async (request, response) => {
    const { loanId } = request.params;
    const { status } = request.body;
    try {
      const updatedLoan = await Loan.findByIdAndUpdate(
        loanId,
        { status },
        { new: true }
      );
  
      if (!updatedLoan) {
        return response.status(404).json({ message: "Loan not found" });
      }
  
      response.status(200).json({ message: "Loan status updated", loan: updatedLoan });
    } catch (err) {
      response.status(500).json({ message: "Error updating loan", error: err });
    }
  }

module.exports = {allLoans, loanSeeker}