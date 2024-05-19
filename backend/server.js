const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('../backend/Database/db'); 
const authRoutes = require('../backend/routes/authRoutes');
const questionRoutes = require("./routes/questionRoutes");
const session = require("express-session");
const answerRoutes = require("./routes/answerRoutes");
const postRoutes= require("./routes/postRoutes")
const spaceRoutes = require("./routes/spaceRoutes");
const notificationRoutes = require("./routes/notification");
require('dotenv').config();
// const searchRoutes = require("./routes/searchRoutes");
console.log(process.env);
const app = express();
const PORT = process.env.PORT || 3001; // Default to 3001 if PORT is not defined in the environment
console.log(PORT);
connectDB();  //connect to MongoDB
app.use(
  session({
    secret: "DevendraKumarSinghGlau", 
    resave: false,
    saveUninitialized: false,
  })
);

app.use(cors());
app.use(bodyParser.json());

app.use("/api/auth", authRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/answers", answerRoutes);
app.use("/api/GetALLquestions", questionRoutes);
app.use("/api/posts", postRoutes);
app.use("/api/spaces", spaceRoutes);
app.use('/api/notifications', notificationRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
