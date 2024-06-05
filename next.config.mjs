/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/home",
        destination: "/products",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
