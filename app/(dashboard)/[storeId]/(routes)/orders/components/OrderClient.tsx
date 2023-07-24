'use client'

import { FC } from 'react'

import Heading from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { DataTable } from '@/components/ui/data-table'
import { OrderColumn, columns } from './colums'

interface BillboardClientProps {
    data: OrderColumn[]
}

const BillboardClient: FC<BillboardClientProps> = ({ data }) => {

    return (
        <>
            <Heading
                title={`Orders (${data.length})`}
                description="Manage Orders for store."
            />
            <Separator />
            <DataTable columns={columns} data={data} searchKey='products' />
        </>
    )
}

export default BillboardClient