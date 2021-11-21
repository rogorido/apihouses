const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const compression = require("compression");
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");
const cors = require("cors");

require("dotenv").config();

const dbFunctions = require("./functions/dbfunctions");

const app = express();
app.use(morgan("tiny"));

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(compression());
app.use(helmet());

const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 45, // 45 requests,
});

app.use(limiter);

app.use(
  cors({
    origin: [
      "https://www.georeligion.org",
      "https://dbg.georeligion.org",
      "https://beta.georeligion.org",
      "https://dominicans.georeligion.org",
      "http://localhost:8000",
      "http://localhost:3000",
      "http://localhost:8080",
      "http://localhost:8081",
      "http://192.168.1.10:8080",
    ],
  })
);

app.get("/", dbFunctions.getGeneralData);

// para comboboxes y demás
app.get("/provinces/", dbFunctions.getProvinces);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}/`);
});
