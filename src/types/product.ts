export interface Product {
  id: string;
  title: string;
  description: string;
  category: number;
  price: number;
  imageUrl: string;
  createdAt: Date;
}

export interface Category {
  id: number,
  label: ProductCategory,
};

export enum ProductCategory {
  HuilesEssentielles = 'Huiles essentielles',
  Parfums = 'Parfums',
  Aroma = 'Aromathérapie',
  HuilesVege = 'Huiles végétales',
};

export const categories: Category[] = [
  {
    id: 0,
    label: ProductCategory.HuilesEssentielles
  },
  {
    id: 1,
    label: ProductCategory.Parfums
  },
  {
    id: 2,
    label: ProductCategory.Aroma
  },
  {
    id: 3,
    label: ProductCategory.HuilesVege
  }
];

export const base_image_url = "https://web.whatsapp.com/8c510422-35d2-4c3a-b145-5d46ceb21032"