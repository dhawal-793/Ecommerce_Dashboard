
import { format } from 'date-fns'

import prismaDb from "@/lib/prismaDb"
import SizeClient from "./components/SizeClient"


import { FC } from 'react'
import { SizeColumn } from "./components/colums"

interface SizesProps {
    params: {
        storeId: string
    }
}

const Sizes: FC<SizesProps> = async ({ params }) => {
    const sizes = await prismaDb.size.findMany({
        where: {
            storeId: params.storeId
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    const formattedSizes: SizeColumn[] = sizes.map(size => ({

        id: size.id,
        name: size.name,
        value:size.value,
        createdAt: format(size.createdAt, "MMMM, do, yyyy")
    }))

    return (
        <div className="flex flex-col">
            <div className="flex-1 p-8 pt-6 space-y-4">
                <SizeClient data={formattedSizes} />
            </div>
        </div>
    )
}

export default Sizes