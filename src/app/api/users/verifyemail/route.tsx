import connect from '@/DbConfig/db'
import { User } from '@/models/userModel'
import { NextRequest, NextResponse } from 'next/server'

connect();

export async function POST(request: NextRequest){
    try {
        const  reqBody = await request.json();
        const {verifyToken} = reqBody;  
        // console.log(verifyToken);

        const user = await User.findOne({
            verifyToken,
            verifyTokenExpiry:{$gt:Date.now()}
        })
        if(!user){
            return NextResponse.json(
                {error: "Invalid token" },
                { status: 500 }
            )
        }
        // console.log(user);

        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;
        await user.save();
        return NextResponse.json({message: "Email verified SuccessFully"} , { status: 200 });

    } catch (error:any) {
        return NextResponse.json(
            { message: error.message },
            { status: 500 }
        )
    }
}
