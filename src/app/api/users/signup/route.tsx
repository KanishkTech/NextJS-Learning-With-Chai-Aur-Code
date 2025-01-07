
import connect from '@/DbConfig/db'
import { User } from '@/models/userModel'
import bcrypt from "bcryptjs"
import {sendEmail} from "@/helpers/mailer"
import { NextRequest, NextResponse } from 'next/server'

connect();

export async function POST(request:NextRequest){
    try {
        const reqBody = await request.json();
        const {email,username,password}:any = reqBody
        // console.log(reqBody)
        const user = await User.findOne({ email})
        if(user){
            return NextResponse.json(
                {
                error:"User already exists",
            },
            {
                status: 400,
            }
        )
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await  bcrypt.hash(password,salt);

        const newUser = new User({
            email,
            username,
            password:hashedPassword
        })

        const savedUser = await newUser.save()
        // console.log("Saved User ",savedUser)

        const userId = savedUser._id;
 
        // send verifycation email
        await sendEmail({email,emailType: 'VERIFY',userId:userId })

        return NextResponse.json(
            {
                message:"user Registered successfully",
                success:true,
                savedUser
            }
        )

        // const user = new User({email,username,password})

    } catch (error:any) {
       return  NextResponse.json({ error:error.message }, { status:500});
    }
}