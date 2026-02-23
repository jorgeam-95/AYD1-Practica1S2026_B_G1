import { useState } from 'react';
import { Menu, LogOut } from 'lucide-react';

function Navbar({ user, onLogout, onToggleSidebar }) {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <div className="w-full h-[8%] bg-cyan-700 shadow-lg flex items-center justify-between px-9">
      <div className="flex items-center gap-4">
        <button 
          onClick={onToggleSidebar}
          className="text-white hover:bg-cyan-600 p-2 rounded-lg transition-all"
        >
          <Menu size={28} />
        </button>
        <p className="text-3xl font-bold text-white tracking-wide">
          Mis Notas
        </p>
      </div>
      
      <div className="flex items-center gap-4">
        <span className="text-white font-medium hidden md:block">
          {user?.nombre}
        </span>
        
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold flex items-center justify-center hover:scale-105 transition-transform shadow-lg"
          >
            {user?.nombre?.charAt(0).toUpperCase()}
          </button>
          
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl py-2 z-50">
              <div className="px-4 py-3 border-b border-gray-200">
                <p className="font-semibold text-gray-800">{user?.nombre}</p>
                <p className="text-sm text-gray-500">{user?.email}</p>
              </div>
              <button
                onClick={onLogout}
                className="w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100 transition-colors flex items-center gap-2"
              >
                <LogOut size={18} />
                Cerrar Sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
