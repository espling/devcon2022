/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  externals: {
    FileReader: "FileReader",
  },

  // webpack5: true,
  // webpack: (config, { isServer }) => {
  //   if (!isServer) {
  //     config.resolve.fallback = { fs: false };
  //   }
  //   return config;
  // },
  // webpack: (config) => {
  //   config.resolve.fallback = { fs: false };
  // },
  // webpack: (config, { isServer }) => {
  //   // Fixes npm packages that depend on `fs` module
  //   if (!isServer) {
  //     config.node = {

  //       fs: "empty",
  //     };
  //   }

  //   return config;
  // },
  swcMinify: true,
};

module.exports = nextConfig;
