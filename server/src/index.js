const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const connection = require("./utils/dbConnect");

// IMPORTED ROUTES
const userRoute = require("./routes/userRoutes");

// CONFIGURATIONS
dotenv.config();
const app = express();

// TRUSTERED ORIGINS
const localClientUrl = "http://localhost:5173";

// MIDDLEWARES
app.use(bodyParser.json({ limit: "50mb" }));
app.use(cookieParser());
app.use(express.json());
app.use(
  cors({
    origin: localClientUrl,
    credentials: true,
  })
);

// API ROUTES
app.use("/api/v1/user", userRoute);

// DATABASE AND SERVER CONNECTIONS
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to the database:", err.stack);
    return;
  }
  console.log("Connected to the database.");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Listening to port: ${PORT}`);
});
