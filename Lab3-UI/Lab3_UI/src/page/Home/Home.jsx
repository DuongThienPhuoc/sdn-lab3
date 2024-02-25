import ProductTable from '../../components/Home/ProductTable.jsx';
import { getProducts } from '../../service/ProductService.js';
import { useEffect, useState } from 'react';
import './Home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from "react-router-dom";

function Home() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        getProducts('/products')
            .then((res) => {
                setProducts(res.data);
            })
            .catch((e) => console.error(e.message));
    }, []);

    return (
        <div className="container mt-4">
            <div className="product-header d-flex justify-content-center">
                <h1>
                    <strong>Product</strong>
                </h1>
            </div>
            <div>
                <div className="action">
                    <NavLink className='button' to='/add-product'>
                        <FontAwesomeIcon icon={faPlus} />
                        <span className="ms-1">Product</span>
                    </NavLink>
                </div>
                <ProductTable data={products} />
            </div>
        </div>
    );
}

export default Home;
