import { NavLink } from 'react-router-dom';
import { Home, Archive, Share2, Settings } from 'lucide-react';

function Sidebar({ isOpen }) {
  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-6 py-3 transition-all duration-200 border-l-4 ${
      isActive
        ? 'bg-gradient-to-r from-blue-50 to-purple-50 border-blue-600 text-blue-600 font-semibold'
        : 'border-transparent text-gray-700 hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 hover:border-gray-300'
    }`;

  return (
    <aside
      className={`w-64 bg-white shadow-lg transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      } fixed md:relative h-full z-40`}
    >
      <nav className="pt-6">
        <NavLink to="/home" end className={linkClass}>
          <Home size={20} />
          <span className="text-base">Inicio</span>
        </NavLink>

      <NavLink to="/home/archivo" className={linkClass}>
        <Archive size={20} />
        <span className="text-base">Archivados</span>
      </NavLink>

      <NavLink to="/home/compartido" className={linkClass}>
        <Share2 size={20} />
        <span className="text-base">Compartidos</span>
      </NavLink>

        <div className="my-4 mx-6 border-t border-gray-200"></div>

        <NavLink to="/home/perfil" className={linkClass}>
          <Settings size={20} />
          <span className="text-base">Perfil</span>
        </NavLink>
      </nav>
    </aside>
  );
}

export default Sidebar;
