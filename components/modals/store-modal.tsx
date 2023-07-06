'use client'

import { useStoreModal } from "@/hooks/use-store-modal"
import Modal from "@/components/ui/modal"

export const StoreModal = () => {
    const storeModal = useStoreModal()
    return (
        <Modal
            title="Create Store"
            description="Create a new store"
            isOpen={storeModal.isOpen}
            onClose={storeModal.onClose}
        >
            Form for Creating Store
        </Modal>
    )
}