import dbConnect from "@/lib/mongodb";
import { getSession } from "@auth0/nextjs-auth0";
import { NextRequest, NextResponse } from "next/server";
import Texts from "@/app/models/text";


export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        await dbConnect()

        const session = await getSession()

        if (!session || !session.user) {
            console.error("No session found for the current user");
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const userId = session.user.sub;
        const { id } = params
        const text = await Texts.findById(
            { userId: userId, _id: id },
        );

        return NextResponse.json(text, { status: 200 });
    } catch (error) {
        console.error("There was an error when getting a text: ", error.message)
        return NextResponse.json({ message: "Error when getting a text" }, { status: 500 })
    }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        await dbConnect()

        const session = await getSession()

        if (!session || !session.user) {
            console.error("No session found for the current user");
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const date = new Date();
        const userId = session.user.sub;
        const { id } = params
        const { title, content, scrollSpeed } = await request.json();
        const text = await Texts.updateOne(
            {
                userId: userId,
                _id: id
            },
            {
                $set: {
                    dateModified: date,
                    title: title,
                    content: content,
                    scrollSpeed: scrollSpeed,
                }
            }
        );

        return NextResponse.json(text, { status: 201 });
    } catch (error) {
        console.error("There was an error when updating a text: ", error.message)
        return NextResponse.json({ message: "Error when updating a text" }, { status: 500 })
    }
}


export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        await dbConnect()

        const session = await getSession()

        if (!session || !session.user) {
            console.error("No session found for the current user");
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const userId = session.user.sub;
        const { id } = params
        await Texts.deleteOne({
            userId: userId,
            _id: id
        })

        return NextResponse.json({}, { status: 200 });
    }
    catch (error) {
        console.error("There was an error when deleting a text: ", error.message)
        return NextResponse.json({ message: "Error when deleting a text" }, { status: 500 })
    }
}

