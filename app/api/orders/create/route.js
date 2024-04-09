// Importing PrismaClient instance from a custom path
import prisma from "@/app/libs/Prisma";
import { NextResponse } from "next/server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

// Handling POST request
export async function POST(req) {
    // Creating a Supabase client instance with cookies
    const supabase = createServerComponentClient({ cookies })

    try {
        // Retrieving user information from Supabase
        const { data: { user } } = await supabase.auth.getUser()

        // Checking if user is not found
        if (!user) throw Error()

        // Parsing the request body as JSON
        const body = await req.json();

        // Creating a new order entry in the Prisma database
        const order = await prisma.orders.create({
            data: {
                user_id: user?.id,
                stripe_id: body.stripe_id,
                name: body.name,
                address: body.address,
                zipcode: body.zipcode,
                city: body.city,
                country: body.country,
                total: Number(body.total),
            }
        })

        // Creating order items for each product in the order
        body.products.forEach(async prod => { 
            await prisma.orderItem.create({
                data: {
                    order_id: order.id,
                    product_id: Number(prod.id),
                }
            })
        });

        // Disconnecting from the Prisma client
        await prisma.$disconnect();

        // Returning a success response
        return NextResponse.json('Order Complete', { status: 200 });
    } catch (error) {
        // Logging and handling errors
        console.log(error);
        await prisma.$disconnect();

        // Returning an error response
        return new NextResponse('Something went wrong', { status: 400 });
    }
}
