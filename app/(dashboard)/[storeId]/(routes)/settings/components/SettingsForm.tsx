'use client'

import { FC, useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Store } from '@prisma/client'
import { Trash } from 'lucide-react'
import { toast } from 'react-hot-toast'
import * as z from 'zod'
import axios from 'axios'

import AlertModal from '@/components/modals/alert-modal'
import ApiAlert from '@/components/ui/api-alert'
import Heading from '@/components/ui/heading'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { UseOrigin } from '@/hooks/use-origin'

interface SettingsFormProps {
    initialData: Store
}

const formSchema = z.object({
    name: z.string().min(1)
})

type SettingsformVaues = z.infer<typeof formSchema>


const SettingsForm: FC<SettingsFormProps> = ({ initialData }) => {

    const params = useParams()
    const router = useRouter()
    const origin = UseOrigin()

    const [open, setOpen] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)

    const form = useForm<SettingsformVaues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData
    })

    const onSubmit = async (data: SettingsformVaues) => {
        try {
            setLoading(true)
            await axios.patch(`/api/stores/${params.storeId}`, data)
            router.refresh()
            toast.success("Store updated successfully")

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
            await axios.delete(`/api/stores/${params.storeId}`)
            router.refresh()
            toast.success("Store deleted successfully")

        } catch (error) {
            toast.error("Make sure to remove all products and categories first.")
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
                <Heading title="Settings" description='Manage store preferences' />
                <Button
                    variant="destructive"
                    disabled={loading}
                    size="sm"
                    onClick={() => setOpen(true)}
                >
                    <Trash className='w-4 h-4' />
                </Button>
            </div>
            <Separator />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8 wfull'>
                    <div className="grid grid-cols-3 gap-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input disabled={loading} placeholder='Store Name' {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <Button disabled={loading} type="submit" className='ml-auto'
                    >Save Changes</Button>
                </form>
            </Form>
            <Separator />
            <ApiAlert title='NEXT_PUBLIC_API_URL' description={`${origin}/api/${params.storeId}`} variant='admin' />
        </>

    )
}
export default SettingsForm