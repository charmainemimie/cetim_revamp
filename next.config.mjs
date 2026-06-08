/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    serverActions: {
      allowedOrigins: [
        'upgraded-capybara-rxqp699qv69hqw-3000.app.github.dev',
        'localhost:3000'
      ],
    },
  },
}

export default nextConfig