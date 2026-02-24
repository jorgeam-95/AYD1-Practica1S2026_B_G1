import { useState, useEffect } from 'react';
import { Routes, Route, Navigate, useNavigate, useParams } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import InicioNotas from './InicioNotas';
import Archivo from './Archivo';
import Compartido from './Compartido';
import Perfil from './Perfil';

function Home() {
  const { usuario } = useParams();
  const navigate = useNavigate();

  // Estados para las notas que vienen del Backend
  const [notes, setNotes] = useState([]);
  const [archivedNotes, setArchivedNotes] = useState([]);
  const [sharedNotes, setSharedNotes] = useState([]);
  const [mySharedNotes, setMySharedNotes] = useState([]);
  
  // Estado para etiquetas (puedes luego traerlas del backend también)
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
            {/* RUTA INICIO: Notas normales */}
            <Route 
              path="/" 
              element={
                <InicioNotas
                  notes={notes}
                  tags={tags}
                  usuario={usuario}
                  onRefresh={fetchAllData} // Pasamos la función para refrescar tras crear notas
                />
              } 
            />
            
            {/* RUTA ARCHIVO: Notas archivadas */}
            <Route 
              path="/archivo" 
              element={
                <Archivo 
                  notes={archivedNotes} 
                  onRefresh={fetchAllData} 
                />
              } 
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

            {/* Redirección por defecto */}
            <Route path="*" element={<Navigate to={`/home/${usuario}`} replace />} />
          </Routes>
        </main>
      </div>
    </div>
  );
}

export default Home;