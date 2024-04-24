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
import DetailedView from './components/DetailedView'
import { Dispatch, SetStateAction, createContext, useEffect, useState } from 'react'
import NewsForm from './components/NewsForm'
import DrinkForm from './components/DrinkForm'
import { AuthProvider } from './components/AuthProvider'
import LogOut from './components/LogOut'

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

  useEffect(() => {
    const email = localStorage.getItem('email');
    const role = localStorage.getItem('role');
    if(localStorage.getItem('isAuth') != null){
      setAuthenticated(true);
    }
    if(email != null){
      user.email = email;
    }
    if(role != null){
      user.role = role;
    }
  })

  return (
      <BrowserRouter>
        <AuthContext.Provider value={{authenticated,setAuthenticated}}>
          <UserContext.Provider value={user}>
            <ResponsiveAppBar /> 
              <Routes>
                <Route path="Belepes" element={<SignIn />} />
                <Route path="Kilepes" element={<LogOut/>} />
                <Route index element={<Home />} />
                <Route path="Regisztracio" element={<SignUp />} />
                <Route path="Home" element={<Home />} />
                <Route path="Hirek" element={<Hirek />} />
                <Route path="Etelek" element={<Etelek />} />
                <Route path="Etelek/:id" element={<DetailedView path='Meal' /> } />
                <Route path="Italok/:id" element={<DetailedView path='Drink' />} />
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


