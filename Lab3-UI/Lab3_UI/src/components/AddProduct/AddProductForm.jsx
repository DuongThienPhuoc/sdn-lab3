import './AddProductForm.css';
import { Autocomplete, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import uploadImage from '../../service/FireBase/Config.js';
import { postProduct } from '../../service/ProductService.js';
import { getCategories } from '../../service/CategoryService.js';

function AddProductForm() {
    const [categories, setCategories] = useState([]);
    useEffect(() => {
        getCategories()
            .then((res) => {
                setCategories(res);
            })
            .catch((e) => console.error(e.message));
    }, []);

    const CategoryOptions = categories.map((category) => ({
        label: category.name,
        id: category._id,
    }));
    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState(null);
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState(null);
    const [files, setFiles] = useState(null);

    async function handleSubmit(e) {
        e.preventDefault();
        const imagesResponse = await handleMultipleFileUpload(files);
        const images = imagesResponse.map((image) => ({
            url: image.imageUrl,
            name: image.imageName,
            caption: image.caption,
        }));
        const productRequest = {
            name: productName,
            price: price,
            description: description,
            images: images,
            category: category.id,
        };
        console.log(JSON.stringify(productRequest));
        postProduct('/products', JSON.stringify(productRequest))
            .then((response) => console.log(response))
            .catch((e) => console.error(e));
    }

    async function handleMultipleFileUpload(files) {
        const images = Array.from(files).map((file) => uploadImage(file));
        try {
            return await Promise.all(images);
        } catch (e) {
            throw new Error(e);
        }
    }

    return (
        <div className="add-product-form">
            <form onSubmit={handleSubmit}>
                <div className="mb-2">
                    <TextField
                        id="product-name"
                        label="Product Name"
                        variant="outlined"
                        value={productName}
                        onChange={(e) => setProductName(e.target.value)}
                        fullWidth
                    />
                </div>
                <div className="mb-2">
                    <TextField
                        id="product-price"
                        label="Product Price"
                        type="number"
                        variant="outlined"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        fullWidth
                    />
                </div>
                <div className="mb-2">
                    <TextField
                        id="description"
                        label="Description"
                        multiline
                        rows={4}
                        variant="outlined"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        fullWidth
                    />
                </div>
                <div className="from-group mb-2">
                    <Autocomplete
                        id="category"
                        disablePortal
                        value={category}
                        onChange={(event, newValue) => {
                            setCategory(newValue);
                        }}
                        renderInput={(params) => (
                            <TextField {...params} label="Category" />
                        )}
                        options={CategoryOptions}
                    />
                </div>
                <div className="mb-2">
                    <label htmlFor="product-image" className="form-label">
                        Choose pictures
                    </label>
                    <br />
                    <input
                        type="file"
                        multiple
                        id="product-image"
                        accept="image/*"
                        onChange={(e) => setFiles(e.target.files)}
                    />
                </div>
                <div className="d-flex justify-content-center">
                    <button type="submit" className="add-product-submit-form">
                        Add Product
                    </button>
                </div>
            </form>
        </div>
    );
}

export default AddProductForm;
