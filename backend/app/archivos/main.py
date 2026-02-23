from fastapi import FastAPI
from pydantic import BaseModel
from db.conection import usuarios_collection
from modelos.usuario import Usuario
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