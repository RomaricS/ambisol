import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Product, categories } from '../types/product';
import { ProductCard } from '../components/ProductCard';
import { Search, SlidersHorizontal } from 'lucide-react';

export function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<string>('');
    const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({
        min: 0,
        max: 5000,
    });
    const [showFilters, setShowFilters] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const productsSnapshot = await getDocs(
                    collection(db, 'products')
                );
                const productsData = productsSnapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                })) as Product[];
                setProducts(productsData);
            } catch (error) {
                console.error('Error fetching products:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    const filteredProducts = products.filter((product) => {
        const matchesSearch =
            product.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            product.description
                .toLowerCase()
                .includes(searchTerm.toLowerCase());
        const matchesCategory =
            selectedCategory === '' ||
            product.category.toString() === selectedCategory;
        const matchesPrice =
            product.price >= priceRange.min && product.price <= priceRange.max;

        return matchesSearch && matchesCategory && matchesPrice;
    });

    if (loading) {
        return (
            <div className='flex min-h-screen items-center justify-center'>
                <div className='h-12 w-12 animate-spin rounded-full border-4 border-primary-600 border-t-transparent'></div>
            </div>
        );
    }

    return (
        <div className='min-h-screen bg-gray-50 py-12'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='mb-8'>
                    <h1 className='text-3xl font-bold text-gray-900 mb-4'>
                        Nos Produits
                    </h1>

                    {/* Search and Filter Toggle */}
                    <div className='flex flex-col md:flex-row gap-4 items-center mb-6'>
                        <div className='relative flex-1'>
                            <Search className='absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400' />
                            <input
                                type='text'
                                placeholder='Rechercher un produit...'
                                className='w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent'
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className='flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors'>
                            <SlidersHorizontal className='h-5 w-5' />
                            Filtres
                        </button>
                    </div>

                    {/* Filters */}
                    {showFilters && (
                        <div className='bg-white p-6 rounded-lg shadow-sm mb-6'>
                            <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                                <div>
                                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                                        Catégorie
                                    </label>
                                    <select
                                        className='w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent'
                                        value={selectedCategory}
                                        onChange={(e) =>
                                            setSelectedCategory(e.target.value)
                                        }>
                                        <option value=''>
                                            Toutes les catégories
                                        </option>
                                        {categories.map((category) => (
                                            <option
                                                key={category.id}
                                                value={category.id}>
                                                {category.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div>
                                    <label className='block text-sm font-medium text-gray-700 mb-2'>
                                        Prix (€)
                                    </label>
                                    <div className='flex gap-4 items-center'>
                                        <input
                                            type='number'
                                            placeholder='Min'
                                            className='w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent'
                                            value={priceRange.min}
                                            onChange={(e) =>
                                                setPriceRange({
                                                    ...priceRange,
                                                    min: Number(e.target.value),
                                                })
                                            }
                                        />
                                        <span className='text-gray-500'>à</span>
                                        <input
                                            type='number'
                                            placeholder='Max'
                                            className='w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent'
                                            value={priceRange.max}
                                            onChange={(e) =>
                                                setPriceRange({
                                                    ...priceRange,
                                                    max: Number(e.target.value),
                                                })
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Results */}
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                            <ProductCard
                                key={product.id}
                                product={product}
                            />
                        ))
                    ) : (
                        <div className='col-span-full text-center py-12'>
                            <p className='text-gray-500 text-lg'>
                                Aucun produit ne correspond à vos critères de
                                recherche.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
