import { UserButton } from "@clerk/nextjs";

export default function Home() {
  return (
    <div className="flex justify-between items-center p-4">
      <p>Home</p>
      <UserButton afterSignOutUrl="/"/>
    </div>
    
  )
}
