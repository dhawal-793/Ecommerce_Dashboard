'use client'

import { FC, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Size } from '@prisma/client'
import { Trash } from 'lucide-react'
import { toast } from 'react-hot-toast'
import * as z from 'zod'
import axios from 'axios'

import AlertModal from '@/components/modals/alert-modal'
import Heading from '@/components/ui/heading'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'

const formSchema = z.object({
    name: z.string().min(1),
    value: z.string().min(1)
})

type SizeformVaues = z.infer<typeof formSchema>

interface SizeFormProps {
    initialData: Size | null
}

const SizeForm: FC<SizeFormProps> = ({ initialData }) => {

    const params = useParams()
    const router = useRouter()

    const [open, setOpen] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)

    const title = initialData ? "Edit Size" : "Create Size"
    const description = initialData ? "Edit a Size" : "Add a new Size"
    const toastMessage = initialData ? "Size updated" : "Size created"
    const action = initialData ? "Save Changes" : "Create"

    const form = useForm<SizeformVaues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData || {
            name: '',
            value: '',
        }
    })

    const onSubmit = async (data: SizeformVaues) => {
        try {
            setLoading(true)
            if (initialData) {
                await axios.patch(`/api/${params.storeId}/sizes/${params.sizeId}`, data)
            }
            else {
                await axios.post(`/api/${params.storeId}/sizes`, data)
            }
            router.refresh()
            router.push(`/${params.storeId}/sizes`)
            toast.success(toastMessage)

        } catch (error) {
            toast.error("Something went wrong")
        }
        finally {
            setLoading(false)
        }
    }

    const onDelete = async () => {
        try {
            setLoading(true)
            await axios.delete(`/api/${params.storeId}/sizes/${params.sizeId}`)
            router.refresh()
            router.push(`/${params.storeId}/sizes`)
            toast.success("Size Deleted.")

        } catch (error) {
            toast.error("Make sure to remove all products using this size first.")
        }
        finally {
            setLoading(false)
            setOpen(false)
        }
    }

    return (
        <>
            <AlertModal isOpen={open} onClose={() => setOpen(false)} loading={loading} onConfirm={onDelete} />
            <div className='flex items-center justify-between' >
                <Heading title={title} description={description} />
                {initialData && (
                    <Button
                        variant="destructive"
                        disabled={loading}
                        size="sm"
                        onClick={() => setOpen(true)}
                    >
                        <Trash className='w-4 h-4' />
                    </Button>
                )}
            </div>
            <Separator />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='w-full space-y-8'>
                    <div className="grid grid-cols-3 gap-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={loading}
                                            placeholder='Size name'
                                            {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="value"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Value</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={loading}
                                            placeholder='Size value'
                                            {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button
                        disabled={loading}
                        type="submit"
                        className='ml-auto'
                    >
                        {action}
                    </Button>
                </form>
            </Form>
        </>

    )
}
export default SizeForm