import React, { useState } from 'react';
import { Complexity } from '../types';

interface ExamplesModalProps {
  onClose: () => void;
  t?: unknown;
}

const examples: Record<Complexity, { problem: string; tutor: string; insight: string }> = {
  Beginner: {
    problem: "Solve 2x + 6 = 14",
    tutor: "Our goal is to get x by itself. To remove the +6, what is the opposite operation of addition?",
    insight: "The tutor focuses on the very first step—inverse operations—inviting the student to identify the logic."
  },
  Intermediate: {
    problem: "Factor x² - 25",
    tutor: "Notice that x² and 25 are both perfect squares, and we are subtracting them. Does this remind you of the 'Difference of Squares' pattern?",
    insight: "Instead of giving the formula, the tutor helps the user recognize the algebraic structure of the expression."
  },
  Advanced: {
    problem: "Evaluate ∫ x ln(x) dx",
    tutor: "Standard u-substitution might be tricky here. Since we have a product of two functions, is there an integration technique that corresponds to the Product Rule for derivatives?",
    insight: "The tutor hints at 'Integration by Parts' by connecting it to prior knowledge (derivatives) rather than just naming the method."
  }
};

const ExamplesModal: React.FC<ExamplesModalProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<Complexity>('Beginner');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-indigo-600 p-6 flex justify-between items-start">
          <div>
            <h2 className="text-2xl font-bold text-white">The Socratic Method</h2>
            <p className="text-indigo-200 text-sm mt-1">Learning through guided questioning</p>
          </div>
          <button onClick={onClose} className="text-white/60 hover:text-white transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-slate-100">
          {(['Beginner', 'Intermediate', 'Advanced'] as Complexity[]).map((level) => (
            <button
              key={level}
              onClick={() => setActiveTab(level)}
              className={`flex-1 py-4 text-sm font-semibold transition-colors relative ${
                activeTab === level ? 'text-indigo-600' : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              {level}
              {activeTab === level && (
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-indigo-600 rounded-t-full" />
              )}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-8 bg-slate-50 flex-1 overflow-y-auto">
          <div className="space-y-6">
            
            {/* User Bubble */}
            <div className="flex justify-end">
              <div className="bg-indigo-500 text-white rounded-2xl rounded-tr-sm py-3 px-5 max-w-[80%] shadow-md">
                <div className="text-xs text-indigo-200 mb-1 font-medium uppercase tracking-wider">Student</div>
                <div className="font-medium">{examples[activeTab].problem}</div>
              </div>
            </div>

            {/* Tutor Bubble */}
            <div className="flex justify-start">
              <div className="bg-white border border-slate-200 text-slate-700 rounded-2xl rounded-tl-sm py-4 px-6 max-w-[90%] shadow-lg relative">
                 <div className="absolute -left-3 -top-3 bg-white p-1 rounded-full border border-slate-100 shadow-sm">
                    <span className="text-xl">🦉</span>
                 </div>
                <div className="text-xs text-slate-400 mb-2 font-medium uppercase tracking-wider flex items-center gap-1">
                   Socratic Tutor
                   <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 text-indigo-400">
                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 6a.75.75 0 0 0-1.5 0v.816a3.836 3.836 0 0 0-1.729 2.756.75.75 0 0 0 1.487.185 2.336 2.336 0 0 1 2.242-2.242V6Zm1.42 6.81a.75.75 0 0 0-1.42.48v.535a2.336 2.336 0 0 1-2.242 2.242.75.75 0 0 0 0 1.5h.75a.75.75 0 0 0 1.5 0v-.816a3.836 3.836 0 0 0 1.729-2.756.75.75 0 0 0-1.487-.185Z" clipRule="evenodd" />
                    <path d="M11.54 12.84c.07.38.16.75.28 1.11.14.4.3.79.5 1.16.2.37.44.72.7 1.05l1.04-.98c-.2-.26-.39-.53-.55-.83-.16-.3-.3-.62-.4-.95-.1-.32-.18-.65-.23-.98l-1.34.42Z" />
                   </svg>
                </div>
                <div className="text-lg leading-relaxed">{examples[activeTab].tutor}</div>
              </div>
            </div>

            {/* Insight Box */}
            <div className="mt-8 bg-amber-50 border border-amber-100 rounded-xl p-4 flex gap-4">
              <div className="text-amber-500 pt-1">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                  <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h4 className="font-bold text-amber-900 text-sm uppercase tracking-wide mb-1">Pedagogical Insight</h4>
                <p className="text-amber-800 text-sm">{examples[activeTab].insight}</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamplesModal;
