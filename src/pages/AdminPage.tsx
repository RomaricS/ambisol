import React, { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { db, storage } from '../lib/firebase';
import { Plus, Edit, Trash, Loader2 } from 'lucide-react';
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
    imageFile: null as File | null,
    imagePreview: '',
  });
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const [productToEdit, setProductToEdit] = useState<any>(null);
  const [uploadProgress, setUploadProgress] = useState(0);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    const querySnapshot = await getDocs(collection(db, 'products'));
    const productsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setProducts(productsList);
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({
        ...formData,
        imageFile: file,
        imagePreview: URL.createObjectURL(file)
      });
    }
  };

  const uploadImage = async (file: File) => {
    const timestamp = Date.now();
    const fileName = `products/${timestamp}_${file.name}`;
    const storageRef = ref(storage, fileName);
    
    try {
      const snapshot = await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(snapshot.ref);
      return downloadURL;
    } catch (error) {
      console.error('Error uploading image:', error);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let imageUrl = base_image_url;
      
      if (formData.imageFile) {
        imageUrl = await uploadImage(formData.imageFile);
      }

      await addDoc(collection(db, 'products'), {
        title: formData.title,
        description: formData.description,
        category: formData.category,
        price: parseFloat(formData.price),
        imageUrl: imageUrl,
        createdAt: new Date(),
      });

      setFormData({
        title: '',
        description: '',
        category: categories[0].id.toString(),
        price: '',
        imageFile: null,
        imagePreview: '',
      });

      toast.success('Produit ajouté avec succès !');
      fetchProducts();
    } catch (error) {
      console.error('Error adding product:', error);
      toast.error('Erreur lors de l\'ajout du produit. Veuillez réessayer.');
    } finally {
      setLoading(false);
      setUploadProgress(0);
    }
  };

  const handleDelete = async () => {
    if (productToDelete) {
      try {
        const productToDeleteData = products.find(p => p.id === productToDelete);
        
        // Delete the image from storage if it's not the default image
        if (productToDeleteData?.imageUrl && !productToDeleteData.imageUrl.includes(base_image_url)) {
          const imageRef = ref(storage, productToDeleteData.imageUrl);
          await deleteObject(imageRef);
        }
        
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
        let imageUrl = productToEdit.imageUrl;
        
        if (productToEdit.imageFile) {
          imageUrl = await uploadImage(productToEdit.imageFile);
          
          // Delete old image if it's not the default
          if (productToEdit.imageUrl && !productToEdit.imageUrl.includes(base_image_url)) {
            const oldImageRef = ref(storage, productToEdit.imageUrl);
            await deleteObject(oldImageRef);
          }
        }

        await updateDoc(doc(db, 'products', productToEdit.id), {
          title: productToEdit.title,
          description: productToEdit.description,
          category: productToEdit.category,
          price: parseFloat(productToEdit.price),
          imageUrl: imageUrl,
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

  const handleEditImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && productToEdit) {
      setProductToEdit({
        ...productToEdit,
        imageFile: file,
        imagePreview: URL.createObjectURL(file)
      });
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
    setProductToEdit({
      ...product,
      imageFile: null,
      imagePreview: product.imageUrl
    });
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
                Prix (F CFA)
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
                Image du Produit
              </label>
              <div className="mt-1 flex items-center space-x-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="block w-full text-sm text-gray-500
                    file:mr-4 file:py-2 file:px-4
                    file:rounded-md file:border-0
                    file:text-sm file:font-semibold
                    file:bg-purple-50 file:text-purple-700
                    hover:file:bg-purple-100"
                />
                {formData.imagePreview && (
                  <img
                    src={formData.imagePreview}
                    alt="Preview"
                    className="h-20 w-20 object-cover rounded-lg"
                  />
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50 transition duration-150 ease-in-out"
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" />
                  Ajout en cours...
                </>
              ) : (
                'Ajouter le Produit'
              )}
            </button>
          </form>

          <div className="mt-12">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Liste des Produits</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {products.map((product) => (
                <div key={product.id} className="bg-gray-100 p-4 rounded-lg shadow">
                  <div className="flex space-x-4">
                    <img
                      src={product.imageUrl}
                      alt={product.title}
                      className="h-24 w-24 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h4 className="text-lg font-bold">{product.title}</h4>
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
                      <p className="text-sm text-gray-700">{product.description}</p>
                      <p className="text-sm text-gray-700">
                        Catégorie: {categories.find(c => c.id.toString() === product.category)?.label}
                      </p>
                      <p className="text-sm font-semibold text-gray-900">Prix: {product.price}F CFA</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {showDeleteModal && (
        <div className="fixed inset-0 flex items-center justify-center z-50">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={closeDeleteModal} />
          <div className="bg-white p-6 rounded-lg shadow-lg relative z-10">
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
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={closeEditModal} />
          <div className="bg-white p-6 rounded-lg shadow-lg relative z-10" style={{ width: '600px' }}>
            <h4 className="text-lg font-bold mb-4">Éditer le produit</h4>
            <form onSubmit={handleEditSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Titre
                </label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
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
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
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
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
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
                  Prix (F CFA)
                </label>
                <input
                  type="number"
                  step="0.01"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  value={productToEdit.price}
                  onChange={(e) => setProductToEdit({ ...productToEdit, price: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Image du Produit
                </label>
                <div className="mt-1 flex items-center space-x-4">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleEditImageChange}
                    className="block w-full text-sm text-gray-500
                      file:mr-4 file:py-2 file:px-4
                      file:rounded-md file:border-0
                      file:text-sm file:font-semibold
                      file:bg-purple-50 file:text-purple-700
                      hover:file:bg-purple-100"
                  />
                  {productToEdit.imagePreview && (
                    <img
                      src={productToEdit.imagePreview}
                      alt="Preview"
                      className="h-20 w-20 object-cover rounded-lg"
                    />
                  )}
                </div>
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