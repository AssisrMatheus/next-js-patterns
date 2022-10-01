/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async redirects() {
    return [
      {
        source: "/login",
        destination: "/auth/signin",
        permanent: true,
      },
      {
        source: "/logout",
        destination: "/auth/signout",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
