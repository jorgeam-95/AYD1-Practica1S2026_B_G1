
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

function Login(){

  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const Loguearse = async () => {

    const response = await fetch("http://127.0.0.1:8000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            usuario,
            password
        })
    })

    const data = await response.json()
    if (response.ok) {
        alert("Login correcto")
        navigate(`/home/${usuario}`);
    } else {
        alert("Usuario o contrase invalida")
        console.log("Error:", data.detail)
    }

  }

    return (
  <div className="w-screen h-screen bg-gradient-to-br from-green-300 via-blue-400 to-purple-500 flex flex-col">

    <div className="w-full h-[8%] bg-cyan-700 shadow-lg flex items-center justify-between px-9">
      <p className="text-3xl px-9 font-bold text-white tracking-wide">
        Mis Notas
      </p>
    </div>
    <div className="w-full h-[92%] flex">
      <div className="w-1/2 h-full flex justify-center items-center">
        <div className="bg-white/30 backdrop-blur-lg shadow-2xl rounded-2xl py-12 px-10 flex flex-col gap-y-8 w-[80%] xl:w-[60%] border border-white/40">

          <div className="text-center">
            <h2 className="text-3xl font-bold text-white">Login</h2>
            <p className="text-white/80 text-sm mt-2">Bienvenido de nuevo</p>
          </div>

          <div className="flex flex-col gap-y-5">

            <div className="flex flex-col gap-2">
              <label className="text-white font-medium">Usuario</label>
              <input 
                type="text"
                className="rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-blue-500 shadow-md transition-all"
                placeholder="Ingresa tu usuario"
                onChange={(e) => setUsuario(e.target.value)}
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-white font-medium">Contraseña</label>
              <input 
                type="password"
                className="rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-purple-500 shadow-md transition-all"
                placeholder="Ingresa tu contraseña"
                onChange={ (e) => setPassword(e.target.value) }
              />
            </div>

          </div>
      
        <div>
          <span>¿No tienes cuenta?</span>
          <Link to="/registro" className="font-semibold hover:underline">  Resitrate aquí </Link>
        </div>

          <div className="flex justify-center">
            <button 
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300"
            onClick={Loguearse}
            >
              Ingresar
            </button>
          </div>

        </div>
      </div>

      <div className="w-1/2 h-full flex justify-center items-center">
        <img src="nota.png" className="max-w-full h-[80%] drop-shadow-2xl "/>
      </div>

    </div>
    
  </div>
)

}

export default Login