import React from 'react';
import { FileText, Tag, BarChart3, Clock, PlayCircle } from 'lucide-react';
import { VideoData, Language } from '../types';

interface VideoSummaryProps {
  data: VideoData;
  language?: Language;
}

const VideoSummary: React.FC<VideoSummaryProps> = ({ data, language = 'en' }) => {
  const isKo = language === 'ko';

  const formatDate = (dateStr: string) => {
    if (!dateStr) return isKo ? '알 수 없음' : 'Unknown';

    // Regex to check for YYYY-MM-DD format
    const isoDateRegex = /^\d{4}-\d{2}-\d{2}$/;
    
    if (isoDateRegex.test(dateStr)) {
      try {
        const [year, month, day] = dateStr.split('-').map(Number);
        // Create date object (month is 0-indexed in JS Date)
        const date = new Date(year, month - 1, day);
        
        return new Intl.DateTimeFormat(isKo ? 'ko-KR' : 'en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }).format(date);
      } catch (e) {
        return dateStr;
      }
    }
    return dateStr;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Main Content Column */}
      <div className="lg:col-span-2 space-y-6">
        
        {/* Summary Card */}
        <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 shadow-xl">
          <div className="flex items-center mb-4 text-blue-400">
            <FileText className="w-5 h-5 mr-2" />
            <h2 className="text-lg font-semibold uppercase tracking-wider">
              {isKo ? '동영상 요약' : 'Video Summary'}
            </h2>
          </div>
          <p className="text-slate-300 leading-relaxed text-lg whitespace-pre-wrap">
            {data.summary}
          </p>
          
          <div className="mt-6 pt-6 border-t border-slate-700">
            <h3 className="text-sm font-semibold text-slate-400 mb-3 flex items-center">
               <Tag className="w-4 h-4 mr-2" /> 
               {isKo ? '핵심 키워드' : 'Key Topics'}
            </h3>
            <div className="flex flex-wrap gap-2">
              {data.keyTopics.map((topic, index) => (
                <span key={index} className="px-3 py-1 bg-slate-700 text-slate-200 rounded-full text-sm hover:bg-slate-600 transition-colors cursor-default border border-slate-600">
                  #{topic}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Timestamps Card */}
        {data.timestamps && data.timestamps.length > 0 && (
          <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 shadow-xl">
            <div className="flex items-center mb-4 text-emerald-400">
              <Clock className="w-5 h-5 mr-2" />
              <h2 className="text-lg font-semibold uppercase tracking-wider">
                {isKo ? '주요 장면 (타임라인)' : 'Key Moments'}
              </h2>
            </div>
            <div className="space-y-3">
              {data.timestamps.map((ts, index) => (
                <div key={index} className="flex group">
                  <div className="flex-none w-16 text-right mr-4">
                    <span className="inline-flex items-center justify-center px-2 py-1 rounded bg-slate-900 text-blue-400 text-xs font-mono font-bold group-hover:text-blue-300 transition-colors">
                      {ts.time}
                    </span>
                  </div>
                  <div className="flex-1 pb-3 border-b border-slate-700/50 last:border-0 last:pb-0">
                    <p className="text-slate-300 text-sm group-hover:text-slate-100 transition-colors">
                      {ts.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Metadata Column */}
      <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 shadow-xl h-fit sticky top-24">
        <div className="flex items-center mb-4 text-purple-400">
          <BarChart3 className="w-5 h-5 mr-2" />
          <h2 className="text-lg font-semibold uppercase tracking-wider">
            {isKo ? '동영상 통계' : 'Video Stats'}
          </h2>
        </div>
        
        <div className="space-y-4">
          <div>
            <p className="text-xs text-slate-500 uppercase font-bold">
              {isKo ? '조회수' : 'Total Views'}
            </p>
            <p className="text-2xl font-bold text-white">{data.views.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500 uppercase font-bold">
              {isKo ? '게시일' : 'Published'}
            </p>
            <p className="text-lg text-slate-200">{formatDate(data.publishedDate)}</p>
          </div>
          <div>
            <p className="text-xs text-slate-500 uppercase font-bold">
              {isKo ? '반응/분위기' : 'Sentiment'}
            </p>
            <div className="inline-flex items-center mt-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
              {data.sentiment}
            </div>
          </div>
          <div className="pt-4 border-t border-slate-700">
             <p className="text-xs text-slate-500 uppercase font-bold">
               {isKo ? '채널' : 'Channel'}
             </p>
             <p className="text-xl font-bold text-blue-400">{data.channelName}</p>
             <p className="text-sm text-slate-400">
               {data.channelAnalysis.subscriberCount} {isKo ? '구독자' : 'Subscribers'}
             </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoSummary;
