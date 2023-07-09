'use client'

import { Button } from '@/components/ui/button'
import Heading from '@/components/ui/heading'
import { Separator } from '@/components/ui/separator'
import { Store } from '@prisma/client'
import { Trash } from 'lucide-react'
import { FC } from 'react'

interface SettingsFormProps {
    initialData: Store
}

const SettingsForm: FC<SettingsFormProps> = ({ initialData }) => {



    return (
        <>
            <div className='flex items-center justify-between' >
                <Heading title="Settings" description='Manage store preferences' />
                <Button variant="destructive"
                    size="sm"
                    onClick={() => { }}
                >
                    <Trash className='w-4 h-4' />
                </Button>
            </div>
            <Separator />
        </>

    )
}
export default SettingsForm