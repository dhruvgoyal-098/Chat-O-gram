const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('✅ MongoDB Connected...');
    } catch (error) {
        console.error('❌ MongoDB Connection Error:', error);
        process.exit(1);
    }
};

connectDB();
const userSchema = new mongoose.Schema({
    name: String,
    message: String
}, { collection: "Chat" });
const User = mongoose.model("Chat", userSchema);
const saveUser = async (name, message) => {
    try {
        await User.create({ name, message });
        console.log("User inserted successfully");
    } catch (error) {
        console.error("Error inserting user:", error);
    }
};
const getUsers = async () => {
    try {
        return await User.find();
    } catch (error) {
        console.error("Error retrieving users:", error);
        return [];
    }
};
module.exports = { saveUser, getUsers };
