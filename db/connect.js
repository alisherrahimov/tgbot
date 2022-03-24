import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://alisher:alisher2211@cluster0.smo7f.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");
        console.log("MongoDB Connected...");
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}
connectDB()