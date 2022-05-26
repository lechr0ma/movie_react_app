import './styles/App.css';
import './styles/add.css';
import './styles/crud.css';
import './components/UI/UI.css';
import AppRouter from "./router/AppRouter";
import Header from "./components/Header";

function App() {
  return (
    <div className="App">
        <Header/>
        <AppRouter/>
    </div>
  );
}

export default App;
