import { useState } from 'react';
import { Plus, StickyNote, Pin, Share2, X } from 'lucide-react';
import Notas from './Notas';
import FormNotas from './FormNotas';

function InicioNotas({ notes, tags, usuario, onRefresh }) {
  const [showForm, setShowForm] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  
  // NUEVO: Estados para manejar la ventana de compartir
  const [noteToShare, setNoteToShare] = useState(null);
  const [shareUsername, setShareUsername] = useState("");

  const notasActivas = notes.filter(note => !note.archivada);
  const pinnedNotes = notasActivas.filter(note => note.fijada);
  const regularNotes = notasActivas.filter(note => !note.fijada);

  const handleCreateNote = () => {
    setEditingNote(null);
    setShowForm(true);
  };

  const handleEditNote = (note) => {
    setEditingNote(note);
    setShowForm(true);
  };

  const handleCloseForm = () => {
    setShowForm(false);
    setEditingNote(null);
  };

  const handleFormSuccess = () => {
    console.log('Nota guardada exitosamente');
    if (onRefresh) onRefresh(); 
    handleCloseForm();
  };

  // Funciones de estado de la nota
  const handleArchiveNote = async (titulo) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/notas/archivar/${titulo}`, { method: 'PUT' });
      if (response.ok && onRefresh) onRefresh();
    } catch (error) { console.error("Error al archivar:", error); }
  };

  const handlePinNote = async (titulo) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/notas/fijar/${titulo}`, { method: 'PUT' });
      if (response.ok && onRefresh) onRefresh();
    } catch (error) { console.error("Error al fijar:", error); }
  };

  const handleDeleteNote = async (titulo) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/notas/${titulo}`, { method: 'DELETE' });
      if (response.ok && onRefresh) onRefresh();
    } catch (error) { console.error("Error al eliminar:", error); }
  };

  // NUEVO: Función para enviar la nota compartida al backend
  const handleShareSubmit = async (e) => {
    e.preventDefault();
    if (!shareUsername.trim()) return;

    try {
      // Ajusta esta URL si tus compañeros le pusieron otro nombre al endpoint
      const response = await fetch(`http://127.0.0.1:8000/notas/compartir`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          titulo: noteToShare.titulo,
          usuario_origen: usuario,
          usuario_destino: shareUsername
        })
      });

      if (response.ok) {
        alert(`¡Nota compartida con ${shareUsername} exitosamente!`);
        setNoteToShare(null);
        setShareUsername("");
      } else {
        alert("Error al compartir. Verifica que el usuario exista.");
      }
    } catch (error) {
      console.error("Error de conexión:", error);
    }
  };

  return (
    <div className="w-full h-full bg-gradient-to-br from-green-300 via-blue-400 to-purple-500 p-8 overflow-y-auto">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-white tracking-wide drop-shadow-lg">
            Mis Notas
          </h1>
          <button
            onClick={handleCreateNote}
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300 flex items-center gap-2"
          >
            <Plus size={20} />
            Nueva Nota
          </button>
        </div>

        {notasActivas.length === 0 ? (
          <div className="text-center py-20">
            <div className="bg-white/30 backdrop-blur-lg rounded-2xl p-12 max-w-md mx-auto border border-white/40 shadow-2xl">
              <StickyNote size={80} className="mx-auto mb-6 text-white" strokeWidth={1.5} />
              <h2 className="text-3xl font-bold text-white mb-3">No tienes notas aún</h2>
              <p className="text-white/80 text-lg">Crea tu primera nota haciendo clic en el botón "Nueva Nota"</p>
            </div>
          </div>
        ) : (
          <>
            {/* Notas Fijadas */}
            {pinnedNotes.length > 0 && (
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2 drop-shadow-lg">
                  <Pin size={24} className="fill-white" /> Fijadas
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {pinnedNotes.map(note => (
                    <Notas
                      key={note.id || note.titulo}
                      note={note}
                      onEdit={handleEditNote}
                      onDelete={() => handleDeleteNote(note.titulo)}
                      onPin={() => handlePinNote(note.titulo)}
                      onArchive={() => handleArchiveNote(note.titulo)}
                      onShare={() => setNoteToShare(note)} // NUEVO: Abre el modal
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Notas Regulares */}
            {regularNotes.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-6 drop-shadow-lg">Todas las notas</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {regularNotes.map(note => (
                    <Notas
                      key={note.id || note.titulo}
                      note={note}
                      onEdit={handleEditNote}
                      onDelete={() => handleDeleteNote(note.titulo)}
                      onPin={() => handlePinNote(note.titulo)}
                      onArchive={() => handleArchiveNote(note.titulo)}
                      onShare={() => setNoteToShare(note)} // NUEVO: Abre el modal
                    />
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* Modal de Formulario */}
        {showForm && (
          <FormNotas
            note={editingNote}
            tags={tags}
            onClose={handleCloseForm}
            onSuccess={handleFormSuccess}
            usuarioown={usuario}
          />
        )}

        {/* NUEVO: Modal para Compartir Nota */}
        {noteToShare && (
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setNoteToShare(null)}>
            <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl" onClick={e => e.stopPropagation()}>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <Share2 size={24} className="text-blue-600" />
                  Compartir Nota
                </h3>
                <button onClick={() => setNoteToShare(null)} className="text-gray-400 hover:text-gray-600">
                  <X size={24} />
                </button>
              </div>
              
              <p className="text-gray-600 mb-4">
                Estás compartiendo: <strong>{noteToShare.titulo}</strong>
              </p>

              <form onSubmit={handleShareSubmit} className="flex flex-col gap-4">
                <div>
                  <label className="text-gray-700 font-medium text-sm">Usuario destino</label>
                  <input
                    type="text"
                    required
                    value={shareUsername}
                    onChange={(e) => setShareUsername(e.target.value)}
                    placeholder="Escribe el usuario exacto"
                    className="mt-1 w-full rounded-lg border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div className="flex justify-end gap-3 mt-4">
                  <button
                    type="button"
                    onClick={() => setNoteToShare(null)}
                    className="px-4 py-2 text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200 font-medium"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium shadow-md"
                  >
                    Compartir
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}

export default InicioNotas;