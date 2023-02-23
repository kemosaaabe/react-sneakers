import React from 'react';
import { useEffect, useState } from 'react';
import { Route } from 'react-router-dom';
import AppContext from './context';
import axios from 'axios';

import Header from './components/Header';
import Drawer from './components/Drawer';
import Slider from './components/Slider';

import Home from './pages/Home';
import Favorites from './pages/Favorites';
import Orders from './pages/Orders';

function App() {
    const [items, setItems] = useState([]);
    const [cartItems, setCartItems] = useState([]);
    const [orders, setOrders] = React.useState([]);
    const [isOrderCompleted, setIsOrderCompleted] = React.useState(false);
    const [favorites, setFavorites] = useState([]);
    const [searchValue, setSearchValue] = useState('');
    const [cartOpened, setCartOpened] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            try {
                const [cartResponse, itemsResponse] = await Promise.all([
                    await axios.get(
                        'https://63d9058a5a330a6ae172e9ed.mockapi.io/cart'
                    ),
                    axios.get(
                        'https://63d9058a5a330a6ae172e9ed.mockapi.io/items'
                    ),
                ]);

                setIsLoading(false);

                setCartItems(cartResponse.data);
                setItems(itemsResponse.data);
            } catch (error) {
                alert('Ошибка при запросе данных :(');
                console.error(error);
            }
        }

        fetchData();
    }, []);

    const onAddToCart = async (obj) => {
        try {
            const findItem = cartItems.find((item) => item.parentId === obj.id);
            if (findItem) {
                setCartItems((prev) =>
                    prev.filter((item) => item.parentId !== obj.id)
                );

                await axios.delete(
                    `https://63d9058a5a330a6ae172e9ed.mockapi.io/cart/${findItem.id}`
                );
            } else {
                setCartItems((prev) => [...prev, obj]);
                const { data } = await axios.post(
                    'https://63d9058a5a330a6ae172e9ed.mockapi.io/cart',
                    obj
                );
                setCartItems((prev) =>
                    prev.map((item) => {
                        if (item.parentId === data.parentId) {
                            return {
                                ...item,
                                id: data.id,
                            };
                        }

                        return item;
                    })
                );
            }
        } catch (error) {
            alert('Не удалось добавить товар в корзину');
            console.error(error);
        }
    };

    const onAddToFavorite = (obj) => {
        if (favorites.find((item) => item.id === obj.id)) {
            setFavorites((prev) => prev.filter((item) => item.id !== obj.id));
        } else {
            setFavorites((prev) => [...prev, obj]);
        }
    };

    const onOrderDone = () => {
        setOrders(cartItems);
    };

    const onRemoveItem = (id) => {
        try {
            setCartItems((prev) => prev.filter((item) => item.id !== id));

            axios.delete(
                `https://63d9058a5a330a6ae172e9ed.mockapi.io/cart/${id}`
            );
        } catch (error) {
            alert('Ошибка при удалении из корзины :(');
            console.error(error);
        }
    };

    const onChangeSearchInput = (event) => {
        setSearchValue(event.target.value);
    };

    const isItemAdded = (id) => {
        return cartItems.some((obj) => obj.parentId === id);
    };

    const isItemFavorite = (id) => {
        return favorites.some((obj) => obj.id === id);
    };

    if (!cartOpened) {
        document.querySelector('body').style.overflow = 'visible';
    } else {
        window.scrollTo(0, 0);
        document.querySelector('body').style.overflow = 'hidden';
    }

    return (
        <AppContext.Provider
            value={{
                items,
                cartItems,
                orders,
                setCartItems,
                favorites,
                isItemAdded,
                isItemFavorite,
                onAddToFavorite,
                onAddToCart,
                setCartOpened,
                isOrderCompleted,
                setIsOrderCompleted,
            }}
        >
            <div className="wrapper">
                <div>
                    <Drawer
                        items={cartItems}
                        onClose={() => {
                            setCartOpened(false);
                            setTimeout(() => setIsOrderCompleted(false), 100);
                        }}
                        onRemove={onRemoveItem}
                        onOrderDone={onOrderDone}
                        opened={cartOpened}
                    />
                </div>
                <Header
                    onClickCart={() => {
                        setCartOpened(true);
                    }}
                />

                <Route path="" exact>
                    <Slider />
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
                <Route path="favorites" exact>
                    <Favorites />
                </Route>
                <Route path="orders" exact>
                    <Orders />
                </Route>
            </div>
        </AppContext.Provider>
    );
}

export default App;
