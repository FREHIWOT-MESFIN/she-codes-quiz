import {BrowserRouter, Route, Routes} from 'react-router-dom'
import Home from './pages/home';
import Quiz from './pages/quiz';
import Result from './pages/result';
import './App.css';

function App() {
  return (
    <div className="App">
        <BrowserRouter basename={process.env.PUBLIC_URL}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/quiz' element={<Quiz />} />
            <Route path='/result' element={<Result />} />
          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
