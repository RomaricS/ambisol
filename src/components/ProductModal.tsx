import React from 'react';
import { X } from 'lucide-react';
import { Product } from '../types/product';
import { formatPrice } from '../utils/formatPrice';

interface ProductModalProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose} />

        <div className="inline-block transform overflow-hidden rounded-lg bg-white text-left align-bottom shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-2xl sm:align-middle">
          <div className="absolute right-4 top-4">
            <button
              onClick={onClose}
              className="rounded-full bg-white p-2 hover:bg-gray-100"
            >
              <X className="h-6 w-6 text-gray-500" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="relative h-96 md:h-full">
              <img
                src={product.imageUrl}
                alt={product.title}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
            <div className="p-6 md:p-8">
              <span className="inline-block rounded-full bg-primary-100 px-3 py-1 text-sm text-primary-700">
                {product.category}
              </span>
              <h3 className="mt-4 text-2xl font-semibold text-gray-900">{product.title}</h3>
              <p className="mt-4 text-gray-600">{product.description}</p>
              <div className="mt-6">
                <p className="text-2xl font-bold text-primary-600">
                  {formatPrice(product.price)}
                </p>
              </div>
              <button className="mt-6 w-full rounded-md bg-primary-600 px-4 py-3 text-sm font-semibold text-white shadow-sm hover:bg-primary-700">
                Contacter pour Acheter
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}