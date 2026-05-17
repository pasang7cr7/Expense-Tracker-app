//core module
const express = require("express");
const expenseController = require("../controllers/expenseController");

const auth = require("../middleware/auth");

const expense = express.Router();

expense.post("/", auth, expenseController.createExpenses);

expense.delete("/:id", auth, expenseController.deleteExpenses);

expense.get("/", auth, expenseController.getExpenses);

expense.get("/:id", auth, expenseController.getExpensesByID);

expense.put("/:id", auth, expenseController.updateExp);

module.exports = expense;
