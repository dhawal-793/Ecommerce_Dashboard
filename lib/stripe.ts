import Stripe from "stripe"

export const stripe = new Stripe(process.env.STRIPE_API_KEY_TEST!, {
    apiVersion: "2022-11-15",
    typescript: true,
})