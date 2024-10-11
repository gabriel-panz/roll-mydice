import './global.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/:roll' element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;
