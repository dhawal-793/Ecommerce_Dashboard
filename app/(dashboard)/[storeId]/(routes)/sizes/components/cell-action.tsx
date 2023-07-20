'use client'
import { FC, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import { Trash } from 'lucide-react'
import { Copy, Edit, MoreHorizontal } from 'lucide-react'
import axios from 'axios'

import { SizeColumn } from './colums'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import AlertModal from '@/components/modals/alert-modal'

interface CellActionProps {
    data: SizeColumn
}

export const CellAction: FC<CellActionProps> = ({ data }) => {
    const router = useRouter()
    const params = useParams()

    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)

    const onCopy = () => {
        navigator.clipboard.writeText(data.id)
        toast.success("Size Id copied to clipboard.")
    }

    const onUpdate = () => {
        router.push(`/${params.storeId}/sizes/${data.id}`)
    }

    const onDelete = async () => {
        try {
            setLoading(true)
            await axios.delete(`/api/${params.storeId}/sizes/${data.id}`)
            router.refresh()
            toast.success("Size Deleted.")

        } catch (error) {
            toast.error("Make sure to remove all categories using this billboard first.")
        }
        finally {
            setLoading(false)
            setOpen(false)
        }
    }
    return (
        <>
            <AlertModal isOpen={open} onClose={() => setOpen(false)} loading={loading} onConfirm={onDelete} />
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        className='w-8 h-8 p-0'
                    >
                        <span className="sr-only">Open options</span>
                        <MoreHorizontal className='w-4 h-4' />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={ onCopy}>
                        <Copy className='w-4 h-4 mr-2' /> Copy Id
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={onUpdate}>
                        <Edit className='w-4 h-4 mr-2' /> Update
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setOpen(true)}>
                        <Trash className='w-4 h-4 mr-2' /> Delete
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu></>
    )
}


