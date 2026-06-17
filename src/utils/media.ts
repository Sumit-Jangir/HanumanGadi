/**
 * Media URLs for static/cPanel deploy — no Next.js /app/api routes.
 * Videos and images load directly from hanumangadi.com.
 *
 * Optional: set NEXT_PUBLIC_VIDEO_PROXY_URL to a PHP proxy on your backend
 * if direct playback fails (e.g. https://hanumangadi.com/.../video-proxy).
 */

const VIDEO_PROXY_BASE = process.env.NEXT_PUBLIC_VIDEO_PROXY_URL?.replace(/\/$/, "");

export const getVideoSrc = (url?: string) => {
  if (!url) return "";
  if (!url.startsWith("http")) return url;
  if (VIDEO_PROXY_BASE) {
    return `${VIDEO_PROXY_BASE}?url=${encodeURIComponent(url)}`;
  }
  return url;
};

export const getImageSrc = (url?: string) => {
  if (!url) return "";
  if (!url.startsWith("http")) return url;
  return url;
};
