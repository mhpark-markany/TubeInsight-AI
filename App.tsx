import React, { useState, useEffect } from 'react';
import { Youtube, Sparkles, ExternalLink } from 'lucide-react';
import SearchBar from './components/SearchBar';
import VideoSummary from './components/VideoSummary';
import ChannelAnalysis from './components/ChannelAnalysis';
import HistoryList from './components/HistoryList';
import SkeletonLoader from './components/SkeletonLoader';
import { analyzeVideo } from './services/geminiService';
import * as historyService from './services/historyService';
import { VideoData, GroundingUrl, SummaryLength, SearchHistoryItem, Language } from './types';

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<VideoData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [sources, setSources] = useState<GroundingUrl[]>([]);
  
  // Input State
  const [url, setUrl] = useState('');
  const [length, setLength] = useState<SummaryLength>('medium');
  const [language, setLanguage] = useState<Language>('en');
  
  // History State
  const [history, setHistory] = useState<SearchHistoryItem[]>([]);

  useEffect(() => {
    setHistory(historyService.getHistory());
  }, []);

  const handleSearch = async () => {
    if (!url.trim()) return;

    setLoading(true);
    setError(null);
    setData(null);
    setSources([]);

    try {
      const result = await analyzeVideo(url, length, language);
      if (result.data) {
        setData(result.data);
        setSources(result.sources);
        
        // Save to history
        const updatedHistory = historyService.addToHistory({
          url,
          length,
          language,
          title: result.data.videoTitle,
          channelName: result.data.channelName
        });
        setHistory(updatedHistory);
      } else {
        setError(language === 'ko' 
          ? "동영상을 분석할 수 없습니다. URL을 확인하고 다시 시도해 주세요."
          : "Could not analyze video. Please check the URL and try again."
        );
      }
    } catch (err) {
      setError(language === 'ko'
        ? "Gemini AI와 통신 중 오류가 발생했습니다. 유효한 URL인지 확인해 주세요."
        : "An error occurred while communicating with Gemini AI. Please ensure the URL is valid."
      );
    } finally {
      setLoading(false);
    }
  };

  const handleHistorySelect = (item: SearchHistoryItem) => {
    setUrl(item.url);
    setLength(item.length);
    setLanguage(item.language || 'en'); // default fallback for old history items
    triggerSearchWithParams(item.url, item.length, item.language || 'en');
  };

  const triggerSearchWithParams = async (searchUrl: string, searchLength: SummaryLength, searchLanguage: Language) => {
    setLoading(true);
    setError(null);
    setData(null);
    setSources([]);
    
    // Update UI state to match
    setUrl(searchUrl);
    setLength(searchLength);
    setLanguage(searchLanguage);

    try {
      const result = await analyzeVideo(searchUrl, searchLength, searchLanguage);
      if (result.data) {
        setData(result.data);
        setSources(result.sources);
        
        // Update history (moves to top)
        const updatedHistory = historyService.addToHistory({
          url: searchUrl,
          length: searchLength,
          language: searchLanguage,
          title: result.data.videoTitle,
          channelName: result.data.channelName
        });
        setHistory(updatedHistory);
      } else {
        setError("Could not analyze video.");
      }
    } catch (err) {
      setError("An error occurred while communicating with Gemini AI.");
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveHistory = (id: string) => {
    setHistory(historyService.removeFromHistory(id));
  };

  const handleClearHistory = () => {
    setHistory(historyService.clearHistory());
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 text-slate-100 pb-20">
      {/* Header */}
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3 cursor-pointer" onClick={() => { setData(null); setUrl(''); }}>
            <div className="bg-gradient-to-tr from-red-600 to-red-500 p-2 rounded-lg">
              <Youtube className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
              TubeInsight AI
            </span>
          </div>
          <div className="hidden sm:flex items-center space-x-2 text-sm text-slate-400">
             <Sparkles className="w-4 h-4 text-yellow-400" />
             <span>Powered by Gemini 2.0</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* Hero Section */}
        {!data && !loading && (
          <div className="text-center mb-16 space-y-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
              YouTube Summaries, <br />
              <span className="text-blue-500">Supercharged by AI.</span>
            </h1>
            <p className="text-lg text-slate-400 max-w-2xl mx-auto">
              {language === 'ko' 
                ? '영상을 보지 않고도 핵심 요약, 채널 분석, 깊이 있는 인사이트를 즉시 확인하세요.' 
                : 'Get instant video summaries, channel analytics, and deep insights without watching hours of content.'
              }
            </p>
          </div>
        )}

        <SearchBar 
          url={url}
          length={length}
          language={language}
          onUrlChange={setUrl}
          onLengthChange={setLength}
          onLanguageChange={setLanguage}
          onSearch={handleSearch}
          isLoading={loading} 
        />

        {/* History List - Only show when no data is displayed */}
        {!data && !loading && history.length > 0 && (
          <HistoryList 
            history={history} 
            language={language}
            onSelect={handleHistorySelect} 
            onRemove={handleRemoveHistory}
            onClear={handleClearHistory}
          />
        )}
        
        {/* Loading Skeleton */}
        {loading && <SkeletonLoader />}

        {error && !loading && (
          <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-xl max-w-3xl mx-auto text-center animate-in fade-in slide-in-from-bottom-2">
            {error}
          </div>
        )}

        {data && !loading && (
          <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 space-y-8">
            {/* Title Section */}
            <div className="text-center mb-10">
              <h1 className="text-3xl font-bold text-white mb-2">{data.videoTitle}</h1>
              <p className="text-slate-400 text-lg">by <span className="text-blue-400 font-medium">{data.channelName}</span></p>
            </div>

            <VideoSummary data={data} language={language} />
            
            <ChannelAnalysis data={data} language={language} />

            {/* Sources Section */}
            {sources.length > 0 && (
              <div className="mt-12 pt-8 border-t border-slate-800">
                <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">
                  {language === 'ko' ? 'Google 검색 기반 출처' : 'Sources Grounded by Google Search'}
                </h3>
                <div className="flex flex-wrap gap-3">
                  {sources.map((source, index) => (
                    <a 
                      key={index} 
                      href={source.uri} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="flex items-center space-x-2 bg-slate-800 hover:bg-slate-700 text-slate-300 px-4 py-2 rounded-lg text-sm transition-colors border border-slate-700"
                    >
                      <span className="truncate max-w-xs">{source.title}</span>
                      <ExternalLink className="w-3 h-3 opacity-50" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
