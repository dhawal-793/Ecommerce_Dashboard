'use client'

import { FC, useEffect, useState } from 'react'
import { Button } from './button'
import { ImagePlus, Trash } from 'lucide-react'
import Image from 'next/image'
import { CldUploadWidget } from 'next-cloudinary'

interface ImageUploadProps {
    disabled?: boolean
    onChange: (value: string) => void
    onRemove: (value: string) => void
    value: string[]
}

const ImageUpload: FC<ImageUploadProps> = ({ disabled, onChange, onRemove, value }) => {

    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    const onUpload = (result: any) => {
        onChange(result.info.secure_url)
    }


    if (!isMounted) return null

    return (
        <div>
            <div className="flex items-center gap-4 mb-4">
                {value.map(url => (
                    <div key={url} className='relative w-[200px] h-[200px] rounded-md overflow-hidden'>
                        <div className='absolute z-10 top-2 right-2'>
                            <Button
                                variant="destructive"
                                type="button"
                                size="icon"
                                onClick={() => onRemove(url)}
                            >
                                <Trash className='w-4 h-4' />
                            </Button>
                        </div>
                        <Image
                            fill
                            src={url}
                            alt="Image"
                            className='object-cover'
                        />
                    </div>
                ))}
            </div>
            <CldUploadWidget onUpload={onUpload} uploadPreset='opmr5lqk'>

                {
                    ({ open }) => {
                        const onClick = () => {
                            open()
                        }
                        return (
                            <Button
                                disabled={disabled}
                                type="button"
                                variant="secondary"
                                onClick={onClick}
                            >
                                <ImagePlus className='w-4 h-4 mr-2' />
                                Upload an Image
                            </Button>
                        )
                    }
                }
            </CldUploadWidget>
        </div>
    )
}

export default ImageUpload