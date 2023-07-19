import { NextResponse } from "next/server"

import prismaDb from "@/lib/prismaDb"

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