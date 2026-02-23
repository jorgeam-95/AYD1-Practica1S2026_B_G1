import { useState } from 'react';
import { Plus, StickyNote, Pin } from 'lucide-react';
import Notas from './Notas';
import FormNotas from './FormNotas';

function InicioNotas({ notes, tags, usuario }) {
  const [showForm, setShowForm] = useState(false);
  const [editingNote, setEditingNote] = useState(null);

  const pinnedNotes = notes.filter(note => note.fijada);
  const regularNotes = notes.filter(note => !note.fijada);

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
    handleCloseForm();
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

        {/* Empty State */}
        {notes.length === 0 ? (
          <div className="text-center py-20">
            <div className="bg-white/30 backdrop-blur-lg rounded-2xl p-12 max-w-md mx-auto border border-white/40 shadow-2xl">
              <StickyNote size={80} className="mx-auto mb-6 text-white" strokeWidth={1.5} />
              <h2 className="text-3xl font-bold text-white mb-3">
                No tienes notas aún
              </h2>
              <p className="text-white/80 text-lg">
                Crea tu primera nota haciendo clic en el botón "Nueva Nota"
              </p>
            </div>
          </div>
        ) : (
          <>
            {/* Pinned Notes */}
            {pinnedNotes.length > 0 && (
              <div className="mb-10">
                <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-2 drop-shadow-lg">
                  <Pin size={24} className="fill-white" />
                  Fijadas
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {pinnedNotes.map(note => (
                    <Notas
                      key={note.id}
                      note={note}
                      onEdit={handleEditNote}
                      onDelete={() => console.log('Eliminar')}
                      onPin={() => console.log('Fijar')}
                      onArchive={() => console.log('Archivar')}
                      onShare={() => console.log('Compartir')}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Regular Notes */}
            {regularNotes.length > 0 && (
              <div>
                <h2 className="text-2xl font-bold text-white mb-6 drop-shadow-lg">
                  Todas las notas
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {regularNotes.map(note => (
                    <Notas
                      key={note.id}
                      note={note}
                      onEdit={handleEditNote}
                      onDelete={() => console.log('Eliminar')}
                      onPin={() => console.log('Fijar')}
                      onArchive={() => console.log('Archivar')}
                      onShare={() => console.log('Compartir')}
                    />
                  ))}
                </div>
              </div>
            )}
          </>
        )}

        {/* Modal Form */}
        {showForm && (
          <FormNotas
            note={editingNote}
            tags={tags}
            usuarioown={usuario}
            onClose={handleCloseForm}
            onSuccess={handleFormSuccess}
          />
        )}
      </div>
    </div>
  );
}

export default InicioNotas;
