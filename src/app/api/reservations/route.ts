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
            totalPrice,
            startDate,
            endDate,
            listingId
         } = body;
   
        const reservation = await prisma.listing.update({
            where: {
                id: listingId
            },
            data: {
               reservations: {
                    create: {
                        totalPrice,
                        startDate,
                        endDate,
                        userId: currentUser.id,
                    }
               } 
            }
        });

      return  NextResponse.json(reservation);
    } catch {
        return NextResponse.error();
    }
}