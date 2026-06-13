import { Link } from "react-router-dom"
export default function Login(){
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
        console.log(email, password) 
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
                    required/>
                    <input
                    className="sign__input"
                    placeholder="Contraseña"
                    name="password"
                    id="loginPassword"
                    type="string"
                    value={password}
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