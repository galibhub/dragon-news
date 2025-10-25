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
          {/* <img src={userIcon} alt="" /> */}
          <img className='w-12 rounded-full' src={`${user ? user.photoURL : userIcon}`} alt="" />
          {user ? (
            <button onClick={handleLogOut} className="btn btn-primary px-9">
              Logout
            </button>
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