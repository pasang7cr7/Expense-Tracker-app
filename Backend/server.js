const app = require("./app");
const connectDb = require("./config/db");

const PORT = process.env.PORT || 5000;

connectDb();

app.listen(PORT, () => {
  console.log(`server started at http://localhost:${PORT}`);
});
