import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  serverExternalPackages: [
    "sharp",
    "@img/sharp-win32-x64",
    "@img/sharp-libvips-win32-x64",
    "@img/sharp-linux-x64",
    "@img/sharp-libvips-linux-x64",
  ],
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
    ];
  },
};

export default nextConfig;
