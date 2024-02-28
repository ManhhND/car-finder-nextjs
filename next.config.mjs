/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "dev-kopm.pantheonsite.io",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "dev-kopm.pantheonsite.io",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
