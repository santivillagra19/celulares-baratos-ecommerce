import { z } from 'zod';

export const userRegisterSchema = z.object({
    email: z
        .string()
        .email('Por favor, ingrese un correo electrónico válido'),
    password: z
        .string()
        .min(6, 'La contraseña debe tener al menos 6 caracteres'),
    fullName: z
        .string()
        .min(2, 'El nombre completo es requerido'),
    phone: z
        .string()
        .optional(),
});

export const addressSchema = z.object({
    addressLine1: z.string().min(1, 'La dirección requerida').max(100, 'La dirección no debe excender los 100 caracteres'),
    addressLine2: z.string().max(100, 'La dirección no debe excender los 100 caracteres').optional(),
    ciudad: z.string().min(1, 'La ciudad es requerida').max(50, 'La ciudad no debe exceder los 50 caracteres'),
    provincia: z.string().min(1, 'La provincia es requerida').max(50, 'La provincia no debe exceder los 50 caracteres'),
    codPostal: z.string().max(6, 'El código postal no debe exceder los 6 caracteres').optional(),
    pais: z.string().min(1, 'El país es requerido')
})

export type UserRegisterFormValues = z.infer<
    typeof userRegisterSchema
>;

export type AddressFormValues = z.infer<typeof addressSchema>;

