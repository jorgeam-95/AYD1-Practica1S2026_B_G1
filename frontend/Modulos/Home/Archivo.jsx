import { Archive, ArchiveRestore } from 'lucide-react';
import NoteCard from './Notas';

function Archivo({ notes }) {
  const handleUnarchive = (noteId) => {
    console.log('Desarchivar:', noteId);
  };

  return (
    <div className="w-full h-full bg-gradient-to-br from-green-300 via-blue-400 to-purple-500 p-8 overflow-y-auto">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white tracking-wide drop-shadow-lg flex items-center gap-3">
            <Archive size={36} />
            Notas Archivadas
          </h1>
          <p className="text-white/80 text-lg mt-2">
            Aquí se encuentran las notas que has archivado
          </p>
        </div>

        {notes.length === 0 ? (
          <div className="text-center py-20">
            <div className="bg-white/30 backdrop-blur-lg rounded-2xl p-12 max-w-md mx-auto border border-white/40 shadow-2xl">
              <Archive size={80} className="mx-auto mb-6 text-white" strokeWidth={1.5} />
              <h2 className="text-3xl font-bold text-white mb-3">
                No hay notas archivadas
              </h2>
              <p className="text-white/80 text-lg">
                Las notas que archives aparecerán aquí
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.map(note => (
              <div key={note.id} className="relative">
                <NoteCard
                  note={note}
                  onEdit={() => {}}
                  onDelete={() => {}}
                  onPin={() => {}}
                  onArchive={handleUnarchive}
                  onShare={() => {}}
                />
                <button
                  onClick={() => handleUnarchive(note.id)}
                  className="mt-3 w-full bg-gradient-to-r from-gray-600 to-gray-700 text-white px-4 py-2 rounded-xl hover:scale-105 transition-all font-semibold shadow-lg flex items-center justify-center gap-2"
                >
                  <ArchiveRestore size={18} />
                  Desarchivar
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Archivo;
