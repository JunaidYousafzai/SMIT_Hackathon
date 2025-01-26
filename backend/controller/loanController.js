const Loan = require("../models/loanModel");
const categorySubcategoryMapping = {
  education: ["child loan", "uni fee"],
  wedding: ["valima", "other"],
  business: ["startup", "expansion", "other"],
  "home construction": ["renovation", "new home", "other"],
};

const loanController = async (req, res) => {
  const { category, subCategory, loanAmount, duration } = req.body;

  const lowerCaseCategory = category.toLowerCase(); // Convert to lowercase
  const lowerCaseSubCategory = subCategory.toLowerCase(); // Convert to lowercase

  // Check if the category is valid
  if (!categorySubcategoryMapping[lowerCaseCategory]) {
    return res.status(400).json({ message: "Invalid category." });
  }

  // Check if the subcategory is valid for the category
  if (!categorySubcategoryMapping[lowerCaseCategory].includes(lowerCaseSubCategory)) {
    return res.status(400).json({
      message: `Invalid subCategory for category ${category}. Allowed subcategories are: ${categorySubcategoryMapping[lowerCaseCategory].join(", ")}`,
    });
  }

  const loan = new Loan({
    user: req.user._id,
    category,
    subCategory,
    loanAmount,
    duration,
  });

  try {
    await loan.save();
    res.status(201).json({ message: "Loan application submitted!", loan });
  } catch (err) {
    res.status(500).json({ message: "Error submitting loan.", error: err });
  }
};


module.exports = loanController;
