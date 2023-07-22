'use client'

import { FC } from 'react'
import { useParams, useRouter } from "next/navigation"
import { Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import Heading from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { DataTable } from '@/components/ui/data-table'
import { ColorColumn, columns } from './colums'
import ApiList from '@/components/ui/api-list'

interface ColorClientProps {
    data: ColorColumn[]
}

const ColorClient: FC<ColorClientProps> = ({ data }) => {
    const router = useRouter()
    const params = useParams()

    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Colors (${data.length})`}
                    description="Manage Colors for store."
                />
                <Button onClick={() => router.push(`/${params.storeId}/colors/new`)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add New
                </Button>
            </div>
            <Separator />
            <DataTable columns={columns} data={data} searchKey='name' />
            <Heading
                title="API"
                description="API calls for Colors."
            />
            <Separator/>
            <ApiList  entityName='colors' entityIdName='colorId'/>
            
        </>
    )
}

export default ColorClient