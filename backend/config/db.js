
const  mongoose  = require("mongoose");

const connectDB = async () => {
    try {
        const dbConnection = await mongoose.connect(
            `${process.env.MONGODB_URI}/${process.env.AUTHENTICATION_DB_NAME}`
        );
        console.log(`Db connected to ${dbConnection.connection.host}`);
    } catch (err) {
        console.error(`Error connecting to the database: ${err.message}`);
        process.exit(1); 
    }
};

module.exports = connectDB
