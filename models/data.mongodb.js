const mongoose = require("mongoose");

const MONGO_URI = process.env.MONGO_URI;
if (!MONGO_URI) {
    console.error("❌ No MongoDB URI found! Set MONGO_URI in environment variables.");
    process.exit(1);
}

const connectDB = async () => {
    try {
        console.log("⏳ Connecting to MongoDB...");
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("✅ Connected to MongoDB Atlas!");
    } catch (err) {
        console.error("❌ MongoDB Connection Error:", err);
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
        console.log("✅ User inserted successfully");
    } catch (error) {
        console.error("❌ Error inserting user:", error);
    }
};

const getUsers = async () => {
    try {
        return await User.find();
    } catch (error) {
        console.error("❌ Error retrieving users:", error);
        return [];
    }
};

module.exports = { saveUser, getUsers };

