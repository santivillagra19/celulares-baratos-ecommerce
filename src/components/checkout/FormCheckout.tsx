import { useForm } from "react-hook-form"
import { InputAdress } from "./InputAdress"
import { addressSchema, type AddressFormValues } from "../../lib/validators"
import { zodResolver } from "@hookform/resolvers/zod"
import { ItemsCheckout } from "./ItemsCheckout"
import { useCreateOrder } from "../../hooks"
import { useCartStore } from "../../store/cart.store"
import { ImSpinner2 } from "react-icons/im";

export const FormCheckout = () => {
    const { register, formState: { errors }, handleSubmit } = useForm<AddressFormValues>({
        resolver: zodResolver(addressSchema),
        defaultValues: {
            country: "Argentina",
            addressLine2: "",
            codPostal: "",
            city: "",
            state: ""
        }
    });

    const { mutate: createOrder, isPending } = useCreateOrder();
    const cleanCart = useCartStore(state => state.cleanCart);
    const cartItems = useCartStore(state => state.cart);
    const totalAmount = useCartStore(state => state.getTotalPrice());

    const onSubmit = (data: AddressFormValues) => {

        const orderInput = {
            address: {
                addressLine1: data.addressLine1,
                addressLine2: data.addressLine2,
                city: data.city,
                state: data.state,
                codPostal: data.codPostal,
                country: data.country,

            },
            cartItems: cartItems.map(item => ({
                variantId: item.variantId,
                quantity: item.quantity,
                price: Number(item.price),
            })),
            totalAmount,
        };

        createOrder(orderInput, {
            onSuccess: () => {
                cleanCart();
            },
        });
    };

    if (isPending) {
        return (
            <div className="flex flex-col gap-3 items-center justify-center py-40">
                <ImSpinner2 className="animate-spin h-10 w-10 text-black" />
                <p className="text-sm font-medium">Estamos procesando su pedido...</p>
            </div>
        )
    }

    return <div className="max-w-lg w-full">
        <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-2">
                <h3 className="text-lg font-semibold text-gray-800">
                    Entrega
                </h3>

                <InputAdress
                    register={register}
                    errors={errors}
                    name="addressLine1"
                    placeholder="Dirección principal"
                />

                <InputAdress
                    register={register}
                    errors={errors}
                    name="addressLine2"
                    placeholder="Dirección adicional"
                />

                <InputAdress
                    register={register}
                    errors={errors}
                    name="state"
                    placeholder="Provincia"
                />

                <InputAdress
                    register={register}
                    errors={errors}
                    name="city"
                    placeholder="Ciudad"
                />

                <InputAdress
                    register={register}
                    errors={errors}
                    name="codPostal"
                    placeholder="Código Postal (opcional)"
                />

                <select
                    className="border border-slate-200 rounded-md p-2 cursor-pointer text-sm bg-white
                    focus:outline-none focus:ring-1 focus:ring-black"
                    {...register('country')}
                >
                    <option value="Argentina">Argentina</option>
                </select>
            </div>

            <div className="flex flex-col gap-3">
                <p className="text-sm font-medium">
                    Métodos de envío
                </p>
                <div className="flex justify-between items-center border border-gray-300 bg-stone-100 py-3 rounded-md px-4 cursor-pointer hover:border-black transition-colors">
                    <div className="font-normal text-gray-700">Standard</div>
                    <div className="font-semibold text-gray-900">Gratis</div>
                </div>
            </div>

            <div className="flex flex-col ">
                <div className="flex justify-between items-center text-sm border border-gray-300 bg-gray-50 py-2 px-4 rounded-t-md border-b-0">
                    <span className="font-medium text-gray-800">Depósito bancario</span>
                </div>

                <div className="flex flex-1 flex-col bg-stone-50 text-[13px] text-gray-600 p-4 space-y-1 border border-gray-300 rounded-b-md">
                    <p className="font-medium text-gray-800 mb-1">Compra a traves de transferencia bancaria</p>
                    <p><span className="font-semibold">Banco:</span> Galicia</p>
                    <p><span className="font-semibold">Razón Social:</span> CelularesBaratos</p>
                    <p><span className="font-semibold">Tipo de cuenta:</span> Corriente</p>
                    <p><span className="font-semibold">Número:</span> 12345678</p>
                    <p className="mt-2 text-xs text-gray-500 italic">
                        * La información será compartida nuevamente al finalizar la compra.
                    </p>
                </div>
            </div>

            <div className="flex flex-col gap-4 mt-4 ">
                <h3 className="font-semibold text-xl">
                    Resumen del pedido
                </h3>
                <ItemsCheckout />
            </div>

            <button className="bg-black text-white py-3 text-sm font-medium tracking-wide rounded-md 
            hover:bg-gray-800 transition-colors cursor-pointer" type="submit">
                Finalizar pedido
            </button>
        </form>
    </div>
}