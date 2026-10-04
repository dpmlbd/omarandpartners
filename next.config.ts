import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: ["sharp"],
  images: {
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "*.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "50mb",
    },
    proxyClientMaxBodySize: "50mb",
  },
  async redirects() {
    return [
      {
        source: "/kolpoporisor",
        destination: "/kolpoporishor",
        permanent: true,
      },
      {
        source: "/kolpoporisor/:path*",
        destination: "/kolpoporishor/:path*",
        permanent: true,
      },
      {
        source: "/cookies",
        destination: "/legal/cookie-policy",
        permanent: true,
      },
      {
        source: "/cookie-policy",
        destination: "/legal/cookie-policy",
        permanent: true,
      },
      {
        source: "/insights",
        destination: "/articles",
        permanent: true,
      },
      {
        source: "/insights/articles",
        destination: "/articles",
        permanent: true,
      },
      {
        source: "/insights/articles/:slug*",
        destination: "/articles/:slug*",
        permanent: true,
      },
      {
        source: "/blog",
        destination: "/articles",
        permanent: true,
      },
      {
        source: "/blog/:slug*",
        destination: "/articles/:slug*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
