import React from 'react';
import { Clock, Trash2, ArrowRight, History } from 'lucide-react';
import { SearchHistoryItem, Language } from '../types';

interface HistoryListProps {
  history: SearchHistoryItem[];
  language?: Language;
  onSelect: (item: SearchHistoryItem) => void;
  onRemove: (id: string) => void;
  onClear: () => void;
}

const HistoryList: React.FC<HistoryListProps> = ({ history, language = 'en', onSelect, onRemove, onClear }) => {
  if (history.length === 0) return null;

  const isKo = language === 'ko';

  return (
    <div className="w-full max-w-3xl mx-auto mt-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex items-center justify-between mb-4 px-2">
        <h3 className="text-slate-400 text-sm font-semibold uppercase tracking-wider flex items-center">
          <History className="w-4 h-4 mr-2" />
          {isKo ? '최근 분석 기록' : 'Recent Analyses'}
        </h3>
        <button 
          onClick={onClear}
          className="text-xs text-slate-500 hover:text-red-400 transition-colors"
        >
          {isKo ? '기록 삭제' : 'Clear History'}
        </button>
      </div>
      
      <div className="space-y-3">
        {history.map((item) => (
          <div 
            key={item.id}
            className="group flex items-center justify-between bg-slate-800/50 hover:bg-slate-800 border border-slate-700/50 hover:border-slate-600 rounded-xl p-3 transition-all cursor-pointer"
            onClick={() => onSelect(item)}
          >
            <div className="flex items-center space-x-3 overflow-hidden">
              <div className="flex-shrink-0 w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center text-slate-400">
                <Clock className="w-5 h-5" />
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-slate-200 truncate pr-4">
                  {item.title || item.url}
                </p>
                <div className="flex items-center space-x-2 mt-0.5">
                  <span className="text-xs text-blue-400 font-medium truncate">
                    {item.channelName}
                  </span>
                  <span className="text-slate-600 text-[10px]">•</span>
                  <span className={`text-[10px] px-1.5 py-0.5 rounded uppercase font-bold ${
                    item.length === 'short' ? 'bg-emerald-900/50 text-emerald-400' :
                    item.length === 'medium' ? 'bg-blue-900/50 text-blue-400' :
                    'bg-purple-900/50 text-purple-400'
                  }`}>
                    {item.length}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-2 pl-3">
               <button
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove(item.id);
                }}
                className="p-2 text-slate-500 hover:text-red-400 hover:bg-slate-700/50 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                title={isKo ? "기록에서 삭제" : "Remove from history"}
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <div className="p-2 text-slate-500 group-hover:text-blue-400 transition-colors">
                <ArrowRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HistoryList;
