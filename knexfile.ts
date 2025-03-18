const dotenv = require("dotenv");
dotenv.config({ path: ".env" });

import config from "./src/db/config";

module.exports = config;
