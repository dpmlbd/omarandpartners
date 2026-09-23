import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/kolpoporishor",
        destination: "/kolpoporisor",
        permanent: false,
      },
      {
        source: "/kolpoporishor/:path*",
        destination: "/kolpoporisor/:path*",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
