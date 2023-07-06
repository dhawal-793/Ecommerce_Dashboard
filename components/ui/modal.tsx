'use client'

import { FC } from 'react'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog';

interface ModalProps {
    title: string;
    description: string;
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const Modal: FC<ModalProps> = ({ title, description, isOpen, onClose, children }) => {

    const onChange = (open: boolean) => {
        if (!open) {
            onClose()
        }
    }
    return (
        <Dialog open={isOpen} onOpenChange={onChange}>
            <DialogContent>
                <DialogTitle>{title}</DialogTitle>
                <DialogDescription>{description}</DialogDescription>
            </DialogContent>
        </Dialog>
    )
}

export default Modal