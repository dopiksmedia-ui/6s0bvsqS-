import { Hono } from 'hono';
import type { AppContext } from '../../types';

const youtubeApi = new Hono<AppContext>();

// YouTube Channel ID for @Dr.MohammedSaeedAli
// Note: We'll extract videos from the channel handle
const CHANNEL_HANDLE = '@Dr.MohammedSaeedAli';
const CHANNEL_ID = 'UC-lHJZR3Gqxm24_Vd_AJ5Yw'; // You may need to update this

/**
 * GET /api/youtube/videos
 * Fetch latest videos from YouTube channel (including Shorts)
 */
youtubeApi.get('/videos', async (c) => {
  try {
    // Check if YouTube API key is available in environment
    const apiKey = c.env?.YOUTUBE_API_KEY;
    
    if (!apiKey) {
      console.log('YouTube API key not found, using fallback data');
      return c.json({
        success: true,
        videos: getFallbackVideos(),
        source: 'fallback'
      });
    }

    // Fetch videos from YouTube Data API v3
    const searchUrl = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&channelId=${CHANNEL_ID}&part=snippet,id&order=date&maxResults=20&type=video`;
    
    const response = await fetch(searchUrl);
    
    if (!response.ok) {
      throw new Error(`YouTube API error: ${response.status}`);
    }

    const data = await response.json();
    
    // Transform YouTube data to our format
    const videos = data.items.map((item: any) => ({
      id: item.id.videoId,
      title: item.snippet.title,
      description: item.snippet.description,
      thumbnail: item.snippet.thumbnails.high?.url || item.snippet.thumbnails.medium?.url || item.snippet.thumbnails.default?.url,
      publishedAt: item.snippet.publishedAt
    }));

    return c.json({
      success: true,
      videos: videos,
      source: 'youtube-api',
      total: videos.length
    });

  } catch (error) {
    console.error('Error fetching YouTube videos:', error);
    
    // Return fallback data on error
    return c.json({
      success: true,
      videos: getFallbackVideos(),
      source: 'fallback-error',
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

/**
 * Fallback videos when API is not available
 * These are sample videos that will be replaced with real data
 */
function getFallbackVideos() {
  return [
    {
      id: 'dQw4w9WgXcQ',
      title: 'نصائح للوقاية من سرطان القولون',
      description: 'فيديو توعوي حول أهمية الكشف المبكر والعوامل التي تساعد في الوقاية من سرطان القولون',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
      publishedAt: new Date().toISOString()
    },
    {
      id: 'dQw4w9WgXcQ',
      title: 'الجراحة الروبوتية في علاج القولون',
      description: 'شرح مفصل لتقنيات الجراحة الروبوتية الحديثة وفوائدها في علاج أمراض القولون',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
      publishedAt: new Date().toISOString()
    },
    {
      id: 'dQw4w9WgXcQ',
      title: 'أسئلة شائعة حول أمراض القولون',
      description: 'إجابات شاملة عن أكثر الأسئلة شيوعاً حول أمراض القولون والمستقيم',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
      publishedAt: new Date().toISOString()
    },
    {
      id: 'dQw4w9WgXcQ',
      title: 'نمط حياة صحي للوقاية من البواسير',
      description: 'نصائح عملية وإرشادات يومية للوقاية من البواسير والمحافظة على صحة القولون',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
      publishedAt: new Date().toISOString()
    },
    {
      id: 'dQw4w9WgXcQ',
      title: 'متى يجب زيارة الطبيب؟',
      description: 'علامات وأعراض تستوجب الفحص الطبي الفوري لتجنب المضاعفات',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
      publishedAt: new Date().toISOString()
    },
    {
      id: 'dQw4w9WgXcQ',
      title: 'التغذية السليمة لصحة القولون',
      description: 'دليل شامل للأطعمة المفيدة لصحة القولون والأطعمة التي يجب تجنبها',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
      publishedAt: new Date().toISOString()
    },
    {
      id: 'dQw4w9WgXcQ',
      title: 'منظار القولون: ماذا تتوقع؟',
      description: 'دليل تفصيلي للتحضير لفحص المنظار والإجراءات المتبعة أثناء وبعد الفحص',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
      publishedAt: new Date().toISOString()
    },
    {
      id: 'dQw4w9WgXcQ',
      title: 'قصص نجاح المرضى',
      description: 'تجارب حقيقية لمرضى تعافوا بنجاح وعادوا لحياتهم الطبيعية',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
      publishedAt: new Date().toISOString()
    },
    {
      id: 'dQw4w9WgXcQ',
      title: 'علاج الشرخ الشرجي بالبوتكس',
      description: 'شرح تفصيلي لطريقة علاج الشرخ الشرجي باستخدام حقن البوتكس',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
      publishedAt: new Date().toISOString()
    },
    {
      id: 'dQw4w9WgXcQ',
      title: 'متلازمة القولون العصبي',
      description: 'فهم أعراض القولون العصبي وطرق التعامل معه بشكل فعال',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
      publishedAt: new Date().toISOString()
    },
    {
      id: 'dQw4w9WgXcQ',
      title: 'الجراحة التنظيرية المتقدمة',
      description: 'نظرة على أحدث تقنيات الجراحة التنظيرية وفوائدها للمرضى',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
      publishedAt: new Date().toISOString()
    },
    {
      id: 'dQw4w9WgXcQ',
      title: 'أهمية الفحص الدوري',
      description: 'لماذا يجب عليك إجراء الفحوصات الدورية للكشف المبكر عن الأمراض',
      thumbnail: 'https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg',
      publishedAt: new Date().toISOString()
    }
  ];
}

export default youtubeApi;
