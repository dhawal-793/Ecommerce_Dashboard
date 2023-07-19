import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

import prismaDb from "@/lib/prismaDb"

export async function POST(req: Request, { params }: { params: { storeId: string } }) {
    try {

        const { userId } = auth()
        if (!userId) return new NextResponse("Unauthenticated", { status: 401 })

        const { name, billboardId } = await req.json()
        if (!name) return new NextResponse("Name is required", { status: 400 })
        if (!billboardId) return new NextResponse("BillboardId is required", { status: 400 })

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

        const category = await prismaDb.category.create({
            data: {
                name,
                billboardId,
                storeId: params.storeId
            }
        })

        return NextResponse.json(category)

    } catch (error) {
        console.error(`[CATEGORY_POST] =>`, error)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}

export async function GET(req: Request, { params }: { params: { storeId: string } }) {
    try {
        
        if (!params.storeId) return new NextResponse("StoreId is required", { status: 400 })

        const categories = await prismaDb.category.findMany({
            where: {
                storeId: params.storeId
            }
        })

        return NextResponse.json(categories)

    } catch (error) {
        console.error(`[CATEGORIES_GET] =>`, error)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}