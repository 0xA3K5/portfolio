module.exports = {
  env: {
    pagePassword: process.env.PAGE_PASSWORD,
  },
  reactStrictMode: true,
  poweredByHeader: true,
  output: "standalone",
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
    };

    return config;
  },
  images: {
    dangerouslyAllowSVG: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**dropbox.com",
      },
    ],
    domains: [
      "s3.us-west-2.amazonaws.com",
      "www.notion.so",
      "www.dropbox.com",
      "https://www.dropbox.com",
      "dropbox.com",
    ],
  },
};
