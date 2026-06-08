import { z } from 'zod';
import type { JSONContent } from '@tiptap/react';

const isContentEmpty = (content: JSONContent): boolean => {
    if (!content || !content.content) return true;
    // Validar si es un párrafo vacío que Tiptap suele dejar por defecto
    if (content.content.length === 1 && content.content[0].type === 'paragraph' && !content.content[0].content) {
        return true;
    }
    return content.content.length === 0;
};

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
    addressLine1: z.string().min(1, 'La dirección es requerida').max(100, 'La dirección no debe exceder los 100 caracteres'),
    addressLine2: z.string().max(100, 'La dirección no debe excender los 100 caracteres').optional().or(z.literal('')),
    city: z.string().min(1, 'La ciudad es requerida').max(50, 'La ciudad no debe exceder los 50 caracteres'),
    state: z.string().min(1, 'La provincia es requerida').max(50, 'La provincia no debe exceder los 50 caracteres'),
    codPostal: z.string().max(6, 'El código postal no debe exceder los 6 caracteres').optional().or(z.literal('')),
    country: z.string().min(1, 'El país es requerido')
});

export const variantSchema = z.object({
    id: z.string().optional(),
    color_name: z.string().min(1, 'El color es requerido'),
    storage: z.string().min(1, 'El almacenamiento es requerido'),
    price: z.coerce.number().min(0, 'El precio no puede ser negativo'),
    stock: z.coerce.number().int('El stock debe ser un entero').min(0, 'El stock no puede ser negativo'),
});

export const productSchema = z.object({
    name: z.string().min(1, 'El nombre del producto es requerido').max(100, 'El nombre del producto no debe exceder los 100 caracteres'),
    brand: z.string().min(1, 'La marca del producto es requerida').max(50, 'La marca del producto no debe exceder los 50 caracteres'),
    slug: z.string().min(1, 'El slug del producto es requerido').regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'El slug debe contener solo letras minúsculas, números y guiones'),
    features: z.array(z.object({
        value: z.string().min(1, 'La característica es requerida'), 
    })).default([]),
    description: z.custom<JSONContent>(
        (value) => !isContentEmpty(value as JSONContent), 
        { message: 'La descripción detallada es requerida' }
    ),
    images: z.array(z.custom<File | string>((val) => val instanceof File || typeof val === 'string', 'Debe ser un archivo válido o URL')).default([]),
    variants: z.array(variantSchema).min(1, 'Debe haber al menos 1 variante').default([]), 
});

export type UserRegisterFormValues = z.infer<typeof userRegisterSchema>;
export type AddressFormValues = z.infer<typeof addressSchema>;
export type ProductFormValues = z.infer<typeof productSchema>;
export type ProductFormInput = z.input<typeof productSchema>;