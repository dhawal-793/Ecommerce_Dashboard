'use client'

import { FC } from 'react'
import { useParams, useRouter } from "next/navigation"
import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import Heading from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { DataTable } from '@/components/ui/data-table'
import { BillboardColumn, columns } from './colums'
import ApiList from '@/components/ui/api-list'

interface BillboardClientProps {
    data: BillboardColumn[]
}

const BillboardClient: FC<BillboardClientProps> = ({ data }) => {
    const router = useRouter()
    const params = useParams()

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Billboards (${data.length})`}
                    description="Manage Billboards for store."
                />
                <Button onClick={() => router.push(`/${params.storeId}/billboards/new`)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add New
                </Button>
            </div>
            <Separator />
            <DataTable columns={columns} data={data} searchKey='label' />
            <Heading
                title="API"
                description="API calls for Billboards."
            />
            <Separator/>
            <ApiList  entityName='billboards' entityIdName='billboardId'/>
            
        </>
    )
}

export default BillboardClient