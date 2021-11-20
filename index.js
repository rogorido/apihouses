const express = require("express");
const bodyParser = require("body-parser");
const helmet = require("helmet");
const compression = require("compression");
const rateLimit = require("express-rate-limit");
const morgan = require("morgan");
const cors = require("cors");

require("dotenv").config();

//const dbFunctions = require("./functions/dbfunctions1580");
const dbFunctions = require("./functions/dbfunctions1570");

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
      "http://localhost:8000",
      "http://localhost:3000",
      "http://localhost:8080",
      "http://localhost:8081",
      "http://192.168.1.10:8080",
    ],
  })
);

app.get("/generaldata/", dbFunctions.getGeneralData);
app.get("/themes/", dbFunctions.getThemesList);
app.get("/themes/stats/", dbFunctions.getThemesStats);
app.get("/themes/details/", dbFunctions.getThemesDetails);
app.get("/themes/ordinationes/", dbFunctions.getThemesOrdinationes);
app.get("/capgens/", dbFunctions.getCapGensStats);
app.get("/resolutions/stats/", dbFunctions.getResolutionsTypesStats);
app.get("/resolutions/lookagain/", dbFunctions.getResolutionsLookAgain);
app.get("/resolutions/adddata/", dbFunctions.getResolutionsAddData);
app.get("/resolutions/", dbFunctions.getResolutionsWithFilters);
app.get("/resolutionsperprovince/", dbFunctions.getResolutionsWithProvinces);
app.get("/sufragios/stats/", dbFunctions.getSufragiosStats);
app.get("/penas/", dbFunctions.getPenasStats);

app.get("/provinces/stats", dbFunctions.getProvincesStats);
app.get("/provinces/details/", dbFunctions.getProvincesDetails);

app.get("/stats/retro", dbFunctions.getRetroStats);

app.get("/approbations/general/", dbFunctions.getAprobationsStats);
app.get("/approbations/", dbFunctions.getAprobationsProvincesDetails);

// para comboboxes y demás
app.get("/houses/origin/", dbFunctions.getHousesOriginAffiliation);
app.get("/houses/destination/", dbFunctions.getHousesDestinationAffiliation);
app.get("/licences/stats/", dbFunctions.getLicencesStats);
app.get("/prohibitions/", dbFunctions.getProhibitions);
app.get("/provinces/", dbFunctions.getProvinces);
app.get("/affiliations/", dbFunctions.getAffiliations);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}/`);
});
