import { useState } from "react"
import { HiOutlineSearch } from "react-icons/hi"
import { IoMdClose } from "react-icons/io";

export const Search = () => {
    const [searchTerm, setSearchTerm] = useState('');

    return <>
        <div className="py-5 px-7 flex gap-10 items-center border-b border-slate-200">
            <form
                className="flex gap-3 items-center flex-1"
            >
                <HiOutlineSearch size={22} />
                <input
                    type="text"
                    placeholder="¿Que busca?"
                    className="outline-none w-full text-sm"
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                >
                </input>

                <button>
                    <IoMdClose size={22} />
                </button>
            </form>
        </div>
    </>
}