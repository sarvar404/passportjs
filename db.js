import mongoose from "mongoose";


mongoose.set("strictQuery", false);
const DBConnection = async () => {


    const URL = process.env.DB_URL;

    try {

        await mongoose.connect(URL, { useUnifiedTopology: true, useNewUrlParser: true });
        console.log("Database Connected...")
    } catch (error) {
        console.log(error + " 502 error")
    }


}
export default DBConnection;

