const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");
const env = require("./config/env");
const routes = require("./routes");
const notFound = require("./middleware/notFound");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(helmet());
app.use(cors({ origin: env.corsOrigin }));
app.use(express.json({ limit: "2mb" }));
app.use(morgan("combined"));

app.get("/", (req, res) => res.json({
  name: "NIVORA SILVER API",
  version: "1.0.0",
  status: "running"
}));

app.use("/api", routes);
app.use(notFound);
app.use(errorHandler);

app.listen(env.port, () => {
  console.log(`NIVORA SILVER API listening on port ${env.port}`);
});
