// Importing the Stripe SDK
import Stripe from 'stripe';
import { NextResponse } from "next/server";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

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

        // Creating a new instance of the Stripe SDK with the Stripe secret key
        const stripe = new Stripe(process.env.STRIPE_SK_KEY || '');

        // Creating a payment intent with the specified amount and currency
        const res = await stripe.paymentIntents.create({
            amount: Number(body.amount),
            currency: 'gbp',
            automatic_payment_methods: { enabled: true },
        });

        // Returning the payment intent as a JSON response
        return NextResponse.json(res);
    } catch (error) {
        // Logging and handling errors
        console.log(error);

        // Returning an error response
        return new NextResponse('Something went wrong', { status: 400 });
    }
}
