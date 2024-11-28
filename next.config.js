/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false,
    webpack: (config) => {
        config.externals = config.externals || {};
        // Asegúrate de que Webpack no trate los módulos ESM como CommonJS
        config.externals['@react-pdf/renderer'] = 'commonjs @react-pdf/renderer';
        return config;
    },
};

module.exports = nextConfig;
