import { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import InicioNotas from './InicioNotas';
import Archivo from './Archivo';
import Compartido from './Compartido';
import Perfil from './Perfil';

function Home() {
  const [notes, setNotes] = useState([
    // ejemplo para mientras
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

  // Usuario de ejemplo
  const user = {
    nombre: "Usuario Demo",
    email: "demo@gmail.com"
  };

  const handleLogout = () => {
    console.log("Cerrando sesión...");
    // Aquí iría la lógica de logout
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
