import React, { useState } from 'react';
import { Eye } from 'lucide-react';
import { ProductModal } from './ProductModal';
import { ProductCardProps } from '../types/product';
import { formatPrice, getCategory } from '../utils/formatPrice';

export function ProductCard({ product }: ProductCardProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="group relative overflow-hidden rounded-xl bg-white shadow-lg transition-all hover:shadow-xl">
        <div className="relative h-80">
          <img 
            src={product.imageUrl} 
            alt={product.title}
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-black bg-opacity-10 opacity-0 transition-opacity group-hover:opacity-100">
            <button
              onClick={() => setIsModalOpen(true)}
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white p-3 shadow-lg transition-transform hover:scale-110"
            >
              <Eye className="h-6 w-6 text-primary-600" />
            </button>
          </div>
        </div>
        <div className="p-6 flex flex-col justify-between h-48">
          <div>
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900 truncate">{product.title}</h3>
              <span className="rounded-full bg-primary-100 px-3 py-1 text-sm text-primary-700 truncate">
                {getCategory(product.category)}
              </span>
            </div>
            <p className="mb-4 text-gray-600 line-clamp-2">{product.description}</p>
          </div>
          <div className="flex items-center justify-between mt-auto">
            <span className="text-xl font-bold text-primary-600">
              {formatPrice(product.price)}
            </span>
            <button
              onClick={() => setIsModalOpen(true)}
              className="rounded-md bg-primary-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-700"
            >
              Voir Détails
            </button>
          </div>
        </div>
      </div>
      <ProductModal
        product={product}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}

export default ProductCard;