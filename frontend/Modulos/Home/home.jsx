import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import InicioNotas from './InicioNotas';
import Archivo from './Archivo';
import Compartido from './Compartido';
import Perfil from './Perfil';
import { useParams } from 'react-router-dom';

function Home() {
  const {usuario} = useParams();
  const navigate = useNavigate();
  const [notes, setNotes] = useState([
    {
      id: 1,
      titulo: "Mi primera nota",
      descripcion: "Esta es una nota de ejemplo para visualizar el diseño",
      etiqueta_nombre: "Personal",
      fijada: true,
      archivada: false,
      updated_at: new Date()
    },
    {
      id: 2,
      titulo: "Recordatorio importante",
      descripcion: "No olvidar la reunión de mañana a las 10am",
      etiqueta_nombre: "Trabajo",
      fijada: false,
      archivada: false,
      updated_at: new Date()
    }
  ]);

  const [archivedNotes, setArchivedNotes] = useState([]);
  const [sharedNotes, setSharedNotes] = useState([]);
  const [mySharedNotes, setMySharedNotes] = useState([]);
  const [tags, setTags] = useState([
    { id: 1, nombre: "Personal" },
    { id: 2, nombre: "Trabajo" },
    { id: 3, nombre: "Estudios" }
  ]);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // --- FUNCIÓN PARA CARGAR TODA LA INFORMACIÓN DEL BACKEND ---
  const fetchAllData = async () => {
    if (!usuario) return;
    
    try {
      // 1. Obtener Notas Activas (No archivadas)
      const resActivas = await fetch(`http://localhost:8000/notas/${usuario}`);
      const dataActivas = await resActivas.json();
      if (dataActivas.status === 200) {
        setNotes(dataActivas.notas);
      }

      // 2. Obtener Notas Archivadas
      const resArchivadas = await fetch(`http://localhost:8000/notas/archivadas/${usuario}`);
      const dataArchivadas = await resArchivadas.json();
      if (dataArchivadas.status === 200) {
        setArchivedNotes(dataArchivadas.notas);
      }

      // 3. Obtener notas que me compartieron
      const resRecibidas = await fetch(`http://localhost:8000/notas/compartidas/${usuario}`);
      const dataRecibidas = await resRecibidas.json();
      if (dataRecibidas.status === 200) setSharedNotes(dataRecibidas.notas);

      // 4. Obtener notas que yo compartí
      const resMisCompartidas = await fetch(`http://localhost:8000/notas/mis-compartidas/${usuario}`);
      const dataMisCompartidas = await resMisCompartidas.json();
      if (dataMisCompartidas.status === 200) setMySharedNotes(dataMisCompartidas.notas);

    } catch (error) {
      console.error("Error conectando con el servidor:", error);
    }
  };

  // Se ejecuta al cargar el componente o cuando el usuario cambia
  useEffect(() => {
    fetchAllData();
  }, [usuario]);

  const user = {
    nombre: usuario,
    //email: "demo@gmail.com"
  };

  const handleLogout = () => {
    console.log("Cerrando sesión...");
    localStorage.removeItem("usuario");
    navigate("/");
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="w-screen h-screen flex flex-col bg-gray-50">
      <Navbar 
        user={user} 
        onLogout={handleLogout}
        onToggleSidebar={toggleSidebar}
      />
      
      <div className="flex flex-1 overflow-hidden">
        <Sidebar isOpen={sidebarOpen} />
        
        <main className={`flex-1 overflow-y-auto transition-all duration-300`}>
          <Routes>
            <Route 
              path="/" 
              element={
                <InicioNotas
                  notes={notes}
                  tags={tags}
                  usuario={usuario}
                />
              } 
            />
            <Route 
              path="/archivo" 
              element={<Archivo notes={archivedNotes} />} 
            />
            <Route 
              path="/compartido" 
              element={
                <Compartido 
                  receivedNotes={sharedNotes}
                  mySharedNotes={mySharedNotes}
                />
              } 
            />
            <Route 
              path="/perfil" 
              element={<Perfil user={user} />} 
            />
            <Route path="*" element={<Navigate to="/home" replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default Home;
