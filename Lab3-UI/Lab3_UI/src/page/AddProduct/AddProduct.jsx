import AddProductForm from "../../components/AddProduct/AddProductForm.jsx";

function AddProduct() {
    return (
        <div className='container mt-4'>
            <div className='add-product-header d-flex justify-content-center'>
                <h1>Add Product</h1>
            </div>
            <div>
                <AddProductForm/>
            </div>
        </div>
    );
}

export default AddProduct;