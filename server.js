const express = require("express");
import { readdirSync } from "fs";
const cors = require("cors");
const mongoose = require("mongoose");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const fileRoute = require("./routes/file");
require("dotenv").config();

const app = express();

// DB connection
mongoose
  .connect(process.env.DATABASE, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("DB Connected"))
  .catch((err) => console.log("DB Connection Error:", err));

// middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(bodyParser.json({ limit: "2mb" }));
app.use(fileRoute);
app.use(cors());

// route middlewares
readdirSync("./routes").map((r) => app.use("/api", require(`./routes/${r}`)));

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server is running on port ${port}`));
