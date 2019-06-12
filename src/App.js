import React from 'react';
import { Switch, BrowserRouter, Route} from 'react-router-dom';
import Navbar from './components/Navbar'
import Home from './components/Home';
import Lyrics from './components/Lyrics';
import './App.css';
import { ContextProvider } from './context/context'
import Search from "./components/Search";
const App = () => {
  return (
    <ContextProvider>
    <BrowserRouter>
      <div className="App">
      <Navbar/>
      <Search/>
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/lyrics/:id" component={Lyrics} />
      </Switch>
      </div>
    </BrowserRouter>
    </ContextProvider>
  );
}

export default App;
