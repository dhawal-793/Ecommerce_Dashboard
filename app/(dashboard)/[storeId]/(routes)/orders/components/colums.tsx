"use client"

import { ColumnDef } from "@tanstack/react-table"


export type OrderColumn = {
    id: string
    phone: string
    address: string
    isPaid: boolean
    products: string
    totalPrice: string
    createdAt: string
}

export const columns: ColumnDef<OrderColumn>[] = [
    {
        accessorKey: "products",
        header: "Products",
    },
    {
        accessorKey: "phone",
        header: "Phone",
    },
    {
        accessorKey: "address",
        header: "Address",
    },
    {
        accessorKey: "totalPrice",
        header: "Total",
    },
    {
        accessorKey: "isPaid",
        header: "Paid",
        cell: ({ row }) => row.original.isPaid ? 'Yes' : 'No'
    },
    {
        accessorKey: "createdAt",
        header: "Date",
    },
]
