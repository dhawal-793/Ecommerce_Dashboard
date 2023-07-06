'use client'

import { UserButton } from "@clerk/nextjs";
import { useEffect } from "react";

import { useStoreModal } from "@/hooks/use-store-modal";

export default function Home() {
  const onOpen = useStoreModal((state) => state.onOpen);
  const isOpen = useStoreModal((state) => state.isOpen);

  useEffect(() => {
    if (!isOpen) {
      onOpen()
    }
  }, [onOpen, isOpen])

  return (
    <>
      <div className="flex items-center justify-end p-4">
        <UserButton afterSignOutUrl="/" />
      </div>
    </>

  )
}
