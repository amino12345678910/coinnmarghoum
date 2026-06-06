/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removed output: 'export' to support Next.js API routes (Food Concierge backend)
  images: {
    unoptimized: true, // Kept unoptimized for static images like unsplash
  },
};

export default nextConfig;
