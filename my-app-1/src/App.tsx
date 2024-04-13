import {BrowserRouter, Routes, Route} from 'react-router-dom'
import ResponsiveAppBar from './components/ResponsiveAppBar'
import Home from './pages/Home'
import Hirek from './pages/Hirek'
import Etelek from './pages/Etelek'
import Pizzak from './pages/Pizzak'
import Italok from './pages/Italok'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import MealForm from './components/MealForm'
import DetailedMeal from './components/DetailedMeal'
import { Dispatch, SetStateAction, createContext, useState } from 'react'
import NewsForm from './components/NewsForm'
import DrinkForm from './components/DrinkForm'
import DetailedDrink from './components/DetailedDrink'
import { AuthProvider } from './components/AuthProvider'

type IAuthContext = {
  authenticated: boolean;
  setAuthenticated: Dispatch<SetStateAction<boolean>>
}
type IUserContext = {
  email: string,
  role: string
}

const initialAuthValue = {
    authenticated: false,
    setAuthenticated: () => {}
}
const initialUserValue = {
  email: "",
  role: ""
}

const AuthContext = createContext<IAuthContext>(initialAuthValue);
const UserContext = createContext<IUserContext>(initialUserValue);

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const user = initialUserValue;

  return (
      <BrowserRouter>
        <AuthContext.Provider value={{authenticated,setAuthenticated}}>
        <UserContext.Provider value={user}>
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
              <Route path="Ujetel" element={<AuthProvider><MealForm /></AuthProvider>} /> 
              <Route path="Ujhir" element={<NewsForm />} />
              <Route path="Ujetel" element={<MealForm />} /> 
              <Route path="Ujhir" element={<NewsForm />} /> 
              <Route path="Ujital" element={<DrinkForm />} />      
        </Routes>
        </UserContext.Provider>
        </AuthContext.Provider>
      </BrowserRouter>
  )
}
export {AuthContext, UserContext}
export default App


