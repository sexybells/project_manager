import logo from './logo.svg';
import './App.css';
import WebRoute from './router/router';
import { Provider } from 'react-redux';
import store from './redux/store';

function App() {
  return (
    <Provider store={store}>
    <div className="App">
        <WebRoute />
    </div>
    </Provider>
  );
}

export default App;
