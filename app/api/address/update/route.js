// Importing PrismaClient instance from a custom path
import prisma from "@/app/libs/Prisma";
// Importing NextResponse from 'next/server'
import { NextResponse } from "next/server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

// Importing cookies from 'next/headers'
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
        
        // Updating the address entry in the Prisma database
        const res = await prisma.addresses.update({
            where: { id: Number(body.addressId) },
            data: {
                name: body.name,
                address: body.address,
                zipcode: body.zipcode,
                city: body.city,
                country: body.country,
            }
        })
        
        // Disconnecting from the Prisma client
        await prisma.$disconnect();

        // Returning the updated address as a JSON response
        return NextResponse.json(res);
    } catch (error) {
        // Logging and handling errors
        console.log(error);
        await prisma.$disconnect();

        // Returning an error response
        return new NextResponse('Something went wrong', { status: 400 });
    }
}
