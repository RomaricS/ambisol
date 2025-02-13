import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin } from 'lucide-react';
import ambisolImage from '../assets/img/ambisol.png';

export function Footer() {
    const handleContactClick = () => {
        window.open('https://wa.me/+22966000534', '_blank');
    };

    return (
        <footer className='bg-gray-900 text-gray-300'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12'>
                <div className='grid grid-cols-1 md:grid-cols-4 gap-8'>
                    {/* Brand Section */}
                    <div className='space-y-4'>
                        <Link
                            to='/'
                            className='flex items-center space-x-3'>
                            <img
                                src={ambisolImage}
                                alt='Ambisol'
                                className='h-8 w-8'
                            />
                            <span className='font-dancing-script text-2xl font-bold text-white'>
                                Ambisol
                            </span>
                        </Link>
                        <p className='text-sm'>
                            AMBISOL PRODUIT ET COMMERCIALISE LES HUILES
                            ESSENTIELLES, FRAGRANCES , INFUSIONS ET LES
                            COMPLÉMENTS ALIMENTAIRES. PRODIGUE DES CONSEILS EN
                            NATUROTHERAPIE/ AROMATHÉRAPIE
                        </p>
                    </div>

                    {/* Contact Section */}
                    <div>
                        <h3 className='text-lg font-semibold text-white mb-4'>
                            Contact
                        </h3>
                        <ul className='space-y-3'>
                            <li className='flex items-center space-x-3'>
                                <Mail className='h-5 w-5' />
                                <span>ambisolbenin@gmail.com</span>
                            </li>
                            <li className='flex items-center space-x-3'>
                                <Phone className='h-5 w-5' />
                                <span>+229 66 00 05 34</span>
                            </li>
                            <li className='flex items-center space-x-3'>
                                <MapPin className='h-5 w-5' />
                                <span>Avenue Steinmetz, Cotonou, Benin</span>
                            </li>
                        </ul>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className='text-lg font-semibold text-white mb-4'>
                            Liens Rapides
                        </h3>
                        <ul className='space-y-2'>
                            <li>
                                <Link
                                    to='/about'
                                    className='hover:text-primary-400 transition-colors'>
                                    À Propos
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to='/faq'
                                    className='hover:text-primary-400 transition-colors'>
                                    FAQ
                                </Link>
                            </li>
                            <li>
                                <button
                                    onClick={handleContactClick}
                                    className='hover:text-primary-400 transition-colors'>
                                    Nous Contacter
                                </button>
                            </li>
                        </ul>
                    </div>

                    {/* Legal Links */}
                    <div>
                        <h3 className='text-lg font-semibold text-white mb-4'>
                            Informations Légales
                        </h3>
                        <ul className='space-y-2'>
                            <li>
                                <Link
                                    to='/mentions-legales'
                                    className='hover:text-primary-400 transition-colors'>
                                    Mentions Légales
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to='/cgu'
                                    className='hover:text-primary-400 transition-colors'>
                                    CGU
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to='/confidentialite'
                                    className='hover:text-primary-400 transition-colors'>
                                    Politique de Confidentialité
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className='border-t border-gray-800 mt-12 pt-8 text-center text-sm'>
                    <p>
                        &copy; {new Date().getFullYear()} Ambisol. Tous droits
                        réservés.
                    </p>
                </div>
            </div>
        </footer>
    );
}
