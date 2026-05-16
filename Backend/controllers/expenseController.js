const AppError = require("../utils/AppError");

const Expense = require("../models/expense");

exports.createExpenses = async (req, res, next) => {
  try {
    const expenseData = req.body;
    if (Object.keys(data).length === 0) {
      throw new AppError("no data provided", 400);
    }
    const createdExpense = await Expense.create(expenseData);
    res.status(201).json({ success: true, data: createdExpense });
  } catch (error) {
    next(error);
  }
};

exports.deleteExpenses = async (req, res, next) => {
  try {
    const id = req.params.id;
    console.log(id);
    const deletedExpense = await Expense.findByIdAndDelete(id);
    if (!deletedExpense) {
      throw new AppError("Expense not found", 404);
    }
    res.status(200).json({ success: true, data: deletedExpense });
  } catch (error) {
    next(error);
  }
};

exports.getExpenses = async (req, res, next) => {
  try {
    const allExp = await Expense.find({});
    console.log(allExp);

    res.status(200).json({ success: true, data: allExp });
  } catch (err) {
    next(err);
  }
};

exports.getExpensesByID = async (req, res, next) => {
  try {
    const id = req.params.id;
    const expById = await Expense.findById(id);
    if (!expById) {
      throw new AppError("id not found", 404);
    }
    res.status(200).json({ success: true, data: expById });
  } catch (err) {
    next(err);
  }
};

exports.updateExp = async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = req.body;

    if (Object.keys(data).length === 0) {
      throw new AppError("no data provided", 400);
    }
    const updatedExp = await Expense.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true,
    });
    if (!updatedExp) {
      throw new AppError("404 not found", 404);
    }
    res.status(200).json({ success: true, data: updatedExp });
  } catch (error) {
    next(error);
  }
};
