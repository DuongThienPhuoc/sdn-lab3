import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './page/Home/Home.jsx';
import AddProduct from './page/AddProduct/AddProduct.jsx';
import DetailProductPage from './page/DetailProduct/DetailProductPage.jsx';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/add-product" element={<AddProduct />} />
                <Route
                    path="/detail-product/:id"
                    element={<DetailProductPage />}
                />
                <Route path="*" element={<h1>Not Found</h1>} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
