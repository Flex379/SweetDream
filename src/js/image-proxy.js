const IMAGE_PROXY_URL = 'https://images.weserv.nl/';

export function getOptimizedImageUrl(imageUrl, width) {
  if (!imageUrl) return '';

  const params = new URLSearchParams({
    url: imageUrl,
    w: String(width),
    q: '80',
    output: 'webp',
  });

  return `${IMAGE_PROXY_URL}?${params}`;
}