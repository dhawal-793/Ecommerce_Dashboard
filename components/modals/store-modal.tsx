'use client'

import { useStoreModal } from "@/hooks/use-store-modal"
import Modal from "@/components/ui/modal"
import * as z from "zod"
import axios from "axios"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"

const formSchema = z.object({
    name: z.string().min(1)
})


export const StoreModal = () => {
    const storeModal = useStoreModal()
    const [loading, setLoading] = useState(false)
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: ""
        }
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            setLoading(true)
            const response = await axios.post("/api/stores", values)
            console.log("response", response.data);

        } catch (error) {
            console.log(error);

        }
        finally {
            setLoading(false)
        }

    }

    return (
        <Modal
            title="Create Store"
            description="Create a brand new store"
            isOpen={storeModal.isOpen}
            onClose={storeModal.onClose}
        >
            <div>
                <div className="py-2 pb-4 space-y-4">
                    <Form {...form} >
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField control={form.control} name="name" render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled={loading}
                                            placeholder="E-commerce"
                                            {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )} />
                            <div className="flex items-center justify-end w-full pt-6 space-x-2">
                                <Button
                                    disabled={loading}
                                    variant="outline"
                                    onClick={storeModal.onClose}
                                >Cancel
                                </Button>
                                <Button
                                    disabled={loading}
                                    type="submit"
                                >Continue
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            </div>
        </Modal>
    )
}