'use client'

import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import Heading from '@/components/ui/heading'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { zodResolver } from '@hookform/resolvers/zod'
import { Store } from '@prisma/client'
import { Trash } from 'lucide-react'
import { FC, useState } from 'react'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

interface SettingsFormProps {
    initialData: Store
}



const formSchema = z.object({
    name: z.string().min(1)
})

type SettingsformVaues = z.infer<typeof formSchema>


const SettingsForm: FC<SettingsFormProps> = ({ initialData }) => {

    const [open, setOpen] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)
    const form = useForm<SettingsformVaues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData
    })

    const onSubmit = async (data: SettingsformVaues) => {
        console.log("data=>", data);

    }

    return (
        <>
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
        </>

    )
}
export default SettingsForm