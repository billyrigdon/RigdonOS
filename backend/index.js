const express = require("express");
const app = express();
const mongoose = require("mongoose");
const helmet = require("helmet");
require("dotenv").config();
const cors = require("cors");
const fileRoute = require("./Routes/FileRoute");

mongoose.connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true}, () => {console.log("Connected to Database")});

//Middleware
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(helmet());
app.use(cors());

//Routes
app.use("/api/files", fileRoute);


app.listen(process.env.PORT, () => {console.log("Server listening on port: " + process.env.PORT)});
