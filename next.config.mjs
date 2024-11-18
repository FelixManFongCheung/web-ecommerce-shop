/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*", // Set your origin
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, DELETE, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization",
          },
        ],
      },
    ];
  },
  experimental: {
    serverComponentsExternalPackages: ['@tensorflow/tfjs-node'],
  },

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'files.stripe.com'
      },
    ],
  },

  webpack: (config, { isServer }) => {
    if (isServer) {
      config.externals.push({
        '@tensorflow/tfjs-node': 'commonjs @tensorflow/tfjs-node',
      });
    }

    // Add this rule to handle HTML files
    config.module.rules.push({
      test: /\.html$/,
      loader: 'ignore-loader'
    });

    return config;
  },
};

export default nextConfig;
