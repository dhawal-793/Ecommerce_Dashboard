import { auth } from "@clerk/nextjs"
import { NextResponse } from "next/server"

import prismaDb from "@/lib/prismaDb"

export async function POST(req: Request, { params }: { params: { storeId: string } }) {
    try {

        const { userId } = auth()
        if (!userId) return new NextResponse("Unauthenticated", { status: 401 })

        const { name, value } = await req.json()
        if (!name) return new NextResponse("Color Name is required", { status: 400 })
        if (!value) return new NextResponse("Color Value is required", { status: 400 })

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

        const color = await prismaDb.color.create({
            data: {
                name,
                value,
                storeId: params.storeId
            }
        })

        return NextResponse.json(color)

    } catch (error) {
        console.error(`[COLOR_POST] =>`, error)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}

export async function GET(req: Request, { params }: { params: { storeId: string } }) {
    try {

        if (!params.storeId) return new NextResponse("StoreId is required", { status: 400 })
        
        const colors = await prismaDb.color.findMany({
            where: {
                storeId: params.storeId
            }
        })

        return NextResponse.json(colors)

    } catch (error) {
        console.error(`[COLORS_GET] =>`, error)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}