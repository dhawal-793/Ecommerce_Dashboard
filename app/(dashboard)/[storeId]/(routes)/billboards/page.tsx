import BillboardClient from "./components/BillboardClient"

const Billboards = () => {
    return (
        <div className="flex flex-col">
            <div className="flex-1 p-8 pt-6 space-y-4">
                <BillboardClient />
            </div>
        </div>
    )
}

export default Billboards