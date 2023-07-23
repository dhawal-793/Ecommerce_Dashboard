import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

import prismaDb from "@/lib/prismaDb"

export async function POST(req: Request, { params }: { params: { storeId: string } }) {
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

        if (!params.storeId) return new NextResponse("StoreId is required", { status: 400 })

        const storeByUserId = await prismaDb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        })
        if (!storeByUserId) {
            return new NextResponse("Unauthorized", { status: 403 })
        }

        const product = await prismaDb.product.create({
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
                    createMany: {
                        data: [...images.map((image: { url: string }) => image)]
                    }
                }
            }
        })

        return NextResponse.json(product)

    } catch (error) {
        console.error(`[PRODUCT_POST] =>`, error)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}

export async function GET(req: Request, { params }: { params: { storeId: string } }) {
    try {

        if (!params.storeId) return new NextResponse("StoreId is required", { status: 400 })

        const { searchParams } = new URL(req.url)
        const categoryId = searchParams.get("categoryId") || undefined
        const sizeId = searchParams.get("sizeId") || undefined
        const colorId = searchParams.get("colorId") || undefined
        const isFeatured = searchParams.get("isFeatured")


        const products = await prismaDb.product.findMany({
            where: {
                storeId: params.storeId,
                categoryId,
                colorId,
                sizeId,
                isFeatured: isFeatured ? true : undefined,
                isArchived: false
            },
            include: {
                images: true,
                category: true,
                size: true,
                color: true
            },
            orderBy: {
                createdAt: "desc"
            }
        })

        return NextResponse.json(products)

    } catch (error) {
        console.error(`[PRODUCTS_GET] =>`, error)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}