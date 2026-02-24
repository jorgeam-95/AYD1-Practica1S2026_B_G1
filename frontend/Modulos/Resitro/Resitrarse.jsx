import { useState, useEffect } from "react"
import { Link, useAsyncError, useNavigate } from "react-router-dom"
import AlertaError from "../Alertas/AlertaError";

function Registrarse(){

    const [usuario, setUsuario] = useState("");
    const [password, setPassword] = useState("");
    const [confpassw, setConfpassw ] = useState("");
    
    const [ messerror, setMesserror ] = useState(false);
    const [ txtmess, setTxtmess ] = useState("");
 
    const validarRegistro = async () =>{

        if ( password === "" || confpassw === "" || usuario === "" ) {
            setTxtmess("Es necesario rellenar todos los campos necesarios")
            setMesserror(true)
        } else if(  password !== confpassw  ){
            setTxtmess("La contraseña no coincide") 
            setMesserror(true)
        }

        const response = await fetch("http://127.0.0.1:8000/registro",{
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                "usuario": usuario,
                "password": password,
            })
        })

        if (response.status == 200) {
            alert( "Usuario creado con Exito" );
        }

    }



    useEffect( () =>{
        if ( messerror ) {
            const timer = setTimeout(() => {
                setMesserror(false)
            }, 3000)

            return () => clearTimeout(timer)
        }
    }, [messerror] )

    return(
        <div className="w-screen h-screen bg-gradient-to-br from-green-300 via-blue-400 to-purple-500 flex flex-col">
            <div className="w-full h-[8%] bg-cyan-700 shadow-lg flex items-center justify-between px-9">
                <p className="text-3xl px-9 font-bold text-white tracking-wide">
                    Mis Notas
                </p>
            </div>

                { messerror && ( <div className="fixed top-40 left-1/2 -translate-x-1/2 z-50"> <AlertaError texto={txtmess} ></AlertaError> </div>   )   }

                <div className="w-full h-[92%] flex">
                    <div className="w-full h-full flex justify-center items-center">
                        <div className="bg-white/30 backdrop-blur-lg shadow-2xl rounded-2xl py-12 px-10 flex flex-col gap-y-8 w-[80%] xl:w-[40%] border border-white/40">

                            <div className="text-center">
                                <h2 className="text-4xl font-bold text-white">Registro</h2>
                            </div>

                            <div className="flex flex-col gap-2">
                                <label className="text-white font-medium">Usuario:</label>
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

                            <div className="flex flex-col gap-2">
                                <label className="text-white font-medium">Repita su contraseña</label>
                                <input 
                                    type="password"
                                    className="rounded-lg px-4 py-2 outline-none focus:ring-2 focus:ring-purple-500 shadow-md transition-all"
                                    placeholder="Repita su contraseña"
                                    onChange={ (e) => setConfpassw(e.target.value) }
                                />
                            </div>

                            <div className="flex justify-center">
                                <button 
                                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300"
                                onClick={validarRegistro}
                                >
                                Registrarse
                                </button>
                            </div>
                        </div>
                    </div>
                </div>


        </div>
    );

}

export default Registrarse;