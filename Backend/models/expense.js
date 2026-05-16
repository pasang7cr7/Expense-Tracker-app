const mongoose = require("mongoose");

const expenses = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
      maxlength: 100,
    },
    amount: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: String,
      required: true,
      enum: [
        "Food",
        "Transport",
        "Shopping",
        "Entertainment",
        "Health",
        "Education",
        "Others",
      ],
    },
    date: {
      type: Date,
      default: Date.now,
    },
    description: {
      type: String,
      default: "",
      maxlength: 200,
      trim: true,
    },
  },
  { timestamps: true },
);

module.exports = mongoose.model("Expense", expenses);
