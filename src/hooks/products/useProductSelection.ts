import { useState, useMemo, useEffect } from "react";
import type { VariantProduct, Product } from "../../interfaces"; // Ajusta tus imports

interface Acc {
    [key: string]: { name: string; storages: string[] };
}

export const useProductSelection = (product: Product | undefined) => {
    const [selectedColor, setSelectedColor] = useState<string | null>(
        null
    );

    const [selectedStorage, setSelectedStorage] = useState<string | null>(
        null
    );

    const colors = useMemo(() => {
        return product?.variants?.reduce((acc: Acc, variant: VariantProduct) => {
            const { color, color_name, storage } = variant
            if (!acc[color]) {
                acc[color] = {
                    name: color_name,
                    storages: []
                };
            }

            if (!acc[color].storages.includes(storage)) {
                acc[color].storages.push(storage);
            }

            return acc;
        }, {} as Acc) || {};
    }, [product?.variants]);

    const availableColors = Object.keys(colors);

    useEffect(() => {
        if (!selectedColor && availableColors.length > 0 && product) {
            const firstColor = availableColors[0];
            setSelectedColor(firstColor);
            setSelectedStorage(colors[firstColor].storages[0]);
        }
    }, [product, availableColors, selectedColor, colors]);

    // 3. Lógica derivada (No necesita useEffect, se calcula al vuelo)
    const selectedVariant = product?.variants.find(
        (v) => v.color === selectedColor && v.storage === selectedStorage
    ) || null;

    // 4. Manejadores inteligentes (Evitan useEffects en cadena)
    const handleColorChange = (newColor: string) => {
        setSelectedColor(newColor);
        // Al cambiar color, reseteamos el storage al primero disponible de ese color automáticamente
        if (colors[newColor]) {
            setSelectedStorage(colors[newColor].storages[0]);
        }
    };

    return {
        selectedColor,
        selectedStorage,
        selectedVariant,
        colors,
        availableColors,
        handleColorChange,
        handleStorageChange: setSelectedStorage,
    };
}