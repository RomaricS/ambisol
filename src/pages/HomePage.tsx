import React, { useEffect, useState } from 'react';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Product } from '../types/product';
import { ProductCard } from '../components/ProductCard';
import { Carousel } from '../components/Carousel';
import { Crown, Star, Award, Leaf, Globe } from 'lucide-react';
import AllProductsSection from '../components/AllProductsSection';

// Stats section component
const StatsSection = () => (
  <div className="bg-primary-600 py-16">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
        <div className="text-center">
          <div className="text-4xl font-bold text-white">100+</div>
          <div className="mt-2 text-primary-100">Clients Satisfaits</div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold text-white">10+</div>
          <div className="mt-2 text-primary-100">Huiles Uniques</div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold text-white">10+</div>
          <div className="mt-2 text-primary-100">Années d'Expérience</div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold text-white">100%</div>
          <div className="mt-2 text-primary-100">Ingrédients Naturels</div>
        </div>
      </div>
    </div>
  </div>
);

// Features section component
const FeaturesSection = () => (
  <section className="py-20 bg-primary-50">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <h2 className="font-dancing-script text-4xl font-bold text-gray-900 mb-4">
          Pourquoi Choisir Ambisol ?
        </h2>
        <p className="text-gray-600 max-w-2xl mx-auto">
          Découvrez les plus belles fragrances créées avec passion et expertise
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
            <Leaf className="h-8 w-8 text-primary-600" />
          </div>
          <h3 className="text-xl font-semibold mb-4">Ingrédients Naturels</h3>
          <p className="text-gray-600">Sélectionnés parmi les meilleurs matériaux naturels pour des parfums authentiques.</p>
        </div>
        <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
            <Award className="h-8 w-8 text-primary-600" />
          </div>
          <h3 className="text-xl font-semibold mb-4">Récompensés</h3>
          <p className="text-gray-600">Reconnus internationalement pour nos compositions exceptionnelles.</p>
        </div>
        <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mb-6">
            <Globe className="h-8 w-8 text-primary-600" />
          </div>
          <h3 className="text-xl font-semibold mb-4">Héritage Mondial</h3>
          <p className="text-gray-600">L'alliance du savoir-faire béninois traditionnel et du luxe moderne.</p>
        </div>
      </div>
    </div>
  </section>
);

// Testimonials section component
const TestimonialsSection = () => (
  <section className="py-20">
    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-16">
        <div className="flex items-center justify-center space-x-3 mb-4">
          <Star className="h-8 w-8 text-primary-600" />
          <h2 className="font-dancing-script text-4xl font-bold text-gray-900">
            Avis Clients
          </h2>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          {
            name: "Romaric H.",
            role: "Ingénieur",
            comment: "Avec Jack je n'ai plus de souci de moustiques, je recommende vivement.",
            avatar: "https://images.unsplash.com/photo-1648183185045-7a5592e66e9c?q=80&w=2488&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          },
          {
            name: "Gildas D.",
            role: "Ingénieur",
            comment: "L'attention aux détails et l'engagement d'Ambisol envers la qualité sont inégalés.",
            avatar: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          },
          {
            name: "Vasthie C.",
            role: "Consultante en Luxe",
            comment: "Ces fragrances sont un mélange parfait de tradition et de sophistication moderne.",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          }
        ].map((testimonial, index) => (
          <div key={index} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center mb-6">
              <img
                src={testimonial.avatar}
                alt={testimonial.name}
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                <p className="text-sm text-gray-600">{testimonial.role}</p>
              </div>
            </div>
            <p className="text-gray-600 italic">"{testimonial.comment}"</p>
            <div className="mt-4 flex text-primary-500">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-current" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export function HomePage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [topProducts, setTopProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsSnapshot = await getDocs(collection(db, 'products'));
        const productsData = productsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Product[];
        setProducts(productsData);

        const topProductsQuery = query(
          collection(db, 'products'),
          orderBy('createdAt', 'desc'),
          limit(3)
        );
        const topProductsSnapshot = await getDocs(topProductsQuery);
        const topProductsData = topProductsSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Product[];
        setTopProducts(topProductsData);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary-600 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Carousel />
      
      <StatsSection />
      
      {/* Top Products Section */}
      <section className="relative overflow-hidden py-20">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1619994403073-2cec844b8e63?auto=format&fit=crop&q=80&w=1920')] bg-cover bg-fixed bg-center opacity-5"></div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex items-center justify-center space-x-3">
            <Crown className="h-10 w-10 text-primary-600" />
            <h2 className="font-dancing-script text-4xl font-bold text-gray-900">
              Collection en Vedette
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {topProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <FeaturesSection />

      {/* All Products Section */}
      <AllProductsSection products={products} />

      <TestimonialsSection />
    </div>
  );
}