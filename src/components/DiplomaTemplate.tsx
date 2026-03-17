import { forwardRef } from 'react';
import { Trophy, Medal, MapPin, Clock } from 'lucide-react';

interface DiplomaProps {
  cyclist: {
    position: number;
    number: number;
    name: string;
    team: string;
    category: string;
    laps: number;
    time: string;
  };
}

export const DiplomaTemplate = forwardRef<HTMLDivElement, DiplomaProps>(({ cyclist }, ref) => {
  return (
    <div 
      ref={ref}
      // Fixed large size for the PDF/Image generation: like a standard landscape certificate
      className="absolute top-0 left-[-9999px] w-[1123px] h-[794px] bg-white flex flex-col items-center justify-center font-sans overflow-hidden"
    >
      {/* Background gradients and abstract shapes */}
      <div className="absolute inset-0 bg-gradient-to-br from-amber-50 via-white to-orange-50 z-0"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-orange-400 opacity-20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-amber-500 opacity-10 rounded-full blur-3xl translate-y-1/4 -translate-x-1/4"></div>
      
      {/* Elegant Border */}
      <div className="absolute inset-6 border-[8px] border-double border-orange-200 z-10 rounded-2xl"></div>

      {/* Main Content Container */}
      <div className="relative z-20 w-full px-24 text-center">
        
        <div className="flex flex-col items-center justify-center mb-10">
          <div className="w-24 h-24 bg-gradient-to-br from-orange-500 to-amber-600 rounded-full flex items-center justify-center shadow-xl border-4 border-white">
            <Trophy className="w-12 h-12 text-white" />
          </div>
          <h1 className="mt-8 text-6xl font-black text-slate-800 tracking-tight uppercase">
            Certificado de Participación
          </h1>
          <p className="mt-4 text-2xl font-medium text-orange-600 tracking-widest">
            XXVII CIRCUITO CICLÍSTICO NACIONAL "MIGUEL A. SANABRIA"
          </p>
        </div>

        <p className="text-xl text-slate-500 italic mb-6">Otorgado a:</p>
        
        <h2 className="text-5xl font-extrabold text-slate-900 border-b-2 border-orange-200 inline-block pb-2 mb-10">
          {cyclist.name}
        </h2>

        <div className="grid grid-cols-2 gap-x-12 gap-y-6 max-w-4xl mx-auto text-left bg-white/60 backdrop-blur-md rounded-3xl p-8 border border-white/50 shadow-sm">
          
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
              <span className="font-bold text-orange-600">Nº</span>
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium uppercase tracking-wider">Dorsal</p>
              <p className="text-2xl font-bold text-slate-800">{cyclist.number}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
              <Medal className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium uppercase tracking-wider">Posición y Categoría</p>
              <p className="text-2xl font-bold text-slate-800">#{cyclist.position} - {cyclist.category}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
              <MapPin className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium uppercase tracking-wider">Equipo / Club</p>
              <p className="text-2xl font-bold text-slate-800 truncate" style={{maxWidth: '300px'}}>{cyclist.team}</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
              <Clock className="w-6 h-6 text-orange-600" />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-medium uppercase tracking-wider">Tiempo ({cyclist.laps} Laps)</p>
              <p className="text-2xl font-bold text-slate-800">{cyclist.time}</p>
            </div>
          </div>

        </div>

        <div className="mt-16 flex justify-between items-center px-12 opacity-80">
          <div className="text-center">
            <div className="w-48 border-b-2 border-slate-300 mx-auto mb-2"></div>
            <p className="text-sm font-bold text-slate-600">Firma Autorizada</p>
          </div>
          <div className="text-center">
            <div className="w-48 mx-auto mb-2 font-bold text-xl text-slate-800">
              Tuta, Boyacá
            </div>
            <p className="text-sm font-bold text-slate-600">Lugar del Evento</p>
          </div>
        </div>

      </div>
    </div>
  );
});

DiplomaTemplate.displayName = 'DiplomaTemplate';
