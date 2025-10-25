//------------------------Firebase--------------------//
//*
// 1. authcontext - step-6 e context setup shes akho firebase login er kaj. Akhon first e user er value null kore dite hobe AuthProvider.jsx e.
// 2.Register.jsx a-> Div k. form  econvert korbo Register.jsx e then input field e name,email er value set korbo.button e type submit then form e onclick={handleRegiste}
// 3.handleRegister() step-1 complete kora .
   
// 4.[AuthProvider-version-2 te kaj ]-- Login/register]- er jonno authProvider.jsx e const auth=getAuth(app); e include korte hobe then import.then signup er jonno akta createUser name akta function create korbo then etar moddhe email,pass diye debo. HandleRegister er kace email,pass ase but auth nei tai authProvider k dite hobe dite hobe. Ejonno return kore debo firerbase er createUserWityhEmailAndPassword(auth,email,passsword). then createUser k authData te share kore debo.
// 5. Then Register.jsx-v-2 e const {createUser}=use(AuthContext); diye bebohar korte parbo. just Register.jsx er moddhe createUser(email,password) k call kore dite hobe. tarpaor then(),catch()
// 6.The login data firebase e cole jabe.jehetu user,setUser data share kora ase tai register e amra use korte pari. createUser() er moddhe setUser(user) k dite hobe tahole save thakbe
//7.data memories kore rakhar jonn useEffectt diye akbarer jonno run korbo authProvider e. onAuthStateChange(auth,(currentUser)) function niye asbo firebase theke . jodi user theke tosetUSer. observer function er kaj hoise jate reload dileo user er data rthek

//=====================================================logout==========================================

// 8.logout er jonno navbar.jsx e conditional rendaring korte hobe login logout button er opor. Akhon authProvider.jsx e giye logOut()=> name akta function create korbo. se just auth nibe ,return kore debo signOut(auth )
//   firebase theke import hobe.logout function ta k authDatar moddhe share kore dibo jate navbar e use korbo.. jehetu navbar.jsx e lage tai const {user,logOut}=use(AuthContex) akare nibo. then handleLogOut() function e cALL Kore debo.
//9. user logOut er por login korte gele-> same Login.jsx e giye form thik kora,onsubmit handler,input name etc thik kora. Then handleLogin() function call kora. as usual as register.
// //10. Now-> AuthProvider.jsx e giye same vabe signIn(email,passwor)d create korbo j email and pass nibe. then retun korbo "signInWithEmailAndPassword(auth,email,password)" form firtebase. Then "authData" te signIn functionnta add kore dite hobe
//11. tarpor login.jsx e jabo then const {signIn}=use(AuthContext) e use korbo then handleLogin() signIn(email,password) k  e call kore debo r parameter debo email,password.



//========================================
//
//
//





//===========================AuthContext-steps=========================//
//*
// 1. Src er moddhe akta Authprovider.jsx name akta folder create korbo then rsc.AuthContext name akta context create korbo then export jate sob jaiga use korte pari.then authcontext kAuthprovider.jsx theke return kore dite HiOutlineBeaker.
// 2.AuthContext er maddhole value share kora LuJapaneseYen.
// 3. example er jonno akta state create koreci then and user and setUser k share korte chaile akta object create korte Hobe {Authdata}
// 4.authContext er maddhome data gulo use korte chaaile value={authData} pass korte hobe.tahole <authContext> er peter moddhe data gulo use korte PiArrowBendDoubleUpLeft.
// 5.Main.jsx e jiye <RouterProvider> </RouterProvider> k <AuthProvider> </AuthProvider> diye rapp kore debugErrorMap. tahole. authProvider er childrean holo routerProvider and routerProvider er childrean authProvider.
//  Akhon Router Provider k jodi authProvider er moddhe pete chai taile akta special props {Childrean } use korbo. and childrean props ta k Auth contex er moddhe share kore debo AuthProvider.jsx er moddhe. "Akhon j kono component ei auth data use korte parbe"
// 6.1st Navbar.jsx e joid use kori-> navbvar.jsx e jabo then const {user}=use(AuthContext)--[navbar.jsx] version 1 e ase baki ta.
// 7.Firebase part e baki ta

//
//======================AuthCondext-code. version-[1]- context setup done=============================//
//==================================AuthProvider.jsx============================



import React, { createContext } from 'react';
import { RouterProvider, useNavigate } from 'react-router'
export const AuthContext = createContext();

const AuthProvider = ({childrean}) => {
    const [user,setUser]=useState({
        name:'hablu',
        email:"hablu@gmail.com"
    })

   const authData={
    user,setUser
   }

    return <AuthContext value={authData}>
        {childrean}
    </AuthContext>
};

export default AuthProvider;

//------=-=-=-=-=-=-=-=-=-=-=-=-=-AuthProvider.jsx-Version-2.-login feature =-=-=--=-=-=-=-=-=-=-=-=-=-=-=-=-==-=-=-=-=-=-=-=-=

import React, { createContext } from 'react';
import { RouterProvider } from 'react-router'
export const AuthContext = createContext();

const auth = getAuth(app);
const AuthProvider = ({childrean}) => {
    const [user,setUser]=useState(null)

    const createUser=(email,password)=>{
        return createUserWithEmailAndPassword(auth,email,password)
    }

      useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
          setUser(currentUser);
        });
        return () => {
          unsubscribe();
        };
      }, []);

   const authData={
    user,setUser,createUser,logOut,
   }

    return <AuthContext value={authData}>
        {childrean}
    </AuthContext>
};

export default AuthProvider;

//=====================main.jsx version-1===================
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'


import { RouterProvider } from 'react-router'
import router from './routes/Router';
import AuthProvider from './provider/AuthProvider';

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  </StrictMode>
);
//========================//

//============================Navbar.jsx-[Version-1]===========================//

import React, { use } from 'react';
import { Link, NavLink } from 'react-router';
import userIcon from '../assets/user.png'
import { AuthContext } from '../provider/AuthProvider';






const Navbar = () => {
  const handleLogOut = () => {
    logOut().then(()=>{
    alert("Your Logged out Successfully")
    })
    .catch((error)=>{
      console.log(error);
    })
  };
  const { user, logOut } = use(AuthContext);
    return (
      <div className="flex justify-between items-center">
        <div className="">{user && user.email}</div>
        <div className="nav flex gap-5 text-accent">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/career">Career</NavLink>
        </div>
        <div className="login-btn flex gap-5">
          <img src={userIcon} alt="" />
          {user ? (
            <button onClick={handleLogOut} className="btn btn-primary px-9">Logout</button>
          ) : (
            <Link to="/auth/login" className="btn btn-primary px-9">
              Login
            </Link>
          )}
        </div>
      </div>
    );
};

export default Navbar;


//-----------------------------REgister.jsx---v-1=======when firbase e register korbo----------
import React, { use } from 'react';
import { Link } from 'react-router';
import { AuthContext } from '../provider/AuthProvider';
import { createUserWithEmailAndPassword } from 'firebase/auth'

const Register = () => {

  const {createUser,setUser}=use(AuthContext) // step-2  according to firebase step-5


  //--------step-1--------------
const handleRegister=(e)=>{
e.preventDefault();
const form=e.target;
const name=form.name.value;
const photo=form.photo.value;
const email=form.email.value;
const password=form.password.value;
console.log({name,email,password,photo})
//------------------------------------

//step-3------//
createUser(email,password) 
.then(result=>{
  const user=result.user;
  // console.log(user)
  setUser(user)
})
.catch(error=>{
  const errorCode=error.code;
  const errorMessage=error.message;
  alert(errorMessage)
;})
}

    return (
      <div className="flex justify-center min-h-screen items-center">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl py-5">
          <h2 className="font-semibold text-2xl text-center">
            Register your account
          </h2>
          <form onSubmit={handleRegister} className="card-body">
            <fieldset className="fieldset">

              {/* Name */}
              <label className="label">Name</label>
              <input
                name="name"
                type="text"
                className="input"
                placeholder="Name"
                required
              />

              {/* PhotoURL */}

              <label className="label">PhotoURL</label>
              <input
                name="photo"
                type="text"
                className="input"
                placeholder="Photo url"
                required
              />

              {/* email */}
              <label className="label">Email</label>
              <input
                name="email"
                type="email"
                className="input"
                placeholder="Email"
                required
              />

              {/* password */}
              <label className="label">Password</label>
              <input
                name="password"
                type="password"
                className="input"
                placeholder="Password"
                required
              />

              <button type="submit" className="btn btn-neutral mt-4">
                Register
              </button>
              <p className="font-semibold text-center pt-5">
                Already Have An Account ?{" "}
                <Link className="text-secondary" to="/auth/login">
                  Login
                </Link>
              </p>
            </fieldset>
          </form>
        </div>
      </div>
    );
};

export default Register;



//===========================Login.jsx=======================
import React from 'react';
import { use } from 'react';
import { Link } from 'react-router';
import { AuthContext } from '../provider/AuthProvider';

const Login = () => {

const {signIn}=use(AuthContext);


  //--------------------------------------
  const handleLogin=(e)=>{
    e.preventDefault();
    const form = e.target;
    
    const email = form.email.value;
    const password = form.password.value;
    console.log({ email, password });
    signIn(email,password)
    .then(result=>{
      const user=result.user;
      console.log(user)
    })
    .catch((error)=>{
      const errorCode=error.code;
      const errorMessage=error.message;
      alert(error,errorMessage);
    })
  }
    return (
      <div className="flex justify-center min-h-screen items-center">
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl py-5">
          <h2 className="font-semibold text-2xl text-center">
            Login your account
          </h2>
          <form onSubmit={handleLogin} className="card-body">
            <fieldset className="fieldset">

              {/* email */}
              <label className="label">Email</label>
              <input name='email' type="email" className="input" placeholder="Email" />

              {/* password */}
              <label className="label">Password</label>
              <input name='password' type="password" className="input" placeholder="Password" />
              <div>
                <a className="link link-hover">Forgot password?</a>
              </div>

              <button type='submit' className="btn btn-neutral mt-4">Login</button>
              <p className="font-semibold text-center pt-5">
                Dont’t Have An Account ?{" "}
                <Link className="text-secondary" to="/auth/register">
                  Register
                </Link>
              </p>
            </fieldset>
          </form>
        </div>
      </div>
    );
};

export default Login;

//-------51-5----------end-----------------

//================Privet Route implementation jate user logout hole news dekte na pare==========================//
// 1.Router.jsx er moddhe :
//   {
//     path: "/news-details/:id",
//     element: <NewsDetails></NewsDetails>,
//     loader:()=>fetch('/news.json')
//   },
// eta k change <PrivetRoute> </PrivetRoute> er moddhe rap korte hobe
 //if->user thake  return childdrean else navigain-> login

//  1.user ase ki na user anbo authContext theke
//  2. jokhon page reload debo tokhon kaj korbe na ejonno AutProvider.jsx e arekta state declare korbo const [loading,setLoading]=useState(true). user thakle setUser e set hosse but na thakle null e set hosse useEffect() er moddhe. so setLoading er value setLoading(false ) kore debo. last e authData te loading,
//     setLoading share kore debo
//3.tarpor privetRoute.jsx e loading ta add kore debo const {user,loading}=use(AuthContext) er moddhe. the check korbo if(loading) kine hole sipnner dekhabo. 
//4.Aro vlo kore dekhanor jonno Loading.jsx component er moddhe loading ta diye privetRoute e import korci.
//5. login na kore read more e click korle login page e niye jay but akhon user login korle jokhon read more e click korle specific news e jawar kotha cilo seta redirtectly nisse na  eta solve korar jonno : privet router e "const location= useLoaction" hook use korbo.
//6. <Navigate state={location.pathname} to='/auth/login'></Navigate> moddhe state={} props hisebe pathai debo
//7.login.jsx e-> const location=useLocation() ta abr nebo tahole console e path dekha jbe console korle . akhon jokhon signin korbe take navigate kore pathai debo login successful howar por.
// const  navigate=useNavigate() use korbo. "navigate(`${location.state?location.state :"/"}`)" hole location.sate na hole homepage




//================login er somoy error dekhanor jonno login.jsx============
//1.const [error,setError]=useState() then setError(errorCode)
//2.registr.jsx e->same kaj




//-==========================update user using firebase=================
//1. Authprovider.jsx e-> const updateUser(updateData) nibo then tar moddhe updateProfile(auth.currentUser,updateData) fiarebase/auth theke nibo . tarpor updateUser k share kore debo authData te;
//2.register.jsx e giye updateUser j distructure kore createUser er moddhe call kore debo. tarpor updateUser({displayName:name,photoURL:photo});
//3; setUser k update er moddhe r catch block add korte hobe.

//  createUser(email, password)
//       .then((result) => {
//         const user = result.user;
//         // console.log(user)
//         updateUser({ displayName: name, photoURL: photo })
//           .then(() => {
//             setUser(user);
//           })
//           .catch((error) => {
//             console.log(error)
//           });
//         // setUser(user)
//       })

//       .catch((error) => {
//         const errorCode = error.code;
//         const errorMessage = error.message;
//         alert(errorMessage);
//       });
//   };

