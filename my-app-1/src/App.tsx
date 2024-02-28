import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import ResponsiveAppBar from './components/Nav'
import Home from './pages/Home'
import Hirek from './pages/Hirek'
import Etelek from './pages/Etelek'
import Pizzak from './pages/Pizzak'
import Italok from './pages/Italok'



function App() {

  return (
    <BrowserRouter>
      <ResponsiveAppBar />
        <Routes>
          <Route index element={<Home />} />
          <Route path="Home" element={<Home />} />
          <Route path="Hirek" element={<Hirek />} />
          <Route path="Etelek" element={<Etelek />} />
          <Route path="Pizzak" element={<Pizzak />} />
          <Route path="Italok" element={<Italok />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App
