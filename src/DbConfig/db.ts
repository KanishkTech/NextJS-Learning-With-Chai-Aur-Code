// import { error } from "console";
import mongoose from  "mongoose";
    
export default async function connect(){
    try{
        await mongoose.connect(process.env.MONGO_URI!)
        const connection = mongoose.connection

        connection.on('connnected',()=>{
            console.log('connection established')
        })
        connection.on('error', () => {
            console.log(" Mongodb connection failed ,please make sure db is up and running: " );
            process.exit();
        })

    }catch(error){
        console.log("Something Went wrong in connecting to DB",error);
    }
}