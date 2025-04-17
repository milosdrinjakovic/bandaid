import UserData from "../../models/userData"
import dbConnect from "../../../lib/mongodb"
import { NextResponse } from "next/server";
import { getSession } from "@auth0/nextjs-auth0";

export async function GET() {
    await dbConnect()
    
    const session = await getSession()
    
    if (!session || !session.user) {
        console.error("No session found for the current user");
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
        const userId = session.user.sub;
        const userData = await UserData.findOne({ userId: userId });

        return NextResponse.json(userData, { status: 200 });
    } catch (error) {
        console.error("There was an error when getting user texts: ", error.message);
        return NextResponse.json({ message: "Error when getting user texts" }, { status: 500 });
    }
}

export async function POST() {
    await dbConnect()
    
    const session = await getSession()
    
    if (!session || !session.user) {
        console.error("No session found for the current user");
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
        const userId = session.user.sub;
        const userData = await UserData.create(
            {
                userId: userId,
                dateCreated: new Date(),
            });

        return NextResponse.json(userData, { status: 200 });
    } catch (error) {
        console.error("There was an error when creating user texts: ", error.message)
        return NextResponse.json({ message: "Error when creating user texts" }, { status: 500 });
    }
}