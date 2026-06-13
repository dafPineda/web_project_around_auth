import { useState } from "react"
import { Link } from "react-router-dom"
export default function Register(){
    const[email, setEmail] = useState("")
    const[password, setPassword] = useState("")

    function handleEmailChange(event){
        setEmail(event.target.value)
    }
    function handlePasswordtChange(event){
        setPassword(event.target.value)
    }
    const handleSubmit = (event) => {
        event.preventDefault(); 
    };
    return(
        <section className="sign">
            <form className="sign__form">
                <h1 className="sing__title">Registrate</h1>
                <fieldset className="sign__fieldset">
                    <input
                    className="sign__input" 
                    placeholder="Correo electronico" 
                    name="email"
                    id="email"
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    required
                    onChange={handleEmailChange}/>
                    <input
                    className="sign__input"
                    placeholder="Contraseña"
                    name="password"
                    id="password"
                    type="string"
                    value={password}
                    onChange={handlePasswordtChange}
                    required
                    onChange={handlePasswordtChange}
                    />
                    <button 
                    className="sign__button"
                    type="submit"
                    onClick={handleSubmit}
                    >Regístrate</button>
                    <p>¿Ya eres miembro? Inicia sesión <Link>aquí</Link></p>
                </fieldset>
            </form>
        </section>
    )
}