import { Route } from 'react-router-dom';
import './App.css';
import ProductFeature from './features/Product';

function App() {
  return (
    <div className="App">
      <Route path="/products" component={ProductFeature} />
    </div>
  );
}

export default App;
