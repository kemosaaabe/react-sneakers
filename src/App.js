import React from 'react';
import { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import AppContext from './context';
import axios from 'axios';
import Header from './components/Header';
import Drawer from './components/Drawer';
import Home from './pages/Home';
import Favorites from './pages/Favorites';

function App() {
    const [items, setItems] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [cartOpened, setCartOpened] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            const cartResponse = await axios.get(
                'https://63d9058a5a330a6ae172e9ed.mockapi.io/cart'
            );

            const itemsResponse = await axios.get(
                'https://63d9058a5a330a6ae172e9ed.mockapi.io/items'
            );

            setIsLoading(false);

            setCartItems(cartResponse.data);
            setItems(itemsResponse.data);
        }

        fetchData();
    }, []);

    const onAddToCart = async (obj) => {
        try {
            if (cartItems.find((item) => item.id === obj.id)) {
                await axios.delete(
                    `https://63d9058a5a330a6ae172e9ed.mockapi.io/cart/${obj.id}`
                );
                setCartItems((prev) =>
                    prev.filter((item) => item.id !== obj.id)
                );
            } else {
                const { data } = await axios.post(
                    'https://63d9058a5a330a6ae172e9ed.mockapi.io/cart',
                    obj
                );
                setCartItems((prev) => [...prev, data]);
            }
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

    const isItemAdded = (id) => {
        return cartItems.some((obj) => obj.id === id);
    };

    return (
        <AppContext.Provider
            value={{ items, cartItems, favorites, isItemAdded }}
        >
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
                        cartItems={cartItems}
                        items={items}
                        searchValue={searchValue}
                        onAddToCart={onAddToCart}
                        onChangeSearchInput={onChangeSearchInput}
                        onAddToFavorite={onAddToFavorite}
                        isLoading={isLoading}
                    />
                </Route>
                <Route path="/favorites" exact>
                    <Favorites onAddToFavorite={onAddToFavorite} />
                </Route>
            </div>
        </AppContext.Provider>
    );
}

export default App;
