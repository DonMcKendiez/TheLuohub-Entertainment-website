
export type ContentType = 'movie' | 'mixtape' | 'iptv' | 'music-video' | 'nollywood';

export type UserRole = 'viewer' | 'creator' | 'admin';
export type CreatorSubRole = 'DJ' | 'VJ' | 'Producer' | 'Music Artist';

export interface MediaItem {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  streamUrl?: string; // New: Direct link for integrated player
  videoUrl?: string;
  downloadUrl?: string;
  audioDownloadUrl?: string; // New: Direct audio node
  videoDownloadUrl?: string; // New: Direct video node
  externalLink?: string; 
  bloggerId?: string;    
  price: number;
  type: ContentType;
  year?: string;
  isLive?: boolean;
  tmdbId?: string;
  copyrightStatus?: 'cleared' | 'flagged' | 'pending';
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  date: string;
  type: 'system' | 'update' | 'alert';
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  balance: number;
  role: UserRole;
  subRole?: CreatorSubRole;
  subscriptionActive: boolean;
  nextPaymentDate?: string;
  aiUsageToday: number;
  lastUsageDate?: string;
  notifications: Notification[];
  emailSubscribed: boolean;
  status?: 'active' | 'suspended'; // New: For admin control
  apiKeys?: {
    tmdb?: string;
    deepseek?: string;
    bloggerFeed?: string;
    adsensePubId?: string; // Added for AdSense configuration
  };
}

export interface GroundingSource {
  title: string;
  uri: string;
}

export interface AnalysisResult {
  summary: string;
  details: string;
  sources?: GroundingSource[];
}