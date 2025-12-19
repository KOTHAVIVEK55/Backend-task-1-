const mongoose=require('mongoose');

async function connectionmongo(url){
    try {
        await mongoose.connect(url);
        console.log("MongoDB connected successfully");
        return true;
    } catch (error) {
        console.error("MongoDB connection error:", error);
        throw error;
    }
}

module.exports=connectionmongo;