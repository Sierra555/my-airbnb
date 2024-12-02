import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";

type IParams = Promise<{
    listingId?: string
}>

export async function DELETE(request: Request, {params} : {params: IParams}) {
    const currentUser = await getCurrentUser();

    if(!currentUser) {
        return NextResponse.error();
    }

    try {
        const { listingId } = await params;

        if(!listingId || typeof listingId !== 'string') {
            throw new Error('Invalid id');
        }

        const properties = await prisma.listing.deleteMany({
            where: {
                id: listingId,
                userId: currentUser.id
            }
        });

        return NextResponse.json(properties);

    } catch {
        return NextResponse.error();
    } finally {
        await prisma.$disconnect();
    }
}