import jwt from "jsonwebtoken";
import { NextRequest } from "next/server";

export const getDataFromToken = (request: NextRequest) => {
  try {
    const token = request.cookies.get("token")?.value || "";
    if (!token) throw new Error("Token not found");

    // Verify the token and get decoded data
    const decodedToken: any = jwt.verify(token, process.env.TOKEN_SECRET!);
    return decodedToken._id; // Return decoded data
  } catch (error: any) {
    console.log("Error in getting token data::", error.message);
    throw new Error(error.message);
  }
};
