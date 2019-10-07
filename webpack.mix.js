const mix = require('laravel-mix')

var SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin')

mix.webpackConfig({
  plugins: [
    new SWPrecacheWebpackPlugin({
      cacheId: 'pwa',
      filename: 'service-worker.js',
      staticeFileGlobs: ['public/**/*.{css,eot,svg,ttf,woff,woff2,js,html}'],
      minify: true,
      stripPrefix: 'public/',
      handleFetch: true,
      dynamicUrlToDependencies: {
        '/': ['resources/views/home.blade.php']
      },
      staticFileGlobsIgnorePatterns: [/\.map$/, /mix-manifest\.json$/, /manifest\.json$/, /service-worker\.js$/],
      navigateFallback: '/',
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/fonts\.googleapis\.com\//,
          handler: 'cacheFirst'
        }
      ]
    })
  ]
})

mix.js('resources/js/app.js', 'public/js')
   .sass('resources/sass/app.scss', 'public/css')
