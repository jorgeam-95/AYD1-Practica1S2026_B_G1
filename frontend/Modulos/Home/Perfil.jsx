import { useState, useEffect } from 'react';
import { User, Lock, Check } from 'lucide-react';
import AlertaError from '../Alertas/AlertaError';

function Perfil({ user }) {
  const [activeTab, setActiveTab] = useState('info');
  const [formData, setFormData] = useState({
    nombre: user?.nombre || '',
    email: user?.email || ''
  });
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errorText, setErrorText] = useState('');

  useEffect(() => {
    if (showSuccess) {
      const timer = setTimeout(() => setShowSuccess(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showSuccess]);

  useEffect(() => {
    if (showError) {
      const timer = setTimeout(() => setShowError(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showError]);

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    console.log('Actualizando perfil:', formData);
    setShowSuccess(true);
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setErrorText('Las contraseñas no coinciden');
      setShowError(true);
      return;
    }

    if (passwordData.newPassword.length < 6) {
      setErrorText('La contraseña debe tener al menos 6 caracteres');
      setShowError(true);
      return;
    }

    console.log('Cambiando contraseña');
    setShowSuccess(true);
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  return (
    <div className="w-full h-full bg-gradient-to-br from-green-300 via-blue-400 to-purple-500 p-8 overflow-y-auto">
      <div className="max-w-4xl mx-auto">
        
        {/* Alerts */}
        {showSuccess && (
          <div className="fixed top-40 left-1/2 -translate-x-1/2 z-50">
            <div className="inline-flex items-center gap-x-3 px-6 py-3 bg-green-100 rounded-xl text-green-800 shadow-2xl">
              <Check size={24} />
              <span className="font-semibold">Cambios guardados exitosamente</span>
            </div>
          </div>
        )}

        {showError && (
          <div className="fixed top-40 left-1/2 -translate-x-1/2 z-50">
            <AlertaError texto={errorText} />
          </div>
        )}

        {/* Header */}
        <div className="bg-white/30 backdrop-blur-lg rounded-2xl shadow-2xl p-8 mb-8 flex items-center gap-6 border border-white/40">
          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 text-white text-4xl font-bold flex items-center justify-center shadow-xl">
            {user?.nombre?.charAt(0).toUpperCase()}
          </div>
          <div>
            <h1 className="text-4xl font-bold text-white drop-shadow-lg">{user?.nombre}</h1>
            <p className="text-white/80 text-lg">{user?.email}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-3 mb-8">
          <button
            onClick={() => setActiveTab('info')}
            className={`px-8 py-3 font-semibold rounded-xl transition-all duration-300 shadow-lg flex items-center gap-2 ${
              activeTab === 'info'
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white scale-105'
                : 'bg-white/30 backdrop-blur-md text-white hover:bg-white/40'
            }`}
          >
            <User size={20} />
            Información Personal
          </button>
          <button
            onClick={() => setActiveTab('password')}
            className={`px-8 py-3 font-semibold rounded-xl transition-all duration-300 shadow-lg flex items-center gap-2 ${
              activeTab === 'password'
                ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white scale-105'
                : 'bg-white/30 backdrop-blur-md text-white hover:bg-white/40'
            }`}
          >
            <Lock size={20} />
            Cambiar Contraseña
          </button>
        </div>

        {/* Content */}
        <div className="bg-white/30 backdrop-blur-lg rounded-2xl shadow-2xl p-8 border border-white/40">
          {activeTab === 'info' && (
            <form onSubmit={handleUpdateProfile} className="flex flex-col gap-6">
              <h2 className="text-3xl font-bold text-white mb-4">
                Información Personal
              </h2>

              <div className="flex flex-col gap-2">
                <label className="text-white font-medium">Nombre completo</label>
                <input
                  type="text"
                  className="rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 shadow-md transition-all"
                  value={formData.nombre}
                  onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-white font-medium">Email</label>
                <input
                  type="email"
                  className="rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 shadow-md transition-all"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <button
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300 mt-4 flex items-center justify-center gap-2"
              >
                <Check size={20} />
                Guardar Cambios
              </button>
            </form>
          )}

          {activeTab === 'password' && (
            <form onSubmit={handleChangePassword} className="flex flex-col gap-6">
              <h2 className="text-3xl font-bold text-white mb-4">
                Cambiar Contraseña
              </h2>

              <div className="flex flex-col gap-2">
                <label className="text-white font-medium">Contraseña actual</label>
                <input
                  type="password"
                  className="rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 shadow-md transition-all"
                  value={passwordData.currentPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, currentPassword: e.target.value })}
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-white font-medium">Nueva contraseña</label>
                <input
                  type="password"
                  className="rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 shadow-md transition-all"
                  value={passwordData.newPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })}
                  required
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-white font-medium">Confirmar nueva contraseña</label>
                <input
                  type="password"
                  className="rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 shadow-md transition-all"
                  value={passwordData.confirmPassword}
                  onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })}
                  required
                />
              </div>

              <button
                type="submit"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-3 rounded-xl font-semibold shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300 mt-4 flex items-center justify-center gap-2"
              >
                <Check size={20} />
                Cambiar Contraseña
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

export default Perfil;
