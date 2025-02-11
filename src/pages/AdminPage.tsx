import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Plus, Edit, Trash } from 'lucide-react';
import { base_image_url, categories } from '../types/product';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function AdminPage() {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category: categories[0].id.toString(),
    price: '',
    image: base_image_url,
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const [productToEdit, setProductToEdit] = useState<any>(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const querySnapshot = await getDocs(collection(db, 'products'));
    const productsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setProducts(productsList);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await addDoc(collection(db, 'products'), {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        price: parseFloat(formData.price),
        imageUrl: formData.image,
        createdAt: new Date(),
      });

      setFormData({
        title: '',
        description: '',
        category: categories[0].id.toString(),
        price: '',
        image: base_image_url,
      });

      toast.success('Produit ajouté avec succès !');
      fetchProducts();
    } catch (error) {
      console.error('Error adding product:', error);
      toast.error('Erreur lors de l\'ajout du produit. Veuillez réessayer.');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (productToDelete) {
      try {
        await deleteDoc(doc(db, 'products', productToDelete));
        toast.success('Produit supprimé avec succès !');
        fetchProducts();
      } catch (error) {
        console.error('Error deleting product:', error);
        toast.error('Erreur lors de la suppression du produit. Veuillez réessayer.');
      } finally {
        setShowDeleteModal(false);
        setProductToDelete(null);
      }
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (productToEdit) {
      try {
        await updateDoc(doc(db, 'products', productToEdit.id), {
          title: productToEdit.title,
          description: productToEdit.description,
          category: productToEdit.category,
          price: parseFloat(productToEdit.price),
        });
        toast.success('Produit mis à jour avec succès !');
        fetchProducts();
      } catch (error) {
        console.error('Error updating product:', error);
        toast.error('Erreur lors de la mise à jour du produit. Veuillez réessayer.');
      } finally {
        setShowEditModal(false);
        setProductToEdit(null);
      }
    }
  };

  const openDeleteModal = (productId: string) => {
    setProductToDelete(productId);
    setShowDeleteModal(true);
  };

  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setProductToDelete(null);
  };

  const openEditModal = (product: any) => {
    setProductToEdit(product);
    setShowEditModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
    setProductToEdit(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <ToastContainer />
      <div className="max-w-3xl lg:max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow px-6 py-8">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Ajouter un Nouveau Produit</h2>
            <Plus className="h-6 w-6 text-purple-600" />
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Titre
              </label>
              <input
                type="text"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 transition duration-150 ease-in-out"
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                required
                rows={3}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 transition duration-150 ease-in-out"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Catégorie
              </label>
              <select
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 transition duration-150 ease-in-out"
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
              >
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Prix (€)
              </label>
              <input
                type="number"
                step="0.01"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 transition duration-150 ease-in-out"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                URL de l'image du Produit
              </label>
              <input
                type="url"
                required
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 transition duration-150 ease-in-out"
                value={formData.image}
                onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 transition duration-150 ease-in-out"
            >
              {loading ? 'Ajout en cours...' : 'Ajouter le Produit'}
            </button>
          </form>

          <div className="mt-12">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Liste des Produits</h3>
            <ul className="space-y-4">
              {products.map((product) => (
                <li key={product.id} className="bg-gray-100 p-4 rounded-lg shadow">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="text-lg font-bold">{product.title}</h4>
                      <p className="text-sm text-gray-700">{product.description}</p>
                      <p className="text-sm text-gray-700">Catégorie: {product.category}</p>
                      <p className="text-sm text-gray-700">Prix: {product.price}€</p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        className="text-blue-600 hover:text-blue-800"
                        onClick={() => openEditModal(product)}
                      >
                        <Edit className="h-5 w-5" />
                      </button>
                      <button
                        className="text-red-600 hover:text-red-800"
                        onClick={() => openDeleteModal(product.id)}
                      >
                        <Trash className="h-5 w-5" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h4 className="text-lg font-bold mb-4">Confirmer la suppression</h4>
            <p className="mb-4">Êtes-vous sûr de vouloir supprimer ce produit ? Cette action est irréversible.</p>
            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                onClick={closeDeleteModal}
              >
                Annuler
              </button>
              <button
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
                onClick={handleDelete}
              >
                Supprimer
              </button>
            </div>
          </div>
        </div>
      )}

      {showEditModal && productToEdit && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg" style={{ minWidth: '560px' }}>
            <h4 className="text-lg font-bold mb-4">Éditer le produit</h4>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Titre
                </label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 transition duration-150 ease-in-out"
                  value={productToEdit.title}
                  onChange={(e) => setProductToEdit({ ...productToEdit, title: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  required
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 transition duration-150 ease-in-out"
                  value={productToEdit.description}
                  onChange={(e) => setProductToEdit({ ...productToEdit, description: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Catégorie
                </label>
                <select
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 transition duration-150 ease-in-out"
                  value={productToEdit.category}
                  onChange={(e) => setProductToEdit({ ...productToEdit, category: e.target.value })}
                >
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Prix (€)
                </label>
                <input
                  type="number"
                  step="0.01"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500 transition duration-150 ease-in-out"
                  value={productToEdit.price}
                  onChange={(e) => setProductToEdit({ ...productToEdit, price: e.target.value })}
                />
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                  onClick={closeEditModal}
                >
                  Annuler
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                  Enregistrer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminPage;