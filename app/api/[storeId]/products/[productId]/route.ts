import { NextResponse } from "next/server"

import prismaDb from "@/lib/prismaDb"

export async function GET(req: Request, { params }: { params: { productId: string } }) {
    try {

        if (!params.productId) return new NextResponse("ProductId is required", { status: 400 })

        const product = await prismaDb.product.findUnique({
            where: {
                id: params.productId
            },
            include: {
                images: true,
                category: true,
                size: true,
                color: true
            }
        })

        return NextResponse.json(product)

    } catch (error) {
        console.error(`[PRODUCT_GET] =>`, error)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}