/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/find-contract",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
