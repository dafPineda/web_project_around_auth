import { Link } from "react-router-dom"
import { useState } from "react"

export default function Login({onLogin}){
    const[email, setEmail] = useState("")
    const[password, setPassword] = useState("")

    function handleEmailChange(event){
        setEmail(event.target.value)
    }
    function handlePasswordtChange(event){
        setPassword(event.target.value)
    }
    const handleSubmit = (event) => {
        event.preventDefault()
        onLogin(email, password)
    };
    return(
        <section className="sign">
            <form>
                <h1 className="sing__title">Inicia sesión</h1>
                <fieldset className="sign__fieldset">
                    <input
                    className="sign__input" 
                    placeholder="Correo electronico" 
                    name="email"
                    id="loginEmail"
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    required/>
                    <input
                    className="sign__input"
                    placeholder="Contraseña"
                    name="password"
                    id="loginPassword"
                    type="string"
                    value={password}
                    onChange={handlePasswordtChange}
                    required
                    />
                    <button 
                    className="sign__button"
                    id="loginButton"
                    type="submit"
                    onClick={handleSubmit}
                    >Inicia sesión</button>
                    <p>¿Aún no eres miembro? Regístrate <Link>aquí</Link></p>
                </fieldset>
            </form>
        </section>
    )
}