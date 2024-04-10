import {BrowserRouter, Routes, Route, Navigate, Outlet} from 'react-router-dom'
import ResponsiveAppBar from './components/Nav'
import Home from './pages/Home'
import Hirek from './pages/Hirek'
import Etelek from './pages/Etelek'
import Pizzak from './pages/Pizzak'
import Italok from './pages/Italok'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import MealForm from './components/MealForm'
import DetailedMeal from './components/DetailedMeal'
import { useContext } from 'react'
import {AuthContext, AuthProvider} from './components/AuthProvider'
import NewsForm from './components/NewsForm'
import DrinkForm from './components/DrinkForm'
import DetailedDrink from './components/DetailedDrink'


const PrivateRoutes = () => {
  const {authenticated} = useContext(AuthContext)
  if(!authenticated){
    return (
      <Navigate to="Belepes" replace />
    )
  }

  return(
    <Outlet/>
  )
}

function App() {

  return (
      <BrowserRouter>
        <ResponsiveAppBar />
          <Routes>
            <Route path="Belepes" element={<SignIn />} />
            <Route index element={<Home />} />
            <Route path="Regisztracio" element={<SignUp />} />
            <Route path="Home" element={<Home />} />
            <Route path="Hirek" element={<Hirek />} />
            <Route path="Etelek" element={<Etelek />} />
            <Route path="Etelek/:id" element={<DetailedMeal /> } />
            <Route path="Italok/:id" element={<DetailedDrink />} />
            <Route path="Pizzak" element={<Pizzak />} />
            <Route path="Italok" element={<Italok />} /> 
            <Route path="Ujetel" element={<MealForm />} /> 
            <Route path="Ujhir" element={<NewsForm />} />
            <Route element={<PrivateRoutes />}></Route>
            <Route path="Ujetel" element={<MealForm />} /> 
            <Route path="Ujhir" element={<NewsForm />} /> 
            <Route path="Ujital" element={<DrinkForm />} />
          </Routes>
      </BrowserRouter>
  )
}

export default App
