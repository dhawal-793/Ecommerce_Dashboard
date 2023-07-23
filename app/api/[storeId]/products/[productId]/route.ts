import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

import prismaDb from "@/lib/prismaDb"

export async function PATCH(req: Request, { params }: { params: { storeId: string, productId: string } }) {
    try {

        const { userId } = auth()
        if (!userId) return new NextResponse("Unauthenticated", { status: 401 })

        const { name, price, categoryId, sizeId, colorId, images, isFeatured, isArchived } = await req.json()
        if (!name) return new NextResponse("Name is required", { status: 400 })
        if (!price) return new NextResponse("Price is required", { status: 400 })
        if (!categoryId) return new NextResponse("CategoryId is required", { status: 400 })
        if (!sizeId) return new NextResponse("SizeId is required", { status: 400 })
        if (!colorId) return new NextResponse("ColorId is required", { status: 400 })
        if (!images || images.length <= 0) return new NextResponse("Images are required", { status: 400 })

        const { storeId, productId } = params
        if (!storeId) return new NextResponse("StoreId is required", { status: 400 })
        if (!productId) return new NextResponse("ProductId is required", { status: 400 })

        const storeByUserId = await prismaDb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        })
        if (!storeByUserId) {
            return new NextResponse("Unauthorized", { status: 403 })
        }

        await prismaDb.product.update({
            where: {
                id: productId,
            },
            data: {
                name,
                price,
                categoryId,
                sizeId,
                colorId,
                isFeatured,
                isArchived,
                storeId: params.storeId,
                images: {
                    deleteMany: {}
                }
            }
        })

        const product = await prismaDb.product.update({
            where: {
                id: productId,
            },
            data: {
                images: {
                    createMany: {
                        data: [...images.map((image: { url: string }) => image)]
                    }
                }
            }
        })

        return NextResponse.json(product)

    } catch (error) {
        console.error(`[PRODUCT_PATCH] =>`, error)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}

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