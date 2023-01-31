import Card from './components/Card';
import Header from './components/Header';
import Drawer from './components/Drawer';

const arr = [
    {
        title: 'Мужские Кроссовки Nike Blazer Mid Suede',
        price: 12999,
        imageUrl: '/img/sneakers/1.jpg',
    },
    {
        title: 'Мужские Кроссовки Nike Air Max 270',
        price: 12999,
        imageUrl: '/img/sneakers/2.jpg',
    },
    {
        title: 'Мужские Кроссовки Nike Blazer Mid Suede',
        price: 8499,
        imageUrl: '/img/sneakers/3.jpg',
    },
    {
        title: 'Кроссовки Puma X Aka Boku Future Rider',
        price: 8999,
        imageUrl: '/img/sneakers/4.jpg',
    },
];

function App() {
    return (
        <div className="wrapper">
            <Drawer />
            <Header />
            <div className="content">
                <div className="contentHeading">
                    <h1>Все кроссовки</h1>
                    <div className="contentSearchBlock">
                        <img alt="Search" src="/img/search.svg" />
                        <input type="text" placeholder="Поиск..." />
                    </div>
                </div>
                <div className="sneakers">
                    {arr.map((obj) => {
                        return (
                            <Card
                                title={obj.title}
                                price={obj.price}
                                imageUrl={obj.imageUrl}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

export default App;
