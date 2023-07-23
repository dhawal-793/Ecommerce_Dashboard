"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-action"


export type ProductColumn = {
    id: string
    name: string
    price: string
    category: string
    size: string
    color: string
    isFeatured: boolean
    isArchived: boolean
    createdAt: string

}

export const columns: ColumnDef<ProductColumn>[] = [
    {
        accessorKey: "name",
        header: "Name",
    },

    {
        accessorKey: "price",
        header: "Price",
    },
    {
        accessorKey: "size",
        header: "Size",
    },
    {
        accessorKey: "color",
        header: "Color",
        cell: ({ row }) => (
            <div className="flex items-center gap-x-2">
                {row.original.color}
                <div className="w-6 h-6 border rounded-full" style={{ backgroundColor: row.original.color }} />
            </div>
        )
    },
    {
        accessorKey: "createdAt",
        header: "Date",
    },
    {
        accessorKey: "iaArchived",
        header: "Archived",
    },
    {
        accessorKey: "iaFeatured",
        header: "Featured",
    },
    {
        id: "actions",
        cell: ({ row }) => <CellAction data={row.original} />
    }
]
