import { useState } from 'react';
import { Share2, Inbox, Send, User, X } from 'lucide-react';

function Compartido({ receivedNotes, mySharedNotes }) {
  const [activeTab, setActiveTab] = useState('received');

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  return (
    <div className="w-full h-full bg-gradient-to-br from-green-300 via-blue-400 to-purple-500 p-8 overflow-y-auto">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white tracking-wide drop-shadow-lg flex items-center gap-3">
            <Share2 size={36} />
            Notas Compartidas
          </h1>
          <p className="text-white/80 text-lg mt-2">
            Gestiona las notas que has compartido o que han compartido contigo
          </p>
        </div>

        {/* Tabs */}
        <div className="flex gap-3 mb-8">
          <button
            onClick={() => setActiveTab('received')}
            className={`px-8 py-3 font-semibold rounded-xl transition-all duration-300 shadow-lg flex items-center gap-2 ${
              activeTab === 'received'
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white scale-105'
                : 'bg-white/30 backdrop-blur-md text-white hover:bg-white/40'
            }`}
          >
            <Inbox size={20} />
            Recibidas ({receivedNotes.length})
          </button>
          <button
            onClick={() => setActiveTab('compartido')}
            className={`px-8 py-3 font-semibold rounded-xl transition-all duration-300 shadow-lg flex items-center gap-2 ${
              activeTab === 'compartido'
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white scale-105'
                : 'bg-white/30 backdrop-blur-md text-white hover:bg-white/40'
            }`}
          >
            <Send size={20} />
            Compartidas por mí ({mySharedNotes.length})
          </button>
        </div>

        {/* Content */}
        <div>
          {activeTab === 'received' && (
            <div>
              {receivedNotes.length === 0 ? (
                <div className="text-center py-20">
                  <div className="bg-white/30 backdrop-blur-lg rounded-2xl p-12 max-w-md mx-auto border border-white/40 shadow-2xl">
                    <Inbox size={80} className="mx-auto mb-6 text-white" strokeWidth={1.5} />
                    <h2 className="text-3xl font-bold text-white mb-3">
                      No hay notas compartidas
                    </h2>
                    <p className="text-white/80 text-lg">
                      Aquí aparecerán las notas que otros usuarios compartan contigo
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {receivedNotes.map(note => (
                    <div key={note.id} className="bg-white/30 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-white/40 hover:shadow-2xl transition-all">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          {note.etiqueta_nombre && (
                            <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs px-3 py-1 rounded-full font-medium shadow-lg">
                              {note.etiqueta_nombre}
                            </span>
                          )}
                          <h3 className="text-xl font-bold text-white mt-2">
                            {note.titulo}
                          </h3>
                        </div>
                        <span className="bg-gradient-to-r from-orange-500 to-orange-600 text-white text-sm px-3 py-1 rounded-full font-medium shadow-lg flex items-center gap-1">
                          <User size={14} />
                          {note.propietario_nombre}
                        </span>
                      </div>
                      {note.descripcion && (
                        <p className="text-white/90 mb-4">{note.descripcion}</p>
                      )}
                      <div className="text-sm text-white/70 font-medium">
                        Compartida el {formatDate(note.compartida_en || new Date())}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'compartido' && (
            <div>
              {mySharedNotes.length === 0 ? (
                <div className="text-center py-20">
                  <div className="bg-white/30 backdrop-blur-lg rounded-2xl p-12 max-w-md mx-auto border border-white/40 shadow-2xl">
                    <Send size={80} className="mx-auto mb-6 text-white" strokeWidth={1.5} />
                    <h2 className="text-3xl font-bold text-white mb-3">
                      No has compartido notas
                    </h2>
                    <p className="text-white/80 text-lg">
                      Las notas que compartas con otros usuarios aparecerán aquí
                    </p>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {mySharedNotes.map(note => (
                    <div key={note.id} className="bg-white/30 backdrop-blur-lg rounded-2xl shadow-xl p-6 border border-white/40 hover:shadow-2xl transition-all">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          {note.etiqueta_nombre && (
                            <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-xs px-3 py-1 rounded-full font-medium shadow-lg">
                              {note.etiqueta_nombre}
                            </span>
                          )}
                          <h3 className="text-xl font-bold text-white mt-2">
                            {note.titulo}
                          </h3>
                        </div>
                      </div>
                      {note.descripcion && (
                        <p className="text-white/90 mb-4">{note.descripcion}</p>
                      )}
                      <div className="mt-4 pt-4 border-t border-white/30">
                        <p className="text-sm font-semibold text-white mb-2">Compartida con:</p>
                        <div className="flex flex-wrap gap-2">
                          {note.compartida_con?.map(user => (
                            <div key={user.id} className="bg-gradient-to-r from-green-500 to-green-600 text-white px-3 py-1 rounded-full text-sm font-medium flex items-center gap-2 shadow-lg">
                              <User size={14} />
                              <span>{user.nombre}</span>
                              <button className="hover:text-red-300 transition-colors">
                                <X size={14} />
                              </button>
                            </div>
                          )) || (
                            <span className="text-white/70 text-sm">No compartida aún</span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Compartido;
