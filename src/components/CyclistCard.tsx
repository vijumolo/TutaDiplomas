import { useState } from 'react';
import { Download, Medal, Clock, RefreshCw, Briefcase, Award } from 'lucide-react';
import { generatePdfDiploma } from '../utils/pdfGenerator';

interface CyclistProps {
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

export function CyclistCard({ cyclist }: CyclistProps) {
  const [downloading, setDownloading] = useState(false);

  const isTop3 = cyclist.position <= 3;
  
  const getMedalColor = (pos: number) => {
    switch(pos) {
      case 1: return "text-yellow-500";
      case 2: return "text-slate-400";
      case 3: return "text-amber-700";
      default: return "text-slate-300";
    }
  };

  const getRankStyle = (pos: number) => {
    switch(pos) {
      case 1: return "bg-yellow-100/50 border-yellow-300";
      case 2: return "bg-slate-100/50 border-slate-300";
      case 3: return "bg-orange-100/50 border-orange-300";
      default: return "bg-slate-50 border-slate-200";
    }
  };

  const handleDownload = async () => {
    setDownloading(true);
    
    try {
      const pdfBlob = await generatePdfDiploma(cyclist);
      
      const url = window.URL.createObjectURL(pdfBlob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Diploma_${cyclist.name.replace(/\s+/g, '_')}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      console.error('Error generating diploma:', err);
      alert('Hubo un error al generar tu diploma.');
    } finally {
      setTimeout(() => {
        setDownloading(false);
      }, 500);
    }
  };

  return (
    <>
      <div className={`group relative flex flex-col overflow-hidden rounded-2xl border ${getRankStyle(cyclist.position)} transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-white glass-card`}>
        {/* Top Banner */}
        <div className={`flex items-center justify-between px-5 py-3 border-b border-black/5 ${isTop3 ? 'bg-white/40 backdrop-blur-md' : 'bg-slate-50'}`}>
          <div className="flex items-center gap-2">
            {isTop3 ? (
              <Medal className={`h-6 w-6 ${getMedalColor(cyclist.position)} drop-shadow-sm`} />
            ) : (
              <Award className="h-5 w-5 text-slate-400" />
            )}
            <span className={`text-lg font-bold ${isTop3 ? 'text-slate-800' : 'text-slate-600'}`}>
              #{cyclist.position}
            </span>
          </div>
          <div className="rounded-full bg-slate-200/80 px-3 py-1 text-xs font-semibold text-slate-600">
            Nº {cyclist.number}
          </div>
        </div>

        {/* Main Info */}
        <div className="flex flex-1 flex-col p-5">
          <h3 className="text-xl font-bold leading-tight text-slate-900 mb-1 group-hover:text-orange-600 transition-colors">
            {cyclist.name}
          </h3>
          
          <div className="mt-2 text-sm font-medium text-amber-600 flex items-center gap-1.5 bg-amber-50 self-start px-2 py-0.5 rounded-full">
            <span>{cyclist.category}</span>
          </div>

          <div className="mt-4 flex flex-col gap-2.5">
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Briefcase className="h-4 w-4 text-slate-400" />
              <span className="font-medium truncate" title={cyclist.team}>{cyclist.team}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <Clock className="h-4 w-4 text-slate-400" />
              <span className="font-medium">{cyclist.time}</span>
            </div>
            <div className="flex items-center gap-2 text-sm text-slate-600">
              <RefreshCw className="h-4 w-4 text-slate-400" />
              <span className="font-medium">{cyclist.laps} Vueltas</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="p-5 pt-0 mt-auto">
          <button
            onClick={handleDownload}
            disabled={downloading}
            className={`w-full flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-bold transition-all duration-300 ${
              downloading 
                ? 'bg-slate-200 text-slate-500 cursor-wait'
                : 'bg-gradient-to-r from-orange-500 to-amber-500 text-white hover:from-orange-600 hover:to-amber-600 shadow-md hover:shadow-lg active:scale-[0.98]'
            }`}
          >
            {downloading ? (
              <span className="animate-pulse flex items-center gap-2">Generando Diploma...</span>
            ) : (
              <>
                <Download className="h-4 w-4" />
                Descargar Diploma
              </>
            )}
          </button>
        </div>
      </div>
    </>
  );
}
