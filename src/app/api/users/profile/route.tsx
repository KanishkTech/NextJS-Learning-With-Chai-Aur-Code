import connect from "@/DbConfig/db";
import { User } from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

import { getDataFromToken } from "@/helpers/getDataFromToken";

connect();

export async function GET(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);
    // console.log("UserId in profile",userId);
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
        return NextResponse.json(
          { error: "Invalid user ID" },
          { status: 400 }
        );
      }
    const userInfo = await User.findById(userId).select("-password");
    if (!userInfo) {
      return new Response("User not found", { status: 404 });
    }

    return NextResponse.json({
      message: "User Found",
      data: userInfo,
    });
  } catch (error:any) {
    return NextResponse.json(
        { message: error.message },
        { status: 500 }
    )}
}
