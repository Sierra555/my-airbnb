import prisma from "@/app/libs/prismadb";
import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";

type IParams = Promise<{
    reservationId?: string,
}>

export async function DELETE(request: Request, {params}: { params : IParams }) {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    try {
        const { reservationId } = await params;

        if(!reservationId || typeof reservationId !== 'string') {
            throw new Error('Invalid id');
        }
    
        const reservation = await prisma.reservation.deleteMany({
            where: {
                id: reservationId,
                OR: [
                    { userId: currentUser.id },
                    { listing: { userId: currentUser.id } }
                ]
            },
        });

        return NextResponse.json(reservation);
    } catch  {
        return NextResponse.error();
    } finally {
        await prisma.$disconnect();
    }
}