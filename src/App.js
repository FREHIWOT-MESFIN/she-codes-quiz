import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './pages/home';
import Quiz from './pages/quiz';
import Result from './pages/result';
import './App.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' Component={Home}/>
          <Route path='/quiz' Component={Quiz}/>
          <Route path='/result' Component={Result}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
