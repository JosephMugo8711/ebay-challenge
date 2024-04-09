// Importing PrismaClient instance from a custom path
import prisma from "@/app/libs/Prisma";
import { NextResponse } from "next/server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
// Importing PrismaClient instance from a custom path
export async function GET() {
    // Creating a Supabase client instance with cookies
    const supabase = createServerComponentClient({ cookies })

    try {
        // Retrieving user information from Supabase
        const { data: { user } } = await supabase.auth.getUser()

        // Checking if user is not found
        if (!user) throw Error()
        
        // Querying the Prisma database for orders associated with the user
        const orders = await prisma.orders.findMany({
            where: { user_id: user?.id }, // Filtering by user ID
            orderBy: { id: "desc" }, // Ordering by order ID in descending order
            include: { // Including related order items and products
                orderItem: {
                    include: {
                        product: true
                    }
                }
            }
        })
        
        // Disconnecting from the Prisma client
        await prisma.$disconnect();

        // Returning the orders as a JSON response
        return NextResponse.json(orders);
    } catch (error) {
        // Logging and handling errors
        console.log(error);
        await prisma.$disconnect();

        // Returning an error response
        return new NextResponse('Something went wrong', { status: 400 });
    }
}
