import connect from '@/DbConfig/db'
import { User } from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server'
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

connect();

export async function POST(request : NextRequest){
    try {
        const reqBody = await request.json()
        const { email, password } =reqBody;
        console.log(reqBody);

        if(!reqBody){
            return NextResponse.json(
                { message: 'Invalid request' },
                { status: 400 }
            )
        }
        console.log(reqBody);
        if(!email || !password){
            return NextResponse.json(
                { message: 'Email and password are required' },
                { status: 400 }
                );
        }
        const user = await User.findOne({ email: email})
        if(!user){
            return NextResponse.json(
                { message: 'User not found' },
                { status: 404 }
                );
        }
        console.log("user Exists")
        const validPassword = await bcrypt.compare(password, user.password)
        if(!validPassword){
            return NextResponse.json(
                { message: 'Invalid password , check your credentials' },
                { status: 400 }
            )
        }
        const tokenData = {
            
                id: user._id,
                email: user.email,
                username: user.username
            
        }
        if (!process.env.TOKEN_SECRET) {
            throw new Error('TOKEN_SECRET is not defined');
        }
        const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET, { expiresIn: "1h" });
        
        const response = NextResponse.json({
            message: 'User logged in successfully',
            success:true,
        })
        response.cookies.set("token", token ,{
            httpOnly: true,
        })
        return response ;


    } catch (error:any) {
        return NextResponse.json(
            { message: error.message },
            { status: 500 }
        )
    }
}