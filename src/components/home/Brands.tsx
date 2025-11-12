const brands = [
    {
        image: '/images/brands/Apple-Logo.webp',
        alt: 'Apple'
    },
    {
        image: '/images/brands/honor-logo.png',
        alt: 'Honor'
    },
    {
        image: '/images/brands/huawei-logo.png',
        alt: 'Huawei'
    },
    {
        image: '/images/brands/realme-logo.webp',
        alt: 'Realme'
    },
    {
        image: '/images/brands/Samsung_Logo.webp',
        title: 'Samsung'
    },
    {
        image: '/images/brands/xiaomi-logo.webp',
        title: 'Xiaomi'
    }
]



export const Brands = () => {
    return <div className="flex flex-col items-center gap-3 pt-16 pb-12">
        <h2 className="font-bold text-2xl">
            Marcas que disponemos
        </h2>

        <p className="w-2/3 text-center text-sm md:text-base">
            Tenemos lo mas moderno en tecnología y los últimos modelos de celulares disponibles
        </p>

        <div className="grid grid-cols-3 gap-3 mt-8 items-center md:grid-cols-6">
            {
                brands.map((brand, index) => (
                    <div key={index}>
                        <img
                            src={brand.image}
                            alt={brand.alt}
                            className="w-20 h-20 object-contain"
                        />
                    </div>
                ))
            }
        </div>
    </div>
}