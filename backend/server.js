const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('../backend/Database/db'); 
const authRoutes = require('../backend/routes/authRoutes');
const questionRoutes = require("./routes/questionRoutes");
const session = require("express-session");
const answerRoutes = require("./routes/answerRoutes");

const app = express();
const PORT = process.env.PORT || 3001;

connectDB();  //connect to MongoDB
app.use(
  session({
    secret: "DevendraKumarSinghGlau", // Change this to a secure key
    resave: false,
    saveUninitialized: false,
  })
);

app.use(cors());
app.use(bodyParser.json());

app.use("/api/auth", authRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/answers", answerRoutes);
// app.use('/api/auth', authRoutes);
// app.use("/api/questions", questionRoutes);
app.use("/api/GetALLquestions", questionRoutes);
// app.use("/api/answers", answerRoutes);
// app.use("/api", answerRoutes);
// app.use("/api", questionRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
