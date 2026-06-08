import { useState } from "react"

interface Props {
    images: string[];
}

export const GridImages = ({ images }: Props) => {
    const [activeImage, setActiveImage] = useState(images[0])

    return (
        <div className="flex-1 flex flex-col gap-3 relative">
            <div className="bg-white border border-gray-100 shadow-sm h-[500px] p-4 rounded-xl flex items-center justify-center">
                <img src={activeImage} alt="Imagen de producto" className="h-full w-full object-scale-down" />
            </div>

            <div className="flex mt-4 gap-2">
                {images.map((image, index) => (
                    <button
                        key={index}
                        onClick={() => setActiveImage(image)}
                        className={`w-20 h-20 border-2 rounded-lg p-1 bg-white transition-all ${activeImage === image ? 'border-black scale-105' : 'border-transparent hover:border-gray-300'}`}
                    >
                        <img src={image} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-scale-down rounded-md" />
                    </button>
                ))}
            </div>
        </div>
    )
}
