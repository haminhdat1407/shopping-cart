import { Route, Switch, Navigate, Routes, Redirect } from 'react-router-dom';
import './App.css';
import Header from './components/Header';
import CartFeature from './features/Cart';
import ProductFeature from './features/Product';

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/" render={() => <Redirect to="/products" />} />
        <Route path="/products" component={ProductFeature} />
        <Route path="/cart" component={CartFeature} />
      </Switch>
    </div>
  );
}

export default App;
