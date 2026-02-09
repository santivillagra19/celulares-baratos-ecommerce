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
    }, [product]);

    const availableColors = Object.keys(colors);

    useEffect(() => {
        if (!product || availableColors.length === 0) return;

        // Caso A: No hay nada seleccionado (carga inicial)
        // Caso B: El color que estaba seleccionado YA NO EXISTE en el nuevo producto (cambio de página)
        const isCurrentSelectionInvalid = !selectedColor || !colors[selectedColor];

        if (isCurrentSelectionInvalid) {
            const firstColor = availableColors[0];
            setSelectedColor(firstColor);

            if (colors[firstColor] && colors[firstColor].storages.length > 0) {
                setSelectedStorage(colors[firstColor].storages[0]);
            }
        }
    }, [product, availableColors, selectedColor, colors]);

    const selectedVariant = product?.variants.find(
        (v) => v.color === selectedColor && v.storage === selectedStorage
    ) || null;

    const handleColorChange = (newColor: string) => {
        setSelectedColor(newColor);
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