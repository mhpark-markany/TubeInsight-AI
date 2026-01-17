import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { TrendingUp, Users, Youtube, Lightbulb, Hash } from 'lucide-react';
import { VideoData, Language } from '../types';

interface ChannelAnalysisProps {
  data: VideoData;
  language?: Language;
}

const ChannelAnalysis: React.FC<ChannelAnalysisProps> = ({ data, language = 'en' }) => {
  const isKo = language === 'ko';

  // Combine current video with other videos for the chart
  const chartData = [
    { name: isKo ? '현재 영상' : 'Current', title: data.videoTitle, views: data.views, isCurrent: true },
    ...data.otherVideos.map(v => ({ name: isKo ? '기타' : 'Other', title: v.title, views: v.views, isCurrent: false }))
  ];

  return (
    <div className="mt-8 space-y-6">
      <h2 className="text-2xl font-bold text-slate-100 flex items-center">
        <Youtube className="w-6 h-6 mr-3 text-red-500" />
        {isKo ? '채널 분석 및 비교' : 'Channel Insights & Comparison'}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Content Strategy & Insights */}
        <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 flex flex-col justify-between">
          <div>
            <div className="flex items-center mb-4 text-emerald-400">
              <Users className="w-5 h-5 mr-2" />
              <h3 className="text-lg font-semibold">
                {isKo ? '채널 전략' : 'Channel Strategy'}
              </h3>
            </div>
            <p className="text-slate-300 text-sm mb-4">
              {data.channelAnalysis.contentStrategy}
            </p>
            
            <div className="mb-4">
              <div className="flex items-center mb-2 text-yellow-400">
                <Lightbulb className="w-4 h-4 mr-2" />
                <span className="text-sm font-semibold uppercase">
                  {isKo ? '성공 요인' : 'Success Factors'}
                </span>
              </div>
              <p className="text-slate-300 text-sm italic border-l-2 border-yellow-500/50 pl-3">
                "{data.channelAnalysis.successFactors}"
              </p>
            </div>

            <div className="mb-2">
              <div className="flex items-center mb-2 text-blue-400">
                <Hash className="w-4 h-4 mr-2" />
                <span className="text-sm font-semibold uppercase">
                  {isKo ? '주로 다루는 주제' : 'Common Topics'}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {data.channelAnalysis.frequentTopics?.map((topic, i) => (
                  <span key={i} className="px-2 py-0.5 bg-slate-700/50 text-slate-300 text-xs rounded border border-slate-600">
                    {topic}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-700 flex justify-between items-center">
             <span className="text-slate-400 text-sm">
               {isKo ? '총 조회수(추정)' : 'Est. Total Views'}
             </span>
             <span className="text-slate-200 font-mono font-bold">{data.channelAnalysis.totalViewsEstimate}</span>
          </div>
        </div>

        {/* Comparison Chart */}
        <div className="bg-slate-800 rounded-2xl p-6 border border-slate-700 min-h-[350px] flex flex-col">
          <div className="flex items-center mb-4 text-orange-400">
            <TrendingUp className="w-5 h-5 mr-2" />
            <h3 className="text-lg font-semibold">
              {isKo ? '성과 비교' : 'Performance Comparison'}
            </h3>
          </div>
          <div className="flex-1 w-full h-full min-h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
                <YAxis stroke="#94a3b8" fontSize={12} tickFormatter={(val) => `${(val / 1000).toFixed(0)}k`} />
                <Tooltip 
                  cursor={{fill: '#1e293b'}}
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc' }}
                  itemStyle={{ color: '#f8fafc' }}
                  formatter={(value: number) => [value.toLocaleString(), isKo ? '조회수' : 'Views']}
                  labelStyle={{ color: '#94a3b8' }}
                />
                <Bar dataKey="views" radius={[4, 4, 0, 0]}>
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.isCurrent ? '#3b82f6' : '#64748b'} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-center text-slate-500 mt-2">
            {isKo 
              ? '조회수 비교: 현재 영상(파랑) vs 기타 인기 영상(회색)' 
              : 'Views comparison: Current Video (Blue) vs. Other Popular Videos (Grey)'}
          </p>
        </div>
      </div>

      {/* Other Videos List */}
      <div className="bg-slate-800 rounded-2xl overflow-hidden border border-slate-700">
        <div className="p-4 bg-slate-900/50 border-b border-slate-700">
          <h3 className="text-slate-200 font-semibold">
            {isKo ? `${data.channelName}의 인기 동영상` : `Popular from ${data.channelName}`}
          </h3>
        </div>
        <div className="divide-y divide-slate-700">
          {data.otherVideos.map((video, idx) => (
            <div key={idx} className="p-4 hover:bg-slate-700/30 transition-colors">
              <div className="flex justify-between items-start mb-1">
                <h4 className="text-blue-400 font-medium truncate pr-4">{video.title}</h4>
                <span className="text-slate-400 text-xs font-mono whitespace-nowrap">{video.views.toLocaleString()} {isKo ? '회' : 'views'}</span>
              </div>
              <p className="text-sm text-slate-400 line-clamp-2">{video.summary}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChannelAnalysis;
