/**
 * Ecosystem Downloader Engine
 * Automatically resolves and simulates direct download nodes for YouTube, MediaFire, and SS-series protocols.
 */

export interface ResolvedNode {
  audio: string;
  video: string;
  source: string;
  quality: string;
}

export const resolveDirectLinks = async (url: string): Promise<ResolvedNode> => {
  // Protocol Normalisation
  const cleanUrl = url.trim();
  const isYouTube = cleanUrl.includes('youtube.com') || cleanUrl.includes('youtu.be');
  const isMediaFire = cleanUrl.includes('mediafire.com');
  
  // Simulated Background Processing (Representing server-side SS/SSVid hooks)
  return new Promise((resolve) => {
    setTimeout(() => {
      if (isYouTube) {
        const videoId = cleanUrl.split('v=')[1]?.split('&')[0] || cleanUrl.split('/').pop();
        resolve({
          video: `https://ssyoutube.com/watch?v=${videoId}`, // Mirror protocol redirection
          audio: `https://ytmp3.cc/api/v1/convert?url=${encodeURIComponent(cleanUrl)}`,
          source: 'YouTube Master Node',
          quality: '1080p / 320kbps'
        });
      } else if (isMediaFire) {
        resolve({
          video: cleanUrl, // Direct link typically provided by MediaFire
          audio: cleanUrl,
          source: 'MediaFire Data Hub',
          quality: 'Original Master'
        });
      } else {
        // Fallback for SSVid and other protocols
        resolve({
          video: `https://ssvid.com/dl?url=${encodeURIComponent(cleanUrl)}&format=mp4`,
          audio: `https://ssvid.com/dl?url=${encodeURIComponent(cleanUrl)}&format=mp3`,
          source: 'Multi-Mirror Protocol',
          quality: 'Standard Definition'
        });
      }
    }, 1200);
  });
};

export const initiateDownload = (url: string, filename: string) => {
  // Protocol: Trigger safe browser-native download node
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute('download', filename);
  link.setAttribute('target', '_blank');
  link.style.display = 'none';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};