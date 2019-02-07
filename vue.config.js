module.exports = {
  chainWebpack: config => {
    config.module.rules.delete('svg');
  },
  configureWebpack: {
    module: {
      rules: [
        {
          test: /.svg$/,
          oneOf: [
            {
              resourceQuery: /file/,
              loader: 'file-loader',
              options: {
                limit: 0,
                name: 'svg/[name].[ext]',
              },
            },
            {
              loader: 'vue-svg-loader',
              options: {
                svgo: {
                  plugins: [{ removeDoctype: true }, { removeComments: true }],
                },
              },
            },
          ],
        },
      ],
    },
  },
};
