//core module
const express = require("express");
const expenseController = require("../controllers/expenseController");

const expense = express.Router();

expense.post("/", expenseController.createExpenses);

expense.delete("/:id", expenseController.deleteExpenses);

expense.get("/", expenseController.getExpenses);

expense.get("/:id", expenseController.getExpensesByID);

expense.put("/:id", expenseController.updateExp);

module.exports = expense;
