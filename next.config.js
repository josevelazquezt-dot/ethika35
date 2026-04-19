/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone', // <--- CRÍTICO: Fuerza a Amplify a levantar un servidor SSR.
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'konfidentecustomers.s3.amazonaws.com', // Autorización para logos de clientes
      },
    ],
  },
}

module.exports = nextConfig
