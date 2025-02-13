import React from 'react';
import { useLocation } from 'react-router-dom';

const legalContent = {
  'mentions-legales': {
    title: 'Mentions Légales',
    content: `
      <h2>1. Informations légales</h2>
      <p>Raison sociale : Ambisol SARL<br>
      Siège social : Cotonou, Bénin<br>
      Email : contact@ambisol.com<br>
      Téléphone : +229 97 97 97 97</p>

      <h2>2. Directeur de la publication</h2>
      <p>Le directeur de la publication du site est M. John Doe, en sa qualité de gérant de la société Ambisol SARL.</p>

      <h2>3. Hébergement</h2>
      <p>Le site est hébergé par la société Firebase, une division de Google LLC.</p>
    `
  },
  'cgu': {
    title: 'Conditions Générales d\'Utilisation',
    content: `
      <h2>1. Objet</h2>
      <p>Les présentes conditions générales d'utilisation ont pour objet de définir les modalités de mise à disposition des services du site Ambisol.</p>

      <h2>2. Accès au site</h2>
      <p>L'accès au site est gratuit. Les frais d'accès et d'utilisation du réseau de télécommunication sont à la charge de l'utilisateur.</p>

      <h2>3. Propriété intellectuelle</h2>
      <p>L'ensemble des éléments constituant le site (textes, graphiques, logiciels, photographies, images, vidéos, sons, plans, noms, logos, marques, créations et œuvres protégeables diverses, bases de données, etc.) ainsi que le site lui-même, relèvent des législations béninoises et internationales sur le droit d'auteur et la propriété intellectuelle.</p>
    `
  },
  'confidentialite': {
    title: 'Politique de Confidentialité',
    content: `
      <h2>1. Collecte des informations</h2>
      <p>Nous collectons les informations que vous nous fournissez directement, notamment lorsque vous créez un compte ou effectuez un achat.</p>

      <h2>2. Utilisation des informations</h2>
      <p>Les informations que nous collectons sont utilisées pour :<br>
      - Traiter vos commandes<br>
      - Vous envoyer des communications marketing (avec votre consentement)<br>
      - Améliorer nos services</p>

      <h2>3. Protection des données</h2>
      <p>Nous mettons en œuvre des mesures de sécurité appropriées pour protéger vos données personnelles contre tout accès, modification, divulgation ou destruction non autorisée.</p>
    `
  },
  'faq': {
    title: 'Foire Aux Questions',
    content: `
      <h2>1. Commandes et Livraison</h2>
      <p><strong>Q: Quels sont les délais de livraison ?</strong><br>
      R: Les délais de livraison varient entre 2 et 5 jours ouvrés pour Cotonou et ses environs.</p>

      <p><strong>Q: Quels sont les modes de paiement acceptés ?</strong><br>
      R: Nous acceptons les paiements par Mobile Money, carte bancaire et espèces à la livraison.</p>

      <h2>2. Produits</h2>
      <p><strong>Q: Les produits sont-ils naturels ?</strong><br>
      R: Oui, tous nos produits sont fabriqués à partir d'ingrédients naturels sélectionnés avec soin.</p>

      <p><strong>Q: Quelle est la durée de conservation des produits ?</strong><br>
      R: La durée de conservation varie entre 12 et 24 mois selon les produits. La date de péremption est indiquée sur chaque produit.</p>
    `
  }
};

export function LegalPage() {
  const location = useLocation();
  const path = location.pathname.substring(1); // Remove leading slash
  const pageData = legalContent[path as keyof typeof legalContent];

  if (!pageData) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">{pageData.title}</h1>
          <div 
            className="prose prose-green max-w-none"
            dangerouslySetInnerHTML={{ __html: pageData.content }}
          />
        </div>
      </div>
    </div>
  );
}