import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const CAROUSEL_ITEMS = [
  {
    image: "https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=1920",
    title: "Fragrances de Luxe",
    description: "Découvrez notre collection exclusive de parfums d'exception"
  },
  {
    image: "https://images.unsplash.com/photo-1595425970377-c9703cf48b6d?auto=format&fit=crop&q=80&w=1920",
    title: "Fabriqué au Bénin",
    description: "Chaque fragrance raconte une histoire unique de notre héritage"
  },
  {
    image: "https://images.unsplash.com/photo-1619994403073-2cec844b8e63?auto=format&fit=crop&q=80&w=1920",
    title: "Ingrédients Naturels",
    description: "Des essences pures capturées dans chaque flacon"
  }
];

export function Carousel() {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % CAROUSEL_ITEMS.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    // set Continuing the Carousel.tsx file content exactly where it left off:
    setCurrentSlide((prev) => (prev + 1) % CAROUSEL_ITEMS.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + CAROUSEL_ITEMS.length) % CAROUSEL_ITEMS.length);
  };

  return (
    <div className="relative h-[500px] overflow-hidden">
      {CAROUSEL_ITEMS.map((item, index) => (
        <div
          key={index}
          className={`absolute w-full h-full transition-transform duration-500 ease-in-out ${
            index === currentSlide ? 'translate-x-0' : 'translate-x-full'
          }`}
          style={{
            transform: `translateX(${(index - currentSlide) * 100}%)`
          }}
        >
          <div className="relative w-full h-full">
            <img
              src={item.image}
              alt={item.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
              <div className="text-center text-white">
                <h2 className="text-4xl font-bold mb-4">{item.title}</h2>
                <p className="text-xl">{item.description}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
      
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 transition-all"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-50 hover:bg-opacity-75 rounded-full p-2 transition-all"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
      
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {CAROUSEL_ITEMS.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentSlide ? 'bg-white scale-125' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}