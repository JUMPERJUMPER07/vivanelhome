
import React from 'react';
import { DicomStudy } from '../types';
import { Search, Database, CheckCircle2, Eye, Calendar, Clock, GripVertical, ArrowUp, ArrowDown, ArrowUpDown } from 'lucide-react';

interface StudyListProps {
  studies: DicomStudy[];
  onSelect: (study: DicomStudy) => void;
  onDetails: (study: DicomStudy) => void;
  selectedId?: string;
  onDragStart: (study: DicomStudy) => void;
}

type SortField = 'receivedAt' | 'studyDate' | 'patientName';
type SortDirection = 'asc' | 'desc';

export const StudyList: React.FC<StudyListProps> = ({ studies, onSelect, onDetails, selectedId, onDragStart }) => {
  const [searchTerm, setSearchTerm] = React.useState('');
  const [filterModality, setFilterModality] = React.useState('');
  const [filterDateStart, setFilterDateStart] = React.useState('');
  const [filterDateEnd, setFilterDateEnd] = React.useState('');

  // Sorting State
  const [sortField, setSortField] = React.useState<SortField>('receivedAt');
  const [sortDirection, setSortDirection] = React.useState<SortDirection>('desc');

  const filteredStudies = studies.filter(study => {
    const matchesSearch =
      study.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      study.accessionNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      study.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesModality = filterModality ? study.modality === filterModality : true;

    const matchesDate =
      (!filterDateStart || study.studyDate >= filterDateStart) &&
      (!filterDateEnd || study.studyDate <= filterDateEnd);

    return matchesSearch && matchesModality && matchesDate;
  });

  const sortedStudies = [...filteredStudies].sort((a, b) => {
    let comparison = 0;
    switch (sortField) {
      case 'patientName':
        comparison = a.patientName.localeCompare(b.patientName);
        break;
      case 'studyDate':
        comparison = a.studyDate.localeCompare(b.studyDate);
        break;
      case 'receivedAt':
        comparison = a.receivedAt.localeCompare(b.receivedAt);
        break;
      default:
        comparison = 0;
    }
    return sortDirection === 'asc' ? comparison : -comparison;
  });

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) return <ArrowUpDown size={10} className="text-slate-700 group-hover:text-slate-500 transition-colors" />;
    return sortDirection === 'asc'
      ? <ArrowUp size={10} className="text-cyan-500" />
      : <ArrowDown size={10} className="text-cyan-500" />;
  };

  return (
    <div className="flex flex-col h-full bg-slate-900/0">
      {/* Toolbar */}
      <div className="p-3 border-b border-slate-800/50 flex flex-col gap-2 bg-slate-900/20 backdrop-blur-sm">
        <div className="flex gap-2">
          <div className="relative flex-1 group">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400 transition-colors" />
            <input
              type="text"
              placeholder="Buscar Paciente, Descrição..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-950/40 border border-slate-800/60 rounded-xl py-2 pl-9 pr-4 text-xs text-slate-200 focus:outline-none focus:border-cyan-500/50 focus:bg-slate-950/80 transition-all placeholder:text-slate-600 focus:ring-1 focus:ring-cyan-500/20"
            />
          </div>

          <select
            value={filterModality}
            onChange={(e) => setFilterModality(e.target.value)}
            className="bg-slate-950/40 border border-slate-800/60 rounded-xl py-2 px-3 text-xs text-slate-300 focus:outline-none focus:border-cyan-500/50 cursor-pointer hover:bg-slate-900/60 transition-colors focus:ring-1 focus:ring-cyan-500/20"
          >
            <option value="">Todos</option>
            <option value="CT">CT</option>
            <option value="MR">MR</option>
            <option value="US">US</option>
            <option value="DX">DX</option>
          </select>
        </div>
      </div>

      {/* List Header (Sticky) */}
      <div className="sticky top-0 z-10 grid grid-cols-12 gap-2 px-3 py-2 bg-slate-950 border-y border-slate-800 text-[10px] font-bold text-slate-500 uppercase tracking-wider select-none shadow-md">
        <div className="col-span-1 text-center text-slate-700">#</div>

        <div
          onClick={() => handleSort('receivedAt')}
          className="col-span-1 flex items-center gap-1 cursor-pointer hover:text-cyan-400 transition-colors group"
        >
          Hora
          <SortIcon field="receivedAt" />
        </div>

        <div
          onClick={() => handleSort('studyDate')}
          className="col-span-2 flex items-center gap-1 cursor-pointer hover:text-cyan-400 transition-colors group"
        >
          Data
          <SortIcon field="studyDate" />
        </div>

        <div
          onClick={() => handleSort('patientName')}
          className="col-span-4 flex items-center gap-1 cursor-pointer hover:text-cyan-400 transition-colors group"
        >
          Paciente / ID
          <SortIcon field="patientName" />
        </div>

        <div className="col-span-3">Descrição</div>
        <div className="col-span-1 text-center">Ações</div>
      </div>

      {/* List Content */}
      <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
        {sortedStudies.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full min-h-[200px] text-slate-600">
            <Database size={40} className="mb-3 opacity-20" />
            <p className="text-xs font-medium">Nenhum estudo encontrado</p>
            {(searchTerm || filterModality) && (
              <button
                onClick={() => { setSearchTerm(''); setFilterModality(''); }}
                className="mt-2 text-[10px] text-cyan-500 hover:text-cyan-400 hover:underline"
              >
                Limpar filtros
              </button>
            )}
          </div>
        ) : (
          <div className="pb-2">
            {sortedStudies.map((study, index) => (
              <div
                key={study.id}
                draggable
                onDragStart={(e) => {
                  e.dataTransfer.setData('application/json', JSON.stringify(study));
                  e.dataTransfer.effectAllowed = 'link';
                  onDragStart(study);
                }}
                onClick={() => onSelect(study)}
                style={{ animationDelay: `${index * 50}ms` }}
                className={`
                  grid grid-cols-12 gap-2 px-3 py-3 border-b border-slate-800/40 cursor-pointer transition-all text-xs items-center group relative
                  animate-in fade-in slide-in-from-left-4 duration-500 fill-mode-both
                  hover:bg-cyan-950/20 hover:backdrop-blur-sm
                  ${selectedId === study.id
                    ? 'bg-cyan-950/30 border-l-2 border-l-cyan-400 shadow-[inset_0_0_20px_rgba(34,211,238,0.1)]'
                    : 'border-l-2 border-l-transparent hover:border-l-cyan-500/50'}
                `}
              >
                <div className="col-span-1 flex justify-center cursor-grab text-slate-600 group-hover:text-cyan-400 transition-colors">
                  <GripVertical size={14} />
                </div>

                <div className="col-span-1 text-slate-400 font-mono tabular-nums opacity-70 group-hover:opacity-100 transition-opacity">
                  {study.receivedAt.split(':').slice(0, 2).join(':')}
                </div>

                <div className="col-span-2 flex items-center gap-2">
                  <div className="font-bold text-cyan-950 bg-cyan-400/90 px-1.5 py-0.5 rounded text-[10px] shadow-[0_0_10px_rgba(34,211,238,0.4)]">
                    {study.modality}
                  </div>
                  <span className="text-[10px] text-slate-500 tabular-nums">{study.studyDate}</span>
                </div>

                <div className="col-span-4 pr-2 min-w-0">
                  <div className="font-bold text-slate-200 truncate group-hover:text-cyan-200 transition-colors text-sm" title={study.patientName}>
                    {study.patientName}
                  </div>
                  <div className="text-[10px] text-slate-500 font-mono truncate flex items-center gap-1">
                    <span className="text-slate-600">ID:</span> {study.patientId} <span className="text-slate-700">|</span> {study.accessionNumber}
                  </div>
                </div>

                <div className="col-span-3 text-slate-400 truncate pr-2 opacity-60 group-hover:opacity-90 transition-opacity" title={study.description}>
                  {study.description || '-'}
                </div>

                <div className="col-span-1 flex justify-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onDetails(study);
                    }}
                    title="Ver Detalhes"
                    className="text-slate-600 hover:text-cyan-400 p-1.5 rounded-full hover:bg-cyan-950/50 transition-all opacity-0 group-hover:opacity-100 focus:opacity-100"
                  >
                    <Eye size={14} />
                  </button>
                  {selectedId === study.id && (
                    <CheckCircle2 size={16} className="text-cyan-400 animate-in zoom-in duration-300 drop-shadow-[0_0_8px_rgba(34,211,238,0.5)]" />
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="p-1.5 border-t border-slate-800/50 bg-slate-950/30 text-[9px] text-slate-600 text-center uppercase tracking-widest font-medium">
        Drag item to link
      </div>
    </div>
  );
};
