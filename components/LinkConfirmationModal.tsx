
import React, { useState, useEffect } from 'react';
import { DicomStudy, WorklistItem } from '../types';
import { X, ArrowRight, AlertTriangle, CheckCircle2, User, Calendar, FileText, Loader2, Database, Wifi } from 'lucide-react';

interface LinkConfirmationModalProps {
  study: DicomStudy;
  worklistItem: WorklistItem;
  onConfirm: () => void;
  onCancel: () => void;
}

export const LinkConfirmationModal: React.FC<LinkConfirmationModalProps> = ({
  study,
  worklistItem,
  onConfirm,
  onCancel
}) => {
  const [status, setStatus] = useState<'idle' | 'processing' | 'completed'>('idle');
  const [progress, setProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState('Iniciando transferência...');

  // Normalization for comparison
  const normalize = (str: string) => str.toLowerCase().replace(/[^a-z0-9]/g, '');

  const namesMatch = normalize(study.patientName) === normalize(worklistItem.patientName);
  const dobMatch = study.birthDate === worklistItem.birthDate;

  const hasDiscrepancy = !namesMatch || !dobMatch;

  // Animation Logic
  useEffect(() => {
    if (status === 'processing') {
      const interval = setInterval(() => {
        setProgress((prev) => {
          const next = prev + (Math.random() * 3); // Random increment for realism

          if (next >= 100) {
            clearInterval(interval);
            setStatus('completed');
            return 100;
          }

          // Update messages based on progress
          if (next > 20 && next < 50) setStatusMessage('Sincronizando Tags DICOM...');
          if (next >= 50 && next < 80) setStatusMessage('Atualizando RIS Worklist...');
          if (next >= 80) setStatusMessage('Finalizando vínculo...');

          return next;
        });
      }, 50); // Speed of update

      return () => clearInterval(interval);
    }
  }, [status]);

  // Handle completion
  useEffect(() => {
    if (status === 'completed') {
      const timer = setTimeout(() => {
        onConfirm();
      }, 800); // Wait a bit at 100% before closing
      return () => clearTimeout(timer);
    }
  }, [status, onConfirm]);

  const handleConfirmClick = () => {
    setStatus('processing');
  };

  // SVG Configuration for Circle
  const radius = 60;
  const stroke = 8;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="w-full max-w-4xl bg-slate-900 border border-slate-700 rounded-xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh] relative">

        {/* --- PROCESSING VIEW --- */}
        {status !== 'idle' && (
          <div className="absolute inset-0 z-20 bg-slate-950 flex flex-col items-center justify-center animate-in fade-in duration-300">

            {/* Data Transfer Viz */}
            <div className="relative w-full max-w-lg mb-8">
              <div className="flex justify-between items-center mb-2 px-1">
                <span className="text-[10px] font-bold text-cyan-500 uppercase tracking-widest">Source: PACS</span>
                <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest">Dest: RIS</span>
              </div>

              {/* Progress Bar Container */}
              <div className="h-2 bg-slate-900 rounded-full overflow-hidden relative border border-slate-800">
                <div
                  className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-indigo-500 transition-all duration-100 ease-out relative"
                  style={{ width: `${progress}%` }}
                >
                  <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_0%,rgba(255,255,255,0.5)_50%,transparent_100%)] w-full h-full animate-[shimmer_1s_infinite]"></div>
                </div>
              </div>

              {/* Data Stream Code Effect */}
              <div className="mt-4 h-32 bg-slate-900/50 rounded-lg border border-slate-800 p-3 font-mono text-[10px] text-slate-400 overflow-hidden relative">
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-transparent to-slate-900/80"></div>
                <div className="space-y-1 opacity-70">
                  <p>&gt; INIT_TRANSFER_SEQUENCE --Target: {worklistItem.accessionNumber}</p>
                  <p>&gt; AUTH_HANDSHAKE: OK [Token: verified]</p>
                  {progress > 20 && <p className="text-cyan-400">&gt; FETCHING_STUDY_UID: {study.studyInstanceUID}...</p>}
                  {progress > 40 && <p className="text-blue-400">&gt; TRANSFORMING_METADATA [Encoding: UTF-8]...</p>}
                  {progress > 60 && <p>&gt; SYNCING_RIS_WORKLIST [Status: PENDING]...</p>}
                  {progress > 80 && <p className="text-indigo-400">&gt; FINALIZING_COMMIT_TRANSACTION...</p>}
                  {progress >= 100 && <p className="text-emerald-400 font-bold">&gt; OPERATION_COMPLETE_SUCCESSFULLY</p>}
                </div>
              </div>
            </div>

            <div className="text-center space-y-2">
              <h3 className="text-xl font-bold text-white tracking-wide animate-pulse flex items-center justify-center gap-2">
                {status === 'completed' && <CheckCircle2 className="text-emerald-500" />}
                {status === 'completed' ? 'Transferência Concluída' : 'Processando Vínculo...'}
              </h3>
              <p className="text-slate-400 font-mono text-sm uppercase tracking-widest flex items-center justify-center gap-2">
                {status !== 'completed' && <Loader2 size={12} className="animate-spin text-cyan-500" />}
                {statusMessage} <span className="text-slate-600">|</span> {Math.round(progress)}%
              </p>
            </div>
          </div>
        )}

        {/* --- CONFIRMATION VIEW (IDLE) --- */}
        <div className={status !== 'idle' ? 'opacity-0 pointer-events-none' : 'opacity-100'}>
          {/* Header */}
          <div className="p-5 border-b border-slate-800 flex justify-between items-center bg-slate-950/50">
            <div>
              <h2 className="text-xl font-bold text-white flex items-center gap-2">
                Confirmação de Vínculo
              </h2>
              <p className="text-slate-400 text-sm mt-1">
                Verifique os dados do paciente antes de vincular as imagens ao pedido.
              </p>
            </div>
            <button
              onClick={onCancel}
              className="p-2 hover:bg-slate-800 rounded-full text-slate-500 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto">

            {hasDiscrepancy && (
              <div className="mb-6 bg-red-500/10 border border-red-500/20 rounded-lg p-4 flex gap-3 items-start">
                <AlertTriangle className="text-red-500 shrink-0 mt-0.5" size={20} />
                <div>
                  <h4 className="text-red-400 font-bold text-sm">Atenção: Discrepância de Dados Detectada</h4>
                  <p className="text-red-300/80 text-xs mt-1">
                    Os dados do paciente no PACS não correspondem exatamente aos dados do pedido no RIS.
                    Verifique cuidadosamente antes de prosseguir.
                  </p>
                </div>
              </div>
            )}

            <div className="flex flex-col md:flex-row gap-4 items-stretch justify-between relative">

              {/* PACS Card */}
              <div className="flex-1 bg-slate-950 rounded-lg border border-slate-800 p-5 relative group">
                <div className="absolute top-0 left-0 w-full h-1 bg-cyan-500 rounded-t-lg" />
                <div className="mb-4 flex justify-between items-center">
                  <span className="text-xs font-bold text-cyan-500 uppercase tracking-wider bg-cyan-500/10 px-2 py-1 rounded">
                    Origem (PACS)
                  </span>
                  <span className="text-xs text-slate-500 font-mono">{study.receivedAt}</span>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] uppercase text-slate-500 font-bold mb-1 block flex items-center gap-1">
                      <User size={10} /> Paciente
                    </label>
                    <div className={`text-base font-medium truncate p-2 rounded ${!namesMatch ? 'bg-red-500/10 text-red-300 border border-red-500/30' : 'bg-slate-900 text-slate-200'}`}>
                      {study.patientName}
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] uppercase text-slate-500 font-bold mb-1 block flex items-center gap-1">
                      <Calendar size={10} /> Data de Nascimento
                    </label>
                    <div className={`text-sm font-mono p-2 rounded ${!dobMatch ? 'bg-red-500/10 text-red-300 border border-red-500/30' : 'bg-slate-900 text-slate-300'}`}>
                      {study.birthDate}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-800/50">
                    <div>
                      <label className="text-[10px] text-slate-500 block">Modalidade</label>
                      <div className="text-sm text-slate-300 font-bold">{study.modality}</div>
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-500 block">Data Exame</label>
                      <div className="text-sm text-slate-300">{study.studyDate}</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Arrow Divider */}
              <div className="flex items-center justify-center md:px-2">
                <div className="bg-slate-800 p-2 rounded-full border border-slate-700 shadow-xl z-10">
                  <ArrowRight size={24} className="text-slate-400" />
                </div>
                <div className="absolute top-1/2 left-4 right-4 h-px bg-slate-800 -z-0 hidden md:block" />
              </div>

              {/* RIS Card */}
              <div className="flex-1 bg-slate-950 rounded-lg border border-slate-800 p-5 relative">
                <div className="absolute top-0 left-0 w-full h-1 bg-indigo-500 rounded-t-lg" />
                <div className="mb-4 flex justify-between items-center">
                  <span className="text-xs font-bold text-indigo-500 uppercase tracking-wider bg-indigo-500/10 px-2 py-1 rounded">
                    Destino (RIS)
                  </span>
                  <span className="text-xs text-slate-500">{worklistItem.status}</span>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="text-[10px] uppercase text-slate-500 font-bold mb-1 block flex items-center gap-1">
                      <User size={10} /> Paciente
                    </label>
                    <div className={`text-base font-medium truncate p-2 rounded ${!namesMatch ? 'bg-red-500/10 text-red-300 border border-red-500/30' : 'bg-slate-900 text-slate-200'}`}>
                      {worklistItem.patientName}
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] uppercase text-slate-500 font-bold mb-1 block flex items-center gap-1">
                      <Calendar size={10} /> Data de Nascimento
                    </label>
                    <div className={`text-sm font-mono p-2 rounded ${!dobMatch ? 'bg-red-500/10 text-red-300 border border-red-500/30' : 'bg-slate-900 text-slate-300'}`}>
                      {worklistItem.birthDate}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 pt-2 border-t border-slate-800/50">
                    <div>
                      <label className="text-[10px] text-slate-500 block">Procedimento</label>
                      <div className="text-sm text-slate-300 truncate" title={worklistItem.procedure}>{worklistItem.procedure}</div>
                    </div>
                    <div>
                      <label className="text-[10px] text-slate-500 block">Data Agendada</label>
                      <div className="text-sm text-slate-300">{worklistItem.scheduledTime}</div>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            <div className="mt-8 flex items-center justify-center text-xs text-slate-500">
              <FileText size={12} className="mr-1" />
              A imagem será vinculada permanentemente ao Accession Number <span className="text-indigo-400 font-mono ml-1">{worklistItem.accessionNumber}</span>
            </div>

          </div>

          {/* Footer */}
          <div className="p-5 border-t border-slate-800 bg-slate-950/50 flex justify-end gap-3">
            <button
              onClick={onCancel}
              className="px-4 py-2 text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={handleConfirmClick}
              className={`
                px-6 py-2 text-sm font-bold text-white rounded-lg shadow-lg flex items-center gap-2 transition-all
                ${hasDiscrepancy
                  ? 'bg-red-600 hover:bg-red-500 shadow-red-900/20'
                  : 'bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 shadow-cyan-900/20'
                }
              `}
            >
              <CheckCircle2 size={16} />
              {hasDiscrepancy ? 'Confirmar Mesmo Assim' : 'Confirmar Vínculo'}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
