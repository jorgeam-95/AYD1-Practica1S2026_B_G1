from pydantic import BaseModel
from typing import Optional

class Nota(BaseModel):
    titulo: str
    descripcion: Optional[str] = ""
    etiqueta: Optional[str] = ""
    fijada: bool = False
    archivada: bool = False
    usuario: str