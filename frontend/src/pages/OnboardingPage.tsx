import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Building2, Mail, Lock, User, Globe, Loader2, ArrowRight } from 'lucide-react';
import { apiService } from '../services/api';
import { RegistrationRequest } from '../types';

export function OnboardingPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { register, handleSubmit, formState: { errors }, watch } = useForm<RegistrationRequest>();
  const watchedSubdomain = watch('subdomain');

  const onSubmit = async (data: RegistrationRequest) => {
    setIsLoading(true);
    setError(null);
    try {
      const authResponse = await apiService.register(data);
      apiService.setAuthData(authResponse);
      navigate('/web-builder');
    } catch (err: any) {
      setError(err.response?.data?.message || 'El registro falló. Por favor intenta de nuevo.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#1a0b08] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Fondo con Luces de ambiente (Futurista) */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-orange-900/20 rounded-full blur-[120px]" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-900/20 rounded-full blur-[120px]" />

      <div className="backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl shadow-2xl p-8 w-full max-w-xl relative z-10">
        <div className="text-center mb-10">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-tr from-orange-500 to-rose-600 rounded-2xl rotate-12 mb-6 shadow-lg shadow-orange-500/20">
            <Building2 className="w-10 h-10 text-white -rotate-12" />
          </div>
          <h1 className="text-4xl font-extrabold text-white tracking-tight mb-2">Bienvenido a SaaS Core</h1>
          <p className="text-orange-100/60 font-light">Configura tu espacio de trabajo empresarial</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-xl">
            <p className="text-red-400 text-sm text-center font-medium">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Empresa */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-orange-200/50 uppercase tracking-wider ml-1">Empresa</label>
              <div className="relative group">
                <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-orange-200/30 group-focus-within:text-orange-400 transition-colors" />
                <input
                  {...register('companyName', { required: 'El nombre es obligatorio' })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-transparent transition-all"
                  placeholder="Nombre de la empresa"
                />
              </div>
            </div>

            {/* Subdominio */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-orange-200/50 uppercase tracking-wider ml-1">Subdominio</label>
              <div className="relative group">
                <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-orange-200/30 group-focus-within:text-orange-400 transition-colors" />
                <input
                  {...register('subdomain', { required: 'El subdominio es obligatorio' })}
                  className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all"
                  placeholder="mi-empresa"
                />
              </div>
            </div>
          </div>

          {/* Email */}
          <div className="space-y-2">
            <label className="text-xs font-semibold text-orange-200/50 uppercase tracking-wider ml-1">Correo Electrónico</label>
            <div className="relative group">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-orange-200/30 group-focus-within:text-orange-400 transition-colors" />
              <input
                {...register('email', { required: 'Email obligatorio' })}
                type="email"
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all"
                placeholder="admin@ejemplo.com"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-orange-200/50 uppercase tracking-wider ml-1">Nombre</label>
              <input
                {...register('firstName')}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all"
                placeholder="Nombre"
              />
            </div>
            <div className="space-y-2">
              <label className="text-xs font-semibold text-orange-200/50 uppercase tracking-wider ml-1">Apellido</label>
              <input
                {...register('lastName')}
                className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all"
                placeholder="Apellido"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-semibold text-orange-200/50 uppercase tracking-wider ml-1">Contraseña</label>
            <div className="relative group">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-orange-200/30 group-focus-within:text-orange-400 transition-colors" />
              <input
                {...register('password', { required: 'Contraseña obligatoria' })}
                type="password"
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-12 pr-4 py-3 text-white placeholder:text-white/20 focus:outline-none focus:ring-2 focus:ring-orange-500/50 transition-all"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-orange-500 to-rose-600 text-white py-4 rounded-xl font-bold text-lg hover:shadow-[0_0_20px_rgba(244,63,94,0.4)] disabled:opacity-50 disabled:shadow-none transition-all flex items-center justify-center group"
          >
            {isLoading ? (
              <Loader2 className="w-6 h-6 animate-spin" />
            ) : (
              <>
                Crear Cuenta
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </>
            )}
          </button>
        </form>

        <div className="mt-8 text-center">
          <p className="text-orange-100/40 text-sm">
            ¿Ya tienes una cuenta?{' '}
            <button className="text-orange-400 hover:text-orange-300 font-semibold transition-colors">
              Inicia sesión aquí
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}