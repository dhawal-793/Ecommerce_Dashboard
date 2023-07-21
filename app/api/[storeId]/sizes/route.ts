import { NextResponse } from "next/server"

import prismaDb from "@/lib/prismaDb"

export async function GET(req: Request, { params }: { params: { storeId: string } }) {
    try {

        if (!params.storeId) return new NextResponse("StoreId is required", { status: 400 })
        
        const sizes = await prismaDb.size.findMany({
            where: {
                storeId: params.storeId
            }
        })

        return NextResponse.json(sizes)

    } catch (error) {
        console.error(`[SIZES_GET] =>`, error)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}