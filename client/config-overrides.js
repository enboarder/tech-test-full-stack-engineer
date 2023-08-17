const { override } = require('customize-cra');
const webpack = require('webpack');

module.exports = {
    webpack: override(
        (config, env) => {
            config.resolve = {
                extensions: ['.js', '.jsx'],
                symlinks: false,
                alias: {
                    ...config.resolve.alias
                }
            };

            config.devServer = {
                ...config.devServer,
                hot: true
            };

            config.plugins = [
                ...config.plugins,
                new webpack.HotModuleReplacementPlugin()
            ];

            return config;
        }
    )
};
