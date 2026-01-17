export interface RelatedVideo {
  title: string;
  views: number;
  summary: string;
}

export interface Timestamp {
  time: string;
  description: string;
}

export interface ChannelAnalysis {
  subscriberCount: string;
  contentStrategy: string;
  totalViewsEstimate: string;
  frequentTopics: string[];
  successFactors: string;
}

export interface VideoData {
  videoTitle: string;
  channelName: string;
  summary: string;
  views: number; // Integer for charting
  publishedDate: string;
  keyTopics: string[];
  timestamps: Timestamp[];
  sentiment: string;
  channelAnalysis: ChannelAnalysis;
  otherVideos: RelatedVideo[];
}

export interface GroundingUrl {
  title: string;
  uri: string;
}

export type SummaryLength = 'short' | 'medium' | 'long';
export type Language = 'en' | 'ko';

export interface SearchHistoryItem {
  id: string;
  url: string;
  length: SummaryLength;
  language: Language;
  timestamp: number;
  title: string;
  channelName: string;
}
