import {BrowserRouter, Routes, Route} from 'react-router-dom'
import ResponsiveAppBar from './components/ResponsiveAppBar'
import Home from './pages/Home'
import Hirek from './pages/Hirek'
import Etelek from './pages/Etelek'
import Pizzak from './pages/Pizzak'
import Italok from './pages/Italok'
import SignIn from './pages/SignIn'
import SignUp from './pages/SignUp'
import MealForm from './components/Forms/MealForm'
import DetailedView from './components/DetailedView'
import { Dispatch, SetStateAction, createContext, useEffect, useState } from 'react'
import NewsForm from './components/Forms/NewsForm'
import DrinkForm from './components/Forms/DrinkForm'
import { AuthProvider } from './components/AuthProvider'
import LogOut from './components/LogOut'
import DetailedNews from './components/DetailedNews'
import ToppingForm from './components/Forms/ToppingForm'
import PizzaForm from './components/Forms/PizzaForm'
import Toppings from './components/Toppings'
import Chat from './pages/Chat'
import Foglalas from './pages/Foglalas'
import Foglalasok from './pages/Foglalasok'
import axios, { AxiosResponse } from 'axios'


type IAuthContext = {
  authenticated: boolean;
  setAuthenticated: Dispatch<SetStateAction<boolean>>
}

type IUserContext = {
  user: IUser,
  setUser: Dispatch<SetStateAction<IUser>>
}

type IUser = {
  email: string,
  role: string,
  id: string
}

const initialAuthValue = {
    authenticated: false,
    setAuthenticated: () => {}
}

const initialUserValue = {
  user: {
      email: "",
      role: "",
      id: ""
    },
    setUser: () => {}
}

const AuthContext = createContext<IAuthContext>(initialAuthValue);
const UserContext = createContext<IUserContext>(initialUserValue);


function App() {
  const [authenticated, setAuthenticated] = useState(true);
  const [user, setUser] = useState(initialUserValue.user);

  const isAuth = async () => {
    const response = await axios.get(`api/Auth`)
    .catch((e) => {
      console.log(e);
      setAuthenticated(a => a = false);
    })
    .then((res) => {
      if(res){
        if(res.status == 200){
          setAuthenticated(a => a = true);
        } else {
          setAuthenticated(a => a = false);
        }
      }
    });
  }

  const auth = () => {
    if ( document.cookie == '' ){
      setAuthenticated(a => a = false);
      localStorage.clear();
    } else {
      const email = localStorage.getItem('email');
      const role = localStorage.getItem('role');
      const id = localStorage.getItem('id');
      /*if(localStorage.getItem('isAuth') != null){
        setAuthenticated(a => a = true);
      } else {
        setAuthenticated(a => a = false);
      }*/
      if(email && role && id){
        setUser({...user,
                email:email,
                role:role,
                id:id
              }); 
      }
    }
    console.log(user);
  }

  useEffect(() => {
      isAuth();
      auth();
    return () => {

    }
  },[])

  return (
      <BrowserRouter>
        <AuthContext.Provider value={{authenticated,setAuthenticated}}>
          <UserContext.Provider value={{user,setUser}}>
            <ResponsiveAppBar />
            <Routes>
                <Route path="Belepes" element={<SignIn />} />
                <Route path="Kilepes" element={<AuthProvider><LogOut/></AuthProvider>} />
                <Route index element={<Home />} />
                <Route path="Regisztracio" element={<SignUp />} />
                <Route path="Home" element={<Home />} />
                <Route path="Hirek" element={<Hirek />} />
                <Route path="Etelek" element={<Etelek />} />
                <Route path="Etelek/:id" element={<DetailedView path='Meal' /> } />
                <Route path="Italok/:id" element={<DetailedView path='Drink' />} />
                <Route path="Pizzak/:id" element={<DetailedView path='Pizza'/>} />
                <Route path="Hirek/:id" element={<DetailedNews />} />
                <Route path="Pizzak" element={<Pizzak />} />
                <Route path="Italok" element={<Italok />} /> 
                <Route path="Ujetel" element={<AuthProvider><MealForm /></AuthProvider>} /> 
                <Route path="Etelek/:id/Edit" element={<AuthProvider><MealForm/></AuthProvider>} /> 
                <Route path="Ujhir" element={<AuthProvider><NewsForm /></AuthProvider>} /> 
                <Route path="Hirek/:id/Edit" element={<AuthProvider><NewsForm /></AuthProvider>} /> 
                <Route path="Ujital" element={<AuthProvider><DrinkForm /></AuthProvider>} />  
                <Route path="Italok/:id/Edit" element={<AuthProvider><DrinkForm /></AuthProvider>} />  
                <Route path="Ujfeltet" element={<AuthProvider><ToppingForm /></AuthProvider>} /> 
                <Route path="Feltetek/:id/Edit" element={<AuthProvider><ToppingForm /></AuthProvider>} /> 
                <Route path="Ujpizza" element={<AuthProvider><PizzaForm /></AuthProvider>}  />
                <Route path="Pizzak/:id/Edit" element={<AuthProvider><PizzaForm /></AuthProvider>}  />
                <Route path="Feltetek" element={<AuthProvider><Toppings/></AuthProvider>} />
                <Route path="Chat" element={<AuthProvider><Chat/></AuthProvider>} />
                <Route path="Foglalas" element={<AuthProvider><Foglalas/></AuthProvider> } />
                <Route path="Foglalasok" element={<AuthProvider><Foglalasok/></AuthProvider> } />
            </Routes>
          </UserContext.Provider>
        </AuthContext.Provider>
      </BrowserRouter>
  )
}
export {AuthContext, UserContext}
export default App


