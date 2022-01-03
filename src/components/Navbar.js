import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { getAuth, signInWithPopup, GoogleAuthProvider,onAuthStateChanged } from "firebase/auth";
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link, Router } from 'react-router-dom';
import { SidebarData } from './SidebarData';
import "../style/Navbar.css";
import { IconContext } from 'react-icons';

function Navbar() {
    const provider = new GoogleAuthProvider();
    const auth = getAuth();
    var displayName, uid, photoURL;
    // var displayName, uid, photoURL;
    const history = useHistory();


  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);


  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            console.log(user);
            uid = user.uid;
            photoURL = user.photoURL;
            displayName = user.displayName;
            console.log(photoURL);
        } else {
          console.log("no user is currently signed in");
          history.push('/');
        }
      });
  }, [])



  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navbar'>
          <Link to='#' className='menu-bars'>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
          <h1 className='name'>{displayName}</h1>
          <img src={photoURL} />
          <Link to='/'>
              <button className="sign-out" onClick={()=>auth.signOut()}>Sign Out</button>
          </Link>
        </div>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <ul className='nav-menu-items' onClick={showSidebar}>
            <li className='navbar-toggle'>
              <Link to='#' className='menu-bars'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;