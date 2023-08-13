const { override } = require('customize-cra');

module.exports = {
    webpack: override(
        (config, env) => {
            // config = rewireReactHotLoader(config, env);
            config.resolve = {
                extensions: ['.js', '.jsx'],
                symlinks: false,
                alias: {
                    ...config.resolve.alias,
                }
            };
            return config;
        }
    )
};