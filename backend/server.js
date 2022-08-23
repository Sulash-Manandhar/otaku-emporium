const express = require("express");
const fileUpload = require("express-fileupload");
const dotenv = require("dotenv").config();
const { errorHandler } = require("./middleware/errorMiddleware");
const cors = require("cors");
const connectDB = require("./config/db");
const port = process.env.PORT || 5000;
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(fileUpload());

console.log(process.env.MONGO_URI);
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/file", require("./routes/fileRoute"));
app.use("/api/apparel", require("./routes/apparelRoute"));

app.use(errorHandler);
app.listen(port, () => console.log(`Server started on port ${port}`));