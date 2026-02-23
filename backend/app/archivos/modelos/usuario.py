from pydantic import BaseModel

class Usuario(BaseModel):
    usuario: str
    password: str