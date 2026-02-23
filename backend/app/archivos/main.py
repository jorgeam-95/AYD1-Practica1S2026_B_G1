from fastapi import FastAPI,HTTPException
from pydantic import BaseModel
from db.conection import usuarios_collection
from modelos.usuario import Usuario
from modelos.login  import Login
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Puerto de Vite
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/registro")
def crear_usuario(usuario: Usuario):
    usuario_dict = usuario.dict()
    resultado = usuarios_collection.insert_one(usuario_dict)
    return{
        "status": 200,
        "mensaje": "usuario creado con exito"
    }

@app.post("/login")
def login( datos: Login ):
    usuario_encontrado = usuarios_collection.find_one({
        "usuario":datos.usuario
    })
    
    if not usuario_encontrado:
        raise HTTPException(status_code=404, detail="Usuario no existe")
    
    if usuario_encontrado["password"] != datos.password:
        raise HTTPException(status_code=401, detail="Password incorrecto")

    return {"mensaje": "Login exitoso"}