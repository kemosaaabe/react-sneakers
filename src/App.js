import Header from './components/Header';
import Drawer from './components/Drawer';
import Home from './pages/Home';
import Favorites from './pages/Favorites';
import { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import axios from 'axios';

function App() {
    const [items, setItems] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [cartOpened, setCartOpened] = useState(false);

    useEffect(() => {
        axios
            .get('https://63d9058a5a330a6ae172e9ed.mockapi.io/items')
            .then((res) => setItems(res.data));

        axios
            .get('https://63d9058a5a330a6ae172e9ed.mockapi.io/cart')
            .then((res) => setCartItems(res.data));
    }, []);

    const onAddToCart = async (obj, isAdded) => {
        console.log(obj);
        try {
            const { data } = await axios.post(
                'https://63d9058a5a330a6ae172e9ed.mockapi.io/cart',
                obj
            );
            setCartItems((prev) => [...prev, data]);
        } catch (error) {
            alert('Не удалось добавить товар в корзину');
        }
    };

    const onAddToFavorite = (obj) => {
        if (favorites.find((item) => item.id === obj.id)) {
            setFavorites((prev) => prev.filter((item) => item.id !== obj.id));
        } else {
            setFavorites((prev) => [...prev, obj]);
        }
    };

    const onRemoveItem = (id) => {
        axios.delete(`https://63d9058a5a330a6ae172e9ed.mockapi.io/cart/${id}`);

        setCartItems((prev) => prev.filter((item) => item.id !== id));
    };

    const onChangeSearchInput = (event) => {
        setSearchValue(event.target.value);
    };

    return (
        <div className="wrapper">
            {cartOpened && (
                <Drawer
                    items={cartItems}
                    onClose={() => setCartOpened(false)}
                    onRemove={onRemoveItem}
                />
            )}
            <Header onClickCart={() => setCartOpened(true)} />

            <Route path="/" exact>
                <Home
                    items={items}
                    searchValue={searchValue}
                    onAddToCart={onAddToCart}
                    onChangeSearchInput={onChangeSearchInput}
                    onAddToFavorite={onAddToFavorite}
                />
            </Route>
            <Route path="/favorites" exact>
                <Favorites
                    items={favorites}
                    onAddToFavorite={onAddToFavorite}
                />
            </Route>
        </div>
    );
}

export default App;
