module.exports = {
  syntax: 'postcss-scss',
  sourceMap: true,
  plugins: [
    require('postcss-pxtorem')({
      propList: [
        'font-size',
        'line-height',
        'letter-spacing',
        'padding',
        'padding-bottom',
        'padding-top',
        'padding-left',
        'padding-right',
        'margin',
        'margin-top',
        'margin-bottom',
        'margin-left',
        'margin-right'
      ],
      minPixelValue: 6
    }),
    require('autoprefixer')({
      browsers: ['last 4 versions'],
      cascade: false
    }),
    require('cssnano')()
  ]
};
