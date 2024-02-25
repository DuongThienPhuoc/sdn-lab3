import axios from './axios.js';

async function getCategories() {
    try {
        const response = await axios.get('/categories');
        return response.data.data;
    } catch (e) {
        throw new Error(e);
    }
}

export { getCategories };
