import { useState, useEffect } from 'react';
import AlertaError from '../Alertas/AlertaError';

function FormNotas({ note, tags, onClose, onSuccess, usuarioown }) {
  const [formData, setFormData] = useState({
    titulo: '',
    descripcion: '',
    etiqueta_id: '',
    nueva_etiqueta: ''
  });
  const [showError, setShowError] = useState(false);
  const [errorText, setErrorText] = useState('');
  const [showNewTag, setShowNewTag] = useState(false);

  useEffect(() => {
    if (note) {
      setFormData({
        titulo: note.titulo || '',
        descripcion: note.descripcion || '',
        etiqueta_id: note.etiqueta_id || '',
        nueva_etiqueta: ''
      });
    }
  }, [note]);

  useEffect(() => {
    if (showError) {
      const timer = setTimeout(() => {
        setShowError(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showError]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.titulo.trim()) {
      setErrorText('El título es obligatorio');
      setShowError(true);
      return;
    }

    console.log('Guardando nota:', formData);

    const etiquetaFinal = showNewTag
    ? formData.nueva_etiqueta
    : tags.find(tag => tag.id === formData.etiqueta_id)?.nombre || "";

    const notaEnviar = {
      titulo: formData.titulo,
      descripcion: formData.descripcion,
      etiqueta: etiquetaFinal,
      fijada: false,
      archivada: false,
      usuario: usuarioown
    };
    
     try {
      const response = await fetch("http://127.0.0.1:8000/notas", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(notaEnviar)
      });

      const data = await response.json();

      if (response.ok) {
        alert("Nota Craeada con exito")
        console.log("Nota creada:", data);
        if (onSuccess) onSuccess();
      } else {
        setErrorText("Error al crear la nota");
        setShowError(true);
      }
    } catch (error) {
      console.error("Error:", error);
      setErrorText("Error de conexión con el servidor");
      setShowError(true);
    }

    // Simular guardado para agregar funcionalidad despuesxd
    //setTimeout(() => {
    //  if (onSuccess) onSuccess();
    //}, 500);
  };

  return (
    <div 
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      {showError && (
        <div className="fixed top-40 left-1/2 -translate-x-1/2 z-50">
          <AlertaError texto={errorText} />
        </div>
      )}

      <div 
        className="bg-white/30 backdrop-blur-lg rounded-2xl p-8 max-w-2xl w-full shadow-2xl max-h-[90vh] overflow-y-auto border border-white/40"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-3xl font-bold text-white">
            {note ? 'Editar Nota' : 'Nueva Nota'}
          </h3>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 text-4xl leading-none"
          >
            ×
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          {/* Título */}
          <div className="flex flex-col gap-2">
            <label className="text-white font-medium">
              Título <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              name="titulo"
              className="rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 shadow-md transition-all"
              value={formData.titulo}
              onChange={handleChange}
              placeholder="Título de la nota"
              required
            />
          </div>

          {/* Descripción */}
          <div className="flex flex-col gap-2">
            <label className="text-white font-medium">Descripción</label>
            <textarea
              name="descripcion"
              className="rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 shadow-md transition-all resize-none"
              value={formData.descripcion}
              onChange={handleChange}
              placeholder="Escribe aquí el contenido de tu nota..."
              rows="6"
            />
          </div>

          {/* Etiqueta */}
          <div className="flex flex-col gap-2">
            <div className="flex justify-between items-center">
              <label className="text-white font-medium">Etiqueta</label>
              <button
                type="button"
                onClick={() => setShowNewTag(!showNewTag)}
                className="text-blue-300 hover:text-blue-200 font-semibold text-sm hover:underline"
              >
                {showNewTag ? 'Seleccionar existente' : '+ Nueva etiqueta'}
              </button>
            </div>

            {showNewTag ? (
              <input
                type="text"
                name="nueva_etiqueta"
                className="rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 shadow-md transition-all"
                value={formData.nueva_etiqueta}
                onChange={handleChange}
                placeholder="Nombre de la nueva etiqueta"
              />
            ) : (
              <select
                name="etiqueta_id"
                className="rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 shadow-md transition-all"
                value={formData.etiqueta_id}
                onChange={handleChange}
              >
                <option value="">Sin etiqueta</option>
                {tags && tags.map(tag => (
                  <option key={tag.id} value={tag.id}>
                    {tag.nombre}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-center gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-8 py-3 bg-gray-300 text-gray-700 rounded-xl hover:bg-gray-400 transition-all font-semibold shadow-lg"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300"
            >
              {note ? 'Actualizar' : 'Crear Nota'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default FormNotas;
