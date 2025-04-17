import { NextResponse } from "next/server";
import dbConnect from "../../../lib/mongodb"
import Texts, { IText, TText } from "@/app/models/text";
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
        const texts = await Texts.find({ userId: userId });

        return NextResponse.json(texts);
    } catch (error) {
        console.error("There was an error when getting texts for user: ", error.message);
        return NextResponse.json({ message: "Error when getting texts for user" });
    }
}

export async function POST(request) {
    await dbConnect()

    const session = await getSession()

    if (!session || !session.user) {
        console.error("No session found for the current user");
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
    }

    try {
        const date = new Date();
        const userId = session.user.sub;
        const { title, content, scrollSpeed } = await request.json();
        const textsCount = await Texts.countDocuments({ userId: userId });
        let nextOrderNumber = textsCount + 1;

        const newText: TText = {
            userId: userId,
            title: title,
            content: content,
            scrollSpeed: scrollSpeed,
            dateCreated: date,
            order: nextOrderNumber
        }

        const createdText = await Texts.create(newText)

        return NextResponse.json(createdText, { status: 201 });
    } catch (error) {
        console.error("There was an error when creating a new text: ", error.message)
        return NextResponse.json({ message: "Error when creating a new text" }, { status: 500 })
    }
}

export async function PUT(request) {
    try {
        await dbConnect()

        const session = await getSession()
    
        if (!session || !session.user) {
            console.error("No session found for the current user");
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const orderedTexts: Partial<IText>[] = await request.json();
        const userId = session.user.sub;

        console.log({orderedTexts})

        const texts = await Texts.bulkWrite(
          orderedTexts.map(({ _id, order }) => ({
            updateOne: {
              filter: { userId: userId, _id: _id },
              update: { $set: { order: order } },
            }
          }))
        );

        return NextResponse.json(texts, { status: 200 });
      } catch (error) {
        console.error("Error updating texts order:", error);
        return NextResponse.json({ message: "Error when ordering texts" }, { status: 500 });
      }
}