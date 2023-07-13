
import { format } from 'date-fns'

import prismaDb from "@/lib/prismaDb"
import BillboardClient from "./components/BillboardClient"




import { FC } from 'react'
import { BillboardColumn } from "./components/colums"

interface BillboardsProps {
    params: {
        storeId: string
    }
}

const Billboards: FC<BillboardsProps> = async ({ params }) => {
    const billboards = await prismaDb.billboard.findMany({
        where: {
            storeId: params.storeId
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    const formattedBillboards: BillboardColumn[] = billboards.map(billboard => ({

        id: billboard.id,
        label: billboard.label,
        createdAt: format(billboard.createdAt, "MMMM, do, yyyy")
    }))

    return (
        <div className="flex flex-col">
            <div className="flex-1 p-8 pt-6 space-y-4">
                <BillboardClient data={formattedBillboards} />
            </div>
        </div>
    )
}

export default Billboards