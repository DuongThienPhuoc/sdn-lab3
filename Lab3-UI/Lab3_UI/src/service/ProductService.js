import axios from './axios.js';

/**
 * Retrieves products from the specified path using the provided options.
 * @author phuocdt
 * @param {string} path - The path to retrieve the products from.
 * @param {object} [options] - The options for the request.
 * @returns {Promise} - A promise that resolves with the retrieved products.
 * @throws {Error} - If an error occurs during the retrieval process.
 */
async function getProducts(path, options = {}) {
    try {
        return await axios.get(path, options, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (e) {
        throw new Error(e);
    }
}

async function postProduct(path, data) {
    try {
        return await axios.post(path, data, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (e) {
        throw new Error(e);
    }
}

async function getProduct(path, id) {
    try {
        const response = await axios.get(`${path}/${id}`, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (e) {
        throw new Error(e);
    }
}

async function postComment(path,id, data) {
    try {
        return await axios.patch(`${path}/${id}`, data, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (e) {
        throw new Error(e);
    }
}

export { getProducts, postProduct, getProduct,postComment };
