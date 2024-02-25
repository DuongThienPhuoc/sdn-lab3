import { Link } from 'react-router-dom';
import './ProductTable.css';

function ProductTable({ data }) {
    return (
        <div className="product-table">
            <table>
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Description</th>
                    </tr>
                </thead>
                <tbody>
                    {data ? (
                        data.map((product, index) => (
                            <tr key={index}>
                                <td>
                                    <Link
                                        style={{ textDecoration: 'none' }}
                                        to={`/detail-product/${product._id}`}
                                    >
                                        {product.name}
                                    </Link>
                                </td>
                                <td>{product.price}</td>
                                <td>{product.description}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="3">Loading</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
}

export default ProductTable;
