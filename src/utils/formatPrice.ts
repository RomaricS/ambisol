import { categories } from '../types/product';

export function formatPrice(price: number): string {
    return new Intl.NumberFormat('fr-FR', {
        style: 'currency',
        currency: 'XOF',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(price);
}

export const getCategory = (idCat: number): string | undefined => 
    categories.find(({ id }) => id == idCat)?.label ?? categories[0].label;
