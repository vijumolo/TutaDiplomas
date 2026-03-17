import { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { ControlPanel } from './components/ControlPanel';
import { CyclistCard } from './components/CyclistCard';
import cyclistsData from './data/cyclists.json';
import { Users } from 'lucide-react';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('Todas');

  // Extract unique categories safely
  const categories = useMemo(() => {
    const cats = new Set(cyclistsData.map(c => c.category).filter(Boolean));
    return ['Todas', ...Array.from(cats)].sort();
  }, []);

  // Filter logic
  const filteredCyclists = useMemo(() => {
    return cyclistsData.filter((c) => {
      // Name, team or number matching
      const query = searchQuery.toLowerCase();
      const matchesSearch = 
        c.name.toLowerCase().includes(query) || 
        c.team.toLowerCase().includes(query) || 
        c.number.toString().includes(query);
      
      const matchesCategory = category === 'Todas' || c.category === category;
      
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, category]);

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-orange-200 selection:text-orange-900">
      <Header />
      
      <main className="pb-16">
        <ControlPanel 
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          category={category}
          setCategory={setCategory}
          categories={categories}
        />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mt-8">
          
          <div className="mb-6 flex items-center justify-between border-b border-slate-200 pb-4">
            <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
              <Users className="h-5 w-5 text-orange-500" />
              Resultados
            </h2>
            <span className="rounded-full bg-slate-200 px-3 py-1 text-sm font-semibold text-slate-700">
              Mostrando {filteredCyclists.length} de {cyclistsData.length} ciclistas
            </span>
          </div>

          {filteredCyclists.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredCyclists.map((cyclist) => (
                <CyclistCard key={cyclist.number} cyclist={cyclist} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-slate-200 bg-white py-20 text-center">
              <div className="rounded-full bg-orange-100 p-4 mb-4">
                <Users className="h-8 w-8 text-orange-500" />
              </div>
              <h3 className="text-lg font-bold text-slate-900">No se encontraron ciclistas</h3>
              <p className="mt-2 max-w-md text-slate-500">
                Ajusta tu búsqueda o cambia la categoría para ver más resultados.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setCategory('Todas');
                }}
                className="mt-6 rounded-full bg-slate-100 px-6 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-200 transition-colors"
              >
                Limpiar filtros
              </button>
            </div>
          )}

        </div>
      </main>

      {/* Subtle Footer */}
      <footer className="border-t border-slate-200 bg-white py-8 text-center text-sm text-slate-500">
        <p>© 2026 App Inscripciones. Todos los derechos reservados.</p>
        <p className="mt-1">
          Plataforma de Resultados y Diplomas Virtuales.
        </p>
      </footer>
    </div>
  );
}

export default App;
