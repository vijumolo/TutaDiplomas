import { MapPin, Trophy, Map, Users } from 'lucide-react';

export function Header() {
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-orange-500 via-orange-600 to-amber-600 pb-16 pt-20 px-4 text-center sm:px-6 lg:px-8 text-white shadow-lg">
      <div className="absolute inset-0 pattern-dots opacity-10"></div>
      <div className="relative mx-auto max-w-4xl flex flex-col items-center">
        
        <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-white/20 backdrop-blur-md ring-4 ring-white/30 shadow-2xl transform transition hover:scale-105">
          <Trophy className="h-10 w-10 text-white" />
        </div>
        
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl drop-shadow-md">
          XXVII CIRCUITO CICLÍSTICO NACIONAL
        </h1>
        <p className="mt-4 max-w-2xl text-xl font-medium tracking-wide text-orange-100 sm:text-2xl drop-shadow">
          "MIGUEL A. SANABRIA"
        </p>

        <div className="mt-8 flex flex-wrap justify-center gap-4 sm:gap-6">
          <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-sm border border-white/20">
            <MapPin className="h-4 w-4" />
            <span>Tuta Boyacá</span>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-sm border border-white/20">
            <Map className="h-4 w-4" />
            <span>19 Vueltas</span>
          </div>
          <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-sm border border-white/20">
            <Users className="h-4 w-4" />
            <span>42 Ciclistas</span>
          </div>
        </div>
        
      </div>
    </div>
  );
}
