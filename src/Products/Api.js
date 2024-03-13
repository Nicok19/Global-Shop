import React, { useState, useEffect } from 'react';
import useFetchProducts from '../CustomHooks/GetFetchApi';
import PriceFilter from './PriceFilter';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(6);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const { products: fetchedProducts, loading, error } = useFetchProducts('https://api.escuelajs.co/api/v1/products');

    useEffect(() => {
        if (!loading && fetchedProducts) {
            setProducts(fetchedProducts);
            setFilteredProducts(fetchedProducts);
        }
    }, [loading, fetchedProducts]);

    const applyPriceFilter = (min, max) => {
        setMinPrice(min);
        setMaxPrice(max);
    };

    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    const handleSearchChange = event => {
        setSearchTerm(event.target.value);
    };

    const handleCategoryChange = event => {
        setSelectedCategory(event.target.value);
    };

    const handleResetFilters = () => {
        setSearchTerm('');
        setSelectedCategory('');
        setMinPrice('');
        setMaxPrice('');
        setFilteredProducts(products);
    };

    useEffect(() => {
        let filtered = products.filter(product => {
            const titleMatch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
            const categoryMatch = selectedCategory ? product.category.name === selectedCategory : true;
            const priceMatch = (minPrice === '' || product.price >= minPrice) && (maxPrice === '' || product.price <= maxPrice);
            return titleMatch && categoryMatch && priceMatch;
        });

        setFilteredProducts(filtered);
    }, [searchTerm, selectedCategory, minPrice, maxPrice, products]);

    const categories = Array.from(new Set(products.map(product => product.category.name)));

    if (loading) return <div className='loadingelement'>Loading...</div>;
    if (error) return <div>Error: {error.message}</div>;

    const handleImageError = (event) => {
        event.target.src = 'https://i.imgur.com/qZx2cU5.jpg'; 
    };

    const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
    const maxPagesToShow = 10;

    return (
        <div className='apiAndFliter'>
            <div className='filterMenu'>
                <div className='searchElement'>
                    <img src="https://i.imgur.com/1jR01kG.jpg" alt="magnifying glass" />
                    <input
                        type="text"
                        placeholder="Search by products..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                    />
                </div>
                <select className='categoryFilter' value={selectedCategory} onChange={handleCategoryChange}>
                    <option value="">All categories</option>
                    {categories.map(category => (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    ))}
                </select>
                <PriceFilter applyPriceFilter={applyPriceFilter} />
                <button className='reset' onClick={handleResetFilters}>Reset</button>
            </div>

            <div className='containerProducts'>
                {currentProducts.length > 0 ? (
                    currentProducts.map(product => (
                        <div className='allProducts' key={product.id}>
                            <p className='category'>{product.category.name}</p>
                            {product.images.length > 0 && product.images[0] ? (
                                <img src={product.images[0]} alt={product.title} onError={handleImageError} />
                            ) : (
                                <img src="https://i.imgur.com/Wr87vI8.jpg" alt="Default" />

                            )}
                            <div className='product'>
                                <h3>{product.title}</h3>
                            </div>
                            <div className='priceDiv'>
                                <p>{product.price} Usd</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <img className='notFound' src="/img/notFound.png" alt="Product not found" />
                )}
            </div>

            <div className='pagination'>
                {Array.from({ length: Math.min(totalPages, maxPagesToShow) }, (_, index) => (
                    <button className={currentPage === index + 1 ? 'paginationButton active' : 'paginationButton'} key={index + 1} onClick={() => paginate(index + 1)}>
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Products;





















