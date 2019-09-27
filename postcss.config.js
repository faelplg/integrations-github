// "browserslist": [
//   "last 4 version",
//   "> 1%",
//   "IE 10"
// ]

module.exports = {
  plugins: [
    require('autoprefixer')({grid: true, browsers: ['> 1%']})
  ]
}
