import Card from './components/Card';
import Header from './components/Header';
import Drawer from './components/Drawer';

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
                    <Card />
                </div>
            </div>
        </div>
    );
}

export default App;
