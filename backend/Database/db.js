// backend/Database/db.js

const mongoose = require('mongoose');
const url = "mongodb+srv://quora:uyK0e0mecj8gSkXS@cluster0.ndffhmx.mongodb.net/quora-clone-mern?retryWrites=true&w=majority";


const connectDB = async () => {
    try {
        await mongoose.connect(url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
};

module.exports = connectDB;
