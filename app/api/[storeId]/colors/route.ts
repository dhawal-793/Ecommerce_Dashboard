import { NextResponse } from "next/server"

import prismaDb from "@/lib/prismaDb"

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