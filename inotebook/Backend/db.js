const mongoose = require("mongoose");
const mongoURI = "mongodb://127.0.0.1:27017/iNotebook";

const connectToMongo = async () => {
    const response = await mongoose.connect(mongoURI);
    // console.log(response.connection._readyState);
};

module.exports = connectToMongo;
