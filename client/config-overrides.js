const { override } = require('customize-cra');
const rewireReactHotLoader = require('react-app-rewire-hot-loader');

module.exports = {
    webpack: override(
        (config, env) => {
            config = rewireReactHotLoader(config, env);
            config.resolve = {
                extensions: ['.js', '.jsx'],
                symlinks: false,
                alias: {
                    ...config.resolve.alias,
                    'react-dom': '@hot-loader/react-dom',
                }
            };
            return config;
        }
    )
};