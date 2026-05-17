const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

// local modules
const expenseRoutes = require("./routes/expense");
const errorHandler = require("./middleware/errorHandler");
const authRoute = require("./routes/auth");

dotenv.config();

const app = express();

// global middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// request logger
app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

// routes
app.use("/api/expenses", expenseRoutes);
app.use("/api/auth", authRoute);

// global error handler (must be last)
app.use(errorHandler);

module.exports = app;
