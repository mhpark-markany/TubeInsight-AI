import React from 'react';
import { Search, Loader2, AlignLeft, AlignCenter, AlignJustify, Globe } from 'lucide-react';
import { SummaryLength, Language } from '../types';

interface SearchBarProps {
  url: string;
  length: SummaryLength;
  language: Language;
  onUrlChange: (url: string) => void;
  onLengthChange: (length: SummaryLength) => void;
  onLanguageChange: (lang: Language) => void;
  onSearch: () => void;
  isLoading: boolean;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  url, 
  length, 
  language,
  onUrlChange, 
  onLengthChange, 
  onLanguageChange,
  onSearch, 
  isLoading 
}) => {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      onSearch();
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto mb-10">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative group">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-slate-400 group-focus-within:text-blue-500 transition-colors" />
          </div>
          <input
            type="url"
            value={url}
            onChange={(e) => onUrlChange(e.target.value)}
            placeholder={language === 'ko' ? "유튜브 동영상 URL을 입력하세요..." : "Paste YouTube Video URL here..."}
            className="block w-full pl-12 pr-32 py-4 bg-slate-800 border border-slate-700 rounded-2xl text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all shadow-lg hover:bg-slate-750"
            required
          />
          <button
            type="submit"
            disabled={isLoading}
            className="absolute right-2 top-2 bottom-2 bg-blue-600 hover:bg-blue-500 text-white font-medium rounded-xl px-6 transition-colors flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? (
              <>
                <Loader2 className="animate-spin h-4 w-4 mr-2" />
                {language === 'ko' ? '분석 중...' : 'Analyzing'}
              </>
            ) : (
              language === 'ko' ? '요약하기' : 'Summarize'
            )}
          </button>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-4">
          {/* Summary Length Selector */}
          <div className="flex items-center space-x-2 text-sm text-slate-400 bg-slate-800/50 p-2 rounded-xl border border-slate-700/50">
            <span className="mr-2 font-medium text-slate-500">{language === 'ko' ? '요약 길이:' : 'Length:'}</span>
            
            <button
              type="button"
              onClick={() => onLengthChange('short')}
              className={`flex items-center px-3 py-1.5 rounded-lg transition-all ${
                length === 'short' 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'hover:bg-slate-700 text-slate-300'
              }`}
            >
              <AlignLeft className="w-4 h-4 mr-1.5" />
              {language === 'ko' ? '짧게' : 'Short'}
            </button>
            
            <button
              type="button"
              onClick={() => onLengthChange('medium')}
              className={`flex items-center px-3 py-1.5 rounded-lg transition-all ${
                length === 'medium' 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'hover:bg-slate-700 text-slate-300'
              }`}
            >
              <AlignCenter className="w-4 h-4 mr-1.5" />
              {language === 'ko' ? '중간' : 'Medium'}
            </button>
            
            <button
              type="button"
              onClick={() => onLengthChange('long')}
              className={`flex items-center px-3 py-1.5 rounded-lg transition-all ${
                length === 'long' 
                  ? 'bg-blue-600 text-white shadow-md' 
                  : 'hover:bg-slate-700 text-slate-300'
              }`}
            >
              <AlignJustify className="w-4 h-4 mr-1.5" />
              {language === 'ko' ? '길게' : 'Long'}
            </button>
          </div>

          {/* Language Selector */}
          <div className="flex items-center space-x-2 text-sm text-slate-400 bg-slate-800/50 p-2 rounded-xl border border-slate-700/50">
            <Globe className="w-4 h-4 text-slate-500 ml-1" />
            
            <button
              type="button"
              onClick={() => onLanguageChange('en')}
              className={`px-3 py-1.5 rounded-lg transition-all font-medium ${
                language === 'en' 
                  ? 'bg-slate-600 text-white shadow-md' 
                  : 'hover:bg-slate-700 text-slate-400'
              }`}
            >
              EN
            </button>
            
            <button
              type="button"
              onClick={() => onLanguageChange('ko')}
              className={`px-3 py-1.5 rounded-lg transition-all font-medium ${
                language === 'ko' 
                  ? 'bg-slate-600 text-white shadow-md' 
                  : 'hover:bg-slate-700 text-slate-400'
              }`}
            >
              한국어
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
