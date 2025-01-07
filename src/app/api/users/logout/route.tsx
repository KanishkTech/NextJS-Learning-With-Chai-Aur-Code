import connect from '@/DbConfig/db'
import { NextRequest, NextResponse } from 'next/server'

connect();

export async function GET(request : NextRequest){
    try {
        const response = NextResponse.json(
            {
                message: "User logout successfully",
                status: true
            }
            

        )
        response.cookies.set("token","",{
            httpOnly: true,
            expires:new Date(0)
        })
        
        return response

    } catch (error:any) {
        return NextResponse.json(
            { message: error.message },
            { status: 500 }
        )
    }
}