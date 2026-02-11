
export const AboutPage = () => {
    return (
        <div className="space-y-5 pt-14">
            <h1 className="text-center text-4xl font-semibold tracking-tight mb-5">
                Nuestra empresa
            </h1>

            <img className="h-[500px] w-full object-cover" src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8ZWRpZmljaW8lMjBkZSUyMGxhJTIwZW1wcmVzYXxlbnwwfHwwfHx8MA%3D%3D" alt="Imagen de fondo" />

            <div className="flex flex-col gap-4 tracking-tighter leading-7 text-sm font-medium text-slate-800">
                <p className="">
                    CelularesBaratos es una tienda en línea que se dedica a la
                    Venta de celulares, fundada en 2021. Nuestro objetivo es
                    ofrecer a nuestros clientes la mejor calidad y precio en
                    celulares. Contamos con un equipo de profesionales que
                    encargan de seleccionar los mejores productos para ti.
                </p>

                <p className="">
                    En CelularesBaratos podrás encontrar una amplia variedad de
                    celulares de las mejores marcas. Además, contamos con
                    promociones y descuentos exclusivos para que puedas comprar
                    tu celular al mejor precio.
                </p>

                <h2 className="text-3xl font-semibold tracking-tight mt-8 mb-4">
                    No esperes más, y compra tu celular en CelularesBaratos.
                </h2>

                <p>
                    Para más información, no dudes en ponerte en contacto con nosotros, a través de nuestro correo electrónico
                    <a className="ml-1" href="mailto:correo@celularesbaratos.com">correo@celularesbaratos.com</a> o llamando al
                    <a className="ml-1" href="tel: 333 3333 3333">tel: 333 3333 3333</a>
                </p>
            </div>
        </div>
    )
}