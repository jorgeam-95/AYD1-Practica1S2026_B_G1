import { useState } from 'react';
import { MoreVertical, Edit2, Pin, Archive, Share2, Trash2 } from 'lucide-react';

function Notas({ note, onEdit, onDelete, onPin, onArchive, onShare }) {
  const [showMenu, setShowMenu] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handlePin = () => {
    console.log('Fijar nota:', note.id);
    if (onPin) onPin(note.id);
    setShowMenu(false);
  };

  const handleArchive = () => {
    console.log('Archivar nota:', note.id);
    if (onArchive) onArchive(note.id);
    setShowMenu(false);
  };

  const handleDelete = () => {
    console.log('Eliminar nota:', note.id);
    if (onDelete) onDelete(note.id);
    setShowDeleteConfirm(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <>
      <div className="bg-white/30 backdrop-blur-lg rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 border border-white/40 group">
        {/* Header */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center gap-2">
            {note.fijada && <Pin size={18} className="text-blue-600 fill-blue-600" />}
            {note.etiqueta_nombre && (
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs px-3 py-1 rounded-full font-medium shadow-lg">
                {note.etiqueta_nombre}
              </span>
            )}
          </div>
          
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="text-gray-600 hover:text-gray-800 p-1 rounded hover:bg-white/50 transition-all"
            >
              <MoreVertical size={20} />
            </button>
            
            {showMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white/90 backdrop-blur-md rounded-xl shadow-2xl py-2 z-10 border border-gray-200">
                <button
                  onClick={() => { if (onEdit) onEdit(note); setShowMenu(false); }}
                  className="w-full text-left px-4 py-2 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all flex items-center gap-2 text-gray-700 font-medium"
                >
                  <Edit2 size={16} />
                  Editar
                </button>
                <button
                  onClick={handlePin}
                  className="w-full text-left px-4 py-2 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all flex items-center gap-2 text-gray-700 font-medium"
                >
                  <Pin size={16} />
                  {note.fijada ? 'Desfijar' : 'Fijar'}
                </button>
                <button
                  onClick={handleArchive}
                  className="w-full text-left px-4 py-2 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all flex items-center gap-2 text-gray-700 font-medium"
                >
                  <Archive size={16} />
                  Archivar
                </button>
                <button
                  onClick={() => { if (onShare) onShare(note); setShowMenu(false); }}
                  className="w-full text-left px-4 py-2 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all flex items-center gap-2 text-gray-700 font-medium"
                >
                  <Share2 size={16} />
                  Compartir
                </button>
                <button
                  onClick={() => { setShowDeleteConfirm(true); setShowMenu(false); }}
                  className="w-full text-left px-4 py-2 hover:bg-red-50 transition-all flex items-center gap-2 text-red-600 font-medium"
                >
                  <Trash2 size={16} />
                  Eliminar
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Body */}
        <div onClick={() => { if (onEdit) onEdit(note); }} className="cursor-pointer">
          <h3 className="text-xl font-bold text-gray-800 mb-3">
            {note.titulo}
          </h3>
          {note.descripcion && (
            <p className="text-gray-700 text-sm line-clamp-3 leading-relaxed">
              {note.descripcion}
            </p>
          )}
        </div>

        {/* Footer */}
        <div className="mt-4 pt-3 border-t border-white/50">
          <span className="text-xs text-gray-500 font-medium">
            {formatDate(note.updated_at || new Date())}
          </span>
        </div>
      </div>

      {/* Modal de confirmación */}
      {showDeleteConfirm && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setShowDeleteConfirm(false)}
        >
          <div 
            className="bg-white/90 backdrop-blur-lg rounded-2xl p-8 max-w-md w-full shadow-2xl border border-white/40"
            onClick={e => e.stopPropagation()}
          >
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Confirmar eliminación
            </h3>
            <p className="text-gray-600 mb-6">
              ¿Estás seguro de que deseas eliminar esta nota? Esta acción no se puede deshacer.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all font-medium"
              >
                Cancelar
              </button>
              <button
                onClick={handleDelete}
                className="px-6 py-2 bg-gradient-to-r from-red-600 to-red-700 text-white rounded-lg hover:scale-105 transition-all font-semibold shadow-lg flex items-center gap-2"
              >
                <Trash2 size={18} />
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Notas;
