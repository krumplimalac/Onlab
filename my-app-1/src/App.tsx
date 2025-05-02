import {BrowserRouter, Routes, Route} from 'react-router-dom'
import ResponsiveAppBar from './components/navigation/ResponsiveAppBar'
import Home from './components/pages/Home'
import Hirek from './components/pages/Hirek'
import Etelek from './components/pages/Etelek'
import Pizzak from './components/pages/Pizzak'
import Italok from './components/pages/Italok'
import SignIn from './components/pages/SignIn'
import SignUp from './components/pages/SignUp'
import MealForm from './components/forms/MealForm'
import DetailedView from './components/menu/DetailedView'
import { Dispatch, SetStateAction, createContext, useEffect, useState } from 'react'
import NewsForm from './components/forms/NewsForm'
import DrinkForm from './components/forms/DrinkForm'
import AuthProvider from './components/auth/AuthProvider'
import LogOut from './components/auth/LogOut'
import DetailedNews from './components/news/DetailedNews'
import ToppingForm from './components/forms/ToppingForm'
import PizzaForm from './components/forms/PizzaForm'
import Toppings from './components/menu/Toppings'
import Chat from './components/pages/Chat'
import Foglalas from './components/pages/Foglalas'
import Foglalasok from './components/pages/Foglalasok'
import Foglalasaim from './components/pages/Foglalasaim'
import NotFound from './components/pages/NotFound'
import axios from 'axios'


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
      //isAuth();
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
                <Route path='*' element={
                    <AuthProvider>
                      <Routes>
                        <Route path="Kilepes" element={<LogOut/>} />
                        <Route path="Ujetel" element={<MealForm />} /> 
                        <Route path="Etelek/:id/Edit" element={<MealForm/>} /> 
                        <Route path="Ujhir" element={<NewsForm />} /> 
                        <Route path="Hirek/:id/Edit" element={<NewsForm />} /> 
                        <Route path="Ujital" element={<DrinkForm />} />  
                        <Route path="Italok/:id/Edit" element={<DrinkForm />} />  
                        <Route path="Ujfeltet" element={<ToppingForm />} /> 
                        <Route path="Feltetek/:id/Edit" element={<ToppingForm />} /> 
                        <Route path="Ujpizza" element={<PizzaForm />}  />
                        <Route path="Pizzak/:id/Edit" element={<PizzaForm />}  />
                        <Route path="Feltetek" element={<Toppings/>} />
                        <Route path="Chat" element={<Chat/>} />
                        <Route path="Foglalas" element={<Foglalas/> } />
                        <Route path="Foglalasok" element={<Foglalasok/> } />
                        <Route path="Foglalasaim" element={<Foglalasaim/>} />
                      </Routes>
                  </AuthProvider>
                  } />
                <Route path='*' element={<NotFound/>} />
            </Routes>
          </UserContext.Provider>
        </AuthContext.Provider>
      </BrowserRouter>
  )
}
export {AuthContext, UserContext}
export default App


