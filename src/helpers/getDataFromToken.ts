import { NextResponse ,NextRequest } from "next/server";
import jwt from "jsonwebtoken"
export const  getDataFromToken = (request : NextRequest)=>{

    try {
        const token = request.cookies.get('token')?.value || "";
        if(!token){
            throw new Error("Token not provided"); 
        }
        // console.log("token :-",token)
        if (!process.env.TOKEN_SECRET) {
            throw new Error("TOKEN_SECRET is not defined in the environment");
          }
        const decodeToken:any =  jwt.verify(token,process.env.TOKEN_SECRET)
        // console.log("Decoded Token:", decodeToken);
        return decodeToken.id // returning the user id which we sended tokn from the login route 
    } catch (error:any) {
        console.error("Error decoding token:", error.message);
        return NextResponse.json(
            { message: error.message },
            { status: 500 }
        )
    }
}