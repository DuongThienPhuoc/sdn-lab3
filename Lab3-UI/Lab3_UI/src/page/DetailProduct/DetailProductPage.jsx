import DetailProduct from '../../components/DetailProduct/DetailProduct.jsx';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getProduct } from '../../service/ProductService.js';

function DetailProductPage() {
    const { id } = useParams();
    const [product, setProduct] = useState(null);

    useEffect(() => {
        getProduct('products', id)
            .then((res) => setProduct(res))
            .catch((e) => console.error(e.message));
    }, []);

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-center">
                <h1>
                    <strong>Detail Product</strong>
                </h1>
            </div>
            <div>{product ? <DetailProduct product={product} /> : <></>}</div>
        </div>
    );
}

export default DetailProductPage;
