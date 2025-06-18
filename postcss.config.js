// // module.exports = {
// //   plugins: {
// //     '@tailwindcss/postcss': {}, // שימוש נכון לפי גרסה 4 ומעלה
// //     autoprefixer: {},
// //   },
// // }
// // module.exports = {
// //   plugins: {
// //     tailwindcss: {},
// //     autoprefixer: {},
// //   },
// // }
// module.exports = {
//   plugins: {
//     '@tailwindcss/postcss': {},
//     autoprefixer: {},
//   },
// }
// module.exports = {
//   plugins: {
//     tailwindcss: {},
//     autoprefixer: {},
//   },
// }
module.exports = {
  plugins: [
    require('@tailwindcss/postcss'),
    require('autoprefixer'),
  ],
}
