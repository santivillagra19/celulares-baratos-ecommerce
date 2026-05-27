import { Link } from "react-router-dom"
import { IoAddCircleOutline } from "react-icons/io5"
import { TableProduct } from "../../components/dashboard"

export const DashboardProductsPage = () => {
    return (
        <div className="container mx-auto pb-10">
            <div className="flex justify-end mb-6">
                <Link 
                    to='/dashboard/products/new' 
                    className="flex items-center gap-3 px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors font-medium shadow-sm"
                >
                    <IoAddCircleOutline size={22} />
                    <span>Nuevo producto</span>
                </Link>
            </div>

            <TableProduct />
        </div>
    )
}
