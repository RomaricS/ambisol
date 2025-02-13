import React from 'react';
import { Link } from 'react-router-dom';
import { User, ShoppingBag } from 'lucide-react';
import { useAuth } from '../hooks/useAuth';
import ambisolImage from '../assets/img/ambisol.png';

export function Navbar() {
  const { user, signOut } = useAuth();

  return (
    <nav className="sticky top-0 z-40 bg-white/80 shadow-sm backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-3">
            <img src={ambisolImage} alt="Ambisol" className="h-8 w-8" />
              <span className="font-dancing-script text-3xl font-bold text-gray-900">
                Ambisol
              </span>
            </Link>
            <Link 
              to="/products" 
              className="flex items-center space-x-2 text-gray-700 hover:text-primary-600 transition-colors"
            >
              <ShoppingBag className="h-5 w-5" />
              <span>Catalogue</span>
            </Link>
          </div>
          
          <div className="flex items-center space-x-6">
            {user ? (
              <>
                <Link 
                  to="/admin" 
                  className="flex items-center space-x-2 rounded-full bg-primary-50 px-4 py-2 text-sm font-medium text-primary-700 hover:bg-primary-100"
                >
                  <User className="h-5 w-5" />
                  <span>Admin</span>
                </Link>
                <button
                  onClick={signOut}
                  className="rounded-md border border-primary-200 px-4 py-2 text-sm font-medium text-primary-700 hover:bg-primary-50"
                >
                  Déconnexion
                </button>
              </>
            ) : (
              <Link 
                to="/login" 
                className="text-sm font-medium text-gray-700 hover:text-primary-600"
              >
                Connexion
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}