# 📘 MANUAL TÉCNICO
Práctica Única – Sistema de Gestión de Notas
Curso: AYD1

## 1️⃣ Introducción

El presente documento describe la implementación técnica del backend del sistema de gestión de notas desarrollado para la Práctica Única.

El sistema permite:

Registro de usuarios

Inicio de sesión

Creación, modificación y eliminación de notas

Fijar notas

Archivar notas

Visualizar notas archivadas

El backend fue desarrollado utilizando FastAPI y MongoDB, permitiendo una arquitectura moderna basada en servicios REST.

## 2️⃣ Tecnologías Utilizadas

El sistema fue desarrollado con las siguientes tecnologías:

Backend
Python 3
FastAPI
MongoDB
Pydantic
Uvicorn
CORS Middleware
Frontend
React
Vite
Axios

## 3. Arquitectura del Proyecto

La estructura del backend está organizada de la siguiente forma:

backend/
 └── app/
     ├── archivos/
     │    └── main.py
     ├── db/
     │    └── connection.py
     ├── modelos/
     │    ├── usuario.py
     │    ├── login.py
     │    └── nota.py
     ├── requirements.txt
     └── .gitignore
## 4. Descripción de Componentes
📌 main.py

Archivo principal del backend donde:

Se instancia la aplicación FastAPI

Se configuran los middlewares (CORS)

Se definen todos los endpoints

📌 db/connection.py

Archivo encargado de:
Establecer la conexión con MongoDB
Definir las colecciones:
usuarios_collection
notas_collection

📌 modelos/

Contiene los modelos definidos con Pydantic:
Usuario
Login
Nota
Estos modelos permiten validar automáticamente los datos recibidos por la API.

## 5. Configuración del Entorno
Instalación de dependencias
pip install -r requirements.txt
Ejecutar servidor
uvicorn app.archivos.main:app --reload

El servidor corre por defecto en:

http://localhost:8000
## 6. Configuración CORS

Se configuró CORS para permitir comunicación con el frontend (React + Vite):

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

Esto permite que el frontend pueda consumir la API sin bloqueos de seguridad del navegador.

## 7. Base de Datos

Se utilizó MongoDB como sistema gestor de base de datos NoSQL.

Se crearon dos colecciones principales:

usuarios

notas

Ejemplo de estructura de documento Usuario:

{
  "usuario": "luis",
  "password": "123456"
}

Ejemplo de estructura de documento Nota:

{
  "titulo": "Mi nota",
  "contenido": "Contenido de la nota",
  "usuario": "luis",
  "fijada": false,
  "archivada": false
}
## 8. Endpoints Implementados
🔐 Registro
POST /registro

Permite crear un nuevo usuario.

🔐 Login
POST /login

Valida credenciales del usuario.

📝 Crear Nota
POST /notas

Crea una nueva nota.

📋 Obtener Notas
GET /notas/{usuario}

Devuelve notas no archivadas del usuario.

✏ Modificar Nota
PUT /notas/{titulo}

Actualiza una nota existente.

❌ Eliminar Nota
DELETE /notas/{titulo}

Elimina una nota.

📌 Fijar Nota
PUT /notas/fijar/{titulo}

Alterna el estado de fijada.

📦 Archivar Nota
PUT /notas/archivar/{titulo}

Marca una nota como archivada.

📂 Obtener Notas Archivadas
GET /notas/archivadas/{usuario}

Devuelve notas archivadas.

## 9. Flujo del Sistema

El usuario se registra.
El usuario inicia sesión.
El usuario puede:
Crear notas
Editarlas
Eliminarlas
Fijarlas
Archivarlas
Las notas se almacenan en MongoDB.
El frontend consume los endpoints mediante peticiones HTTP.

## 10. Seguridad

Se validan datos mediante modelos Pydantic.

Se manejan excepciones con HTTPException.

Se controla acceso mediante validación de usuario existente.

## 11. Conclusión

El backend fue desarrollado utilizando FastAPI y MongoDB, siguiendo una arquitectura modular que separa modelos, conexión a base de datos y controladores.

El sistema cumple con los requerimientos funcionales establecidos en la práctica, permitiendo la gestión completa de notas asociadas a usuarios.
