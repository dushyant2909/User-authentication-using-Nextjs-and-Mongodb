import { connect } from "@/dbconfig/dbconfig";
import { User } from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";
import { use } from "react";

connect();

export async function POST(request: NextRequest) {
  try {
    const { token } = await request.json();
    console.log("Token:", token);

    const user = await User.findOne({
      verifyToken: token,
      verifyTokenExpiry: { $gt: Date.now() },
    });

    if (!user)
      return NextResponse.json(
        {
          error: "Invalid token",
        },
        { status: 400 }
      );

    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiry = undefined;

    await user.save();

    return NextResponse.json({
      success: true,
      message: "Email verified successfully",
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        message: error.message,
      },
      { status: 500 }
    );
  }
}
