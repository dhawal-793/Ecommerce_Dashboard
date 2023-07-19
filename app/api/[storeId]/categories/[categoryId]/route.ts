import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

import prismaDb from "@/lib/prismaDb"

export async function PATCH(req: Request, { params }: { params: { storeId: string, categoryId: string } }) {
    try {

        const { userId } = auth()
        if (!userId) return new NextResponse("Unauthenticated", { status: 401 })

        const { name, billboardId } = await req.json()
        if (!name) return new NextResponse("Name is required", { status: 400 })
        if (!billboardId) return new NextResponse("BillboardId is required", { status: 400 })

        const { storeId, categoryId } = params
        if (!storeId) return new NextResponse("StoreId is required", { status: 400 })
        if (!categoryId) return new NextResponse("CategoryId is required", { status: 400 })

        const storeByUserId = await prismaDb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        })
        if (!storeByUserId) {
            return new NextResponse("Unauthorized", { status: 403 })
        }

        const category = await prismaDb.category.updateMany({
            where: {
                id: categoryId,
            },
            data: { name, billboardId }
        })
        return NextResponse.json(category)

    } catch (error) {
        console.error(`[CATEGORY_PATCH] =>`, error)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}

export async function GET(req: Request, { params }: { params: { categoryId: string } }) {
    try {

        if (!params.categoryId) return new NextResponse("CategoryId is required", { status: 400 })

        const category = await prismaDb.category.findUnique({
            where: {
                id: params.categoryId
            }
        })
        return NextResponse.json(category)

    } catch (error) {
        console.error(`[CATEGORY_GET] =>`, error)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}