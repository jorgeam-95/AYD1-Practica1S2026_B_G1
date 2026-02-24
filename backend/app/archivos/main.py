from fastapi import FastAPI,HTTPException
from pydantic import BaseModel
from db.conection import usuarios_collection
from modelos.usuario import Usuario
from modelos.login  import Login
from modelos.nota import Nota
from db.conection import notas_collection, compartidas_collection
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

@app.post("/notas")
def crear_nota(nota: Nota):
    notas_collection.insert_one(nota.dict())
    return {"status": 200, "mensaje": "nota creada"}

@app.get("/notas/{usuario}")
def obtener_notas(usuario: str):
    notas = list(notas_collection.find({"usuario": usuario, "archivada": False}, {"_id": 0}))
    return {"status": 200, "notas": notas}

@app.put("/notas/{titulo}")
def modificar_nota(titulo: str, nota: Nota):
    notas_collection.update_one({"titulo": titulo}, {"$set": nota.dict()})
    return {"status": 200, "mensaje": "nota modificada"}

@app.delete("/notas/{titulo}")
def eliminar_nota(titulo: str):
    notas_collection.delete_one({"titulo": titulo})
    return {"status": 200, "mensaje": "nota eliminada"}

@app.put("/notas/fijar/{titulo}")
def fijar_nota(titulo: str):
    nota = notas_collection.find_one({"titulo": titulo})
    notas_collection.update_one({"titulo": titulo}, {"$set": {"fijada": not nota["fijada"]}})
    return {"status": 200, "mensaje": "nota fijada"}

@app.put("/notas/archivar/{titulo}")
def archivar_nota(titulo: str):
    notas_collection.update_one({"titulo": titulo}, {"$set": {"archivada": True}})
    return {"status": 200, "mensaje": "nota archivada"}

@app.get("/notas/archivadas/{usuario}")
def obtener_archivadas(usuario: str):
    notas = list(notas_collection.find({"usuario": usuario, "archivada": True}, {"_id": 0}))
    return {"status": 200, "notas": notas}

# --- NUEVO MODELO PARA COMPARTIR ---
class CompartirRequest(BaseModel):
    titulo: str
    usuario_origen: str
    usuario_destino: str

# --- NUEVOS ENDPOINTS PARA COMPARTIR ---

@app.post("/notas/compartir")
def compartir_nota(datos: CompartirRequest):
    # 1. Verificar que el usuario destino existe
    usuario_dest = usuarios_collection.find_one({"usuario": datos.usuario_destino})
    if not usuario_dest:
        raise HTTPException(status_code=404, detail="El usuario destino no existe")

    # 2. Buscar la nota original del usuario origen
    nota_original = notas_collection.find_one({"titulo": datos.titulo, "usuario": datos.usuario_origen})
    if not nota_original:
        raise HTTPException(status_code=404, detail="La nota original no existe")

    # 3. Crear el nuevo registro de nota compartida
    nota_compartida = {
        "titulo": nota_original["titulo"],
        "descripcion": nota_original.get("descripcion", ""),
        "etiqueta_nombre": nota_original.get("etiqueta_nombre", "General"),
        "usuario_origen": datos.usuario_origen,
        "usuario_destino": datos.usuario_destino
    }

    # 4. Guardar en la base de datos
    compartidas_collection.insert_one(nota_compartida)
    return {"status": 200, "mensaje": "Nota compartida con éxito"}

@app.get("/notas/compartidas/{usuario}")
def obtener_compartidas(usuario: str):
    # Notas que otros compartieron CONMIGO (yo soy el destino)
    notas = list(compartidas_collection.find({"usuario_destino": usuario}, {"_id": 0}))
    return {"status": 200, "notas": notas}

@app.get("/notas/mis-compartidas/{usuario}")
def obtener_mis_compartidas(usuario: str):
    # Notas que YO compartí con otros (yo soy el origen)
    notas = list(compartidas_collection.find({"usuario_origen": usuario}, {"_id": 0}))
    return {"status": 200, "notas": notas}