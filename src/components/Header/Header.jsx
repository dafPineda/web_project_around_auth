import { Link } from "react-router-dom"
import { useLocation } from 'react-router-dom';
import CurrentUserContext from "../../contexts/CurrentUserContext";

function Header({isLoggedIn, closeSession, userEmail}){
    const location = useLocation();
    const isSignin = location.pathname.includes('signin')
   return(
        <header className="header">
          <div className="header__title">
              <h1 className="header__title header__title_big">Around</h1>           
              <h2 className="header__title header__title_little-up">The U.S.</h2>
              {isLoggedIn ? 
              (<><p className="heder__session">{userEmail}</p>
              <Link className="heder__session" to="/web_project_around_react/signin" onClick={closeSession}>Cerrar sesión </Link></>) 
              : 
              !isSignin ? 
                (<Link to="/web_project_around_react/signin" className="heder__session">Inicia sesión</Link>) 
                : 
                (<Link to="/web_project_around_react/signup" className="heder__session">Regístrate</Link>)}
          </div> 
          <hr className="header__line"/>
        </header>
    )
}

export default Header 