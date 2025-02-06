import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../Layout/Layout';
import Modal from '../Modal/Modal';
import Sidebar from '../Sidebar/Sidebar';
import './ProductStyle.css';
import { GiCancel } from 'react-icons/gi';
import AppContext from '../Context/context';
import { toast } from 'react-toastify';
import { PiShoppingCartSimpleBold } from 'react-icons/pi'; 

const ProductPage = ({ searchTerm, setSearchTerm }) => {
  const { products, setProducts } = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [filters, setFilters] = useState({ category: '', price: '' });
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6; 


  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(products.length / productsPerPage);
  const [newProduct, setNewProduct] = useState({
    title: '',
    price: '',
    description: '',
    image: '',
    category: '',
  });

  const navigate = useNavigate();
  const {addToCart} = useContext(AppContext)

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [setProducts]);

  const handleAddProduct = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://fakestoreapi.com/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct),
      });
      const data = await response.json();
      setProducts((prevProducts) => [...prevProducts, data]);
      setIsModalOpen(false);
      setNewProduct({
        title: '',
        price: '',
        description: '',
        image: '',
        category: '',
      });
      toast.success("Product added successfully!");
    } catch (error) {
      console.error("Error adding product:", error);
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await fetch(`https://fakestoreapi.com/products/${id}`, {
        method: 'DELETE',
      });
      setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
      toast.success("Product deleted successfully!");
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleProductClick = (id) => {
    navigate(`/products/${id}`);
  };

  const handleAddToCart = (product) => {
    addToCart(product);
    //add to cart
    toast.success(`${product.title} added to cart!`);
  };

  const filteredProducts = currentProducts
    .filter((product) => product.title.toLowerCase().includes(searchTerm.toLowerCase()))
    .filter((product) => !filters.category || product.category === filters.category)
    .sort((a, b) => {
      if (filters.price === 'asc') {
        return a.price - b.price;
      } else if (filters.price === 'desc') {
        return b.price - a.price;
      }
      return 0;
    });

  // Pagination
  

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Layout searchTerm={searchTerm} setSearchTerm={setSearchTerm} onAddItem={() => setIsModalOpen(true)}>
      <h1 className="product-title">Exclusive Products</h1>
      <button onClick={() => setIsSidebarOpen(true)} className="filter-button">Filter</button>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <div key={product.id} className="product-card" onClick={() => handleProductClick(product.id)}>
              <span
                className="delete-icon"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteProduct(product.id);
                }}
              >
                <GiCancel />
              </span>
              <img src={product.image} alt={product.title} />
              <h3>{product.title}</h3>
              <p className="description">
                {product.description.length > 100
                  ? product.description.slice(0, 100) + '...'
                  : product.description}
              </p>
              <div className="product-price-container">
                <p className="price">${product.price}</p>
                <button
                  className="add-to-cart-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddToCart(product);
                  }}
                >
                  <PiShoppingCartSimpleBold size={20} />
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="pagination">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index + 1}
            onClick={() => paginate(index + 1)}
            className={`pagination-btn ${currentPage === index + 1 ? 'active' : ''}`}
          >
            {index + 1}
          </button>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        newProduct={newProduct}
        handleInputChange={(e) => {
          const { name, value } = e.target;
          setNewProduct((prevProduct) => ({
            ...prevProduct,
            [name]: value,
          }));
        }}
        handleAddProduct={handleAddProduct}
      />
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        filters={filters}
        setFilters={setFilters}
      />
    </Layout>
  );
};

export default ProductPage;
