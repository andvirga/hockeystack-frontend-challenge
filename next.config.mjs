/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/pure-table",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
