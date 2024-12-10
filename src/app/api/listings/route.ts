import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    try {
        const body = await request.json();
        const {
            category,
            location,
            guestCount,
            roomCount,
            bathroomCount,
            imageSrc,
            price,
            title,
            description,
        } = body;

        if (!category || !location || !guestCount || !roomCount || !bathroomCount || !imageSrc || !price || !title || !description) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const listing = await prisma.listing.create({
            data: {
                title,
                description,
                imageSrc,
                category,
                roomCount,
                bathroomCount,
                guestCount,
                locationValue: location.value,
                userId: currentUser.id,
                price: parseInt(price, 10),
            },
        });

        return NextResponse.json(listing);
    } catch  {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}