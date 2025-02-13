import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ProductCard } from './ProductCard';
import { Product } from '../types/product';
import { Crown } from 'lucide-react';

interface AllProductsSectionProps {
    products: Product[];
}

const AllProductsSection: React.FC<AllProductsSectionProps> = ({
    products,
}) => {
    const navigate = useNavigate();

    const handleShowMore = () => {
        navigate('/products');
    };

    return (
        <div className='bg-white py-16'>
            <div className='mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'>
                <div className='mb-12 flex items-center justify-center space-x-3'>
                    <Crown className='h-10 w-10 text-primary-600' />
                    <h2 className='font-dancing-script text-4xl font-bold text-gray-900'>
                        Nos produits
                    </h2>
                </div>
                <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3'>
                    {products.slice(0, 3).map((product) => (
                        <ProductCard
                            key={product.id}
                            product={product}
                        />
                    ))}
                </div>
                <div className='mt-8 text-center'>
                    <button
                        onClick={handleShowMore}
                        className='inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500'>
                        Voir Plus
                    </button>
                </div>
            </div>
        </div>
    );
};

export default AllProductsSection;
