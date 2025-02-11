import { addDoc, collection } from 'firebase/firestore';
import { db } from './firebase';

const sampleProducts = [
  {
    title: "Brise d'Agrumes",
    description: "Un mélange rafraîchissant de notes d'agrumes avec des touches de bergamote et de citron vert, parfait pour une utilisation quotidienne. Ce parfum vivifiant capture l'essence d'un jardin méditerranéen en pleine floraison.",
    category: "Frais",
    price: 76.22, // 50,000 FCFA
    imageUrl: "https://images.unsplash.com/photo-1616604847462-ed3b0666b7b4?auto=format&fit=crop&q=80&w=800",
    createdAt: new Date()
  },
  {
    title: "Jasmin de Minuit",
    description: "Un parfum élégant du soir combinant jasmin, vanille et des notes boisées subtiles. Ce mélange sophistiqué évoque le mystère et la romance d'un jardin au clair de lune.",
    category: "Floral",
    price: 106.71, // 70,000 FCFA
    imageUrl: "https://images.unsplash.com/photo-1618331835717-801e976710b2?auto=format&fit=crop&q=80&w=800",
    createdAt: new Date()
  },
  {
    title: "Brume Océane",
    description: "Un parfum marin frais avec des notes de sel marin, de concombre et de musc blanc. Laissez cette fragrance aquatique vous transporter vers les plages immaculées du Bénin.",
    category: "Frais",
    price: 83.85, // 55,000 FCFA
    imageUrl: "https://images.unsplash.com/photo-1595476108010-b4d1f102b1b1?auto=format&fit=crop&q=80&w=800",
    createdAt: new Date()
  },
  {
    title: "Rêves de Vanille",
    description: "Un mélange chaleureux et réconfortant de vanille de Madagascar, de fève tonka et d'ambre. Cette fragrance douce et sensuelle vous enveloppe dans une étreinte chaleureuse.",
    category: "Oriental",
    price: 91.47, // 60,000 FCFA
    imageUrl: "https://images.unsplash.com/photo-1557682250-33bd709cbe85?auto=format&fit=crop&q=80&w=800",
    createdAt: new Date()
  },
  {
    title: "Rose d'Afrique",
    description: "Un mélange sophistiqué de rose, de patchouli et d'épices africaines. Cette fragrance unique raconte une histoire de tradition et de luxe, inspirée par la riche culture du Bénin.",
    category: "Floral",
    price: 121.96, // 80,000 FCFA
    imageUrl: "https://images.unsplash.com/photo-1596073419667-9d77d59f033f?auto=format&fit=crop&q=80&w=800",
    createdAt: new Date()
  }
];

export const addSampleProducts = async () => {
  try {
    for (const product of sampleProducts) {
      await addDoc(collection(db, 'products'), product);
    }
    console.log('Produits exemples ajoutés avec succès');
  } catch (error) {
    console.error('Erreur lors de l\'ajout des produits exemples:', error);
  }
};