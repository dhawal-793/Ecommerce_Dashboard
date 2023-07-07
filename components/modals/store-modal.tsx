'use client'

import { useStoreModal } from "@/hooks/use-store-modal"
import Modal from "@/components/ui/modal"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"


const formSchema = z.object({
    name: z.string().min(1)
})


export const StoreModal = () => {
    const storeModal = useStoreModal()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: ""
        }
    })

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        // Todo: Create Store
        console.log(values);

    }

    return (
        <Modal
            title="Create Store"
            description="Create a brand new store"
            isOpen={storeModal.isOpen}
            onClose={storeModal.onClose}
        >
            Form for Creating Store
        </Modal>
    )
}