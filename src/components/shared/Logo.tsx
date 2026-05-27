import { Link } from "react-router-dom"

interface LogoProps {
    isDashboard?: boolean;
}

export const Logo = ({ isDashboard }: LogoProps) => {
    return (
        <Link to='/' className={`text-2xl font-bold tracking-tighter transition-all 
        ${isDashboard ? 'text-white hover:scale-105' : 'text-gray-800 hover:text-gray-600'}`}>
            <p className="hidden lg:block">
                Celulares
                <span className="text-cyan-600">Baratos</span>
            </p>

            <p className="flex text-2xl lg:hidden">
                <span className="text-cyan-600 -skew-x-6">C</span>
                <span className="text-cyan-600 skew-x-6">B</span>
            </p>
        </Link>
    )
}