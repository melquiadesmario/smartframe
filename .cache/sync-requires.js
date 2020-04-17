const { hot } = require("react-hot-loader/root")

// prefer default export if available
const preferDefault = m => m && m.default || m


exports.components = {
  "component---src-pages-app-js": hot(preferDefault(require("C:\\projects\\smartframe\\src\\pages\\app.js"))),
  "component---src-pages-create-account-js": hot(preferDefault(require("C:\\projects\\smartframe\\src\\pages\\create-account.js"))),
  "component---src-pages-d-js": hot(preferDefault(require("C:\\projects\\smartframe\\src\\pages\\d.js"))),
  "component---src-pages-index-js": hot(preferDefault(require("C:\\projects\\smartframe\\src\\pages\\index.js"))),
  "component---src-pages-sign-in-js": hot(preferDefault(require("C:\\projects\\smartframe\\src\\pages\\sign-in.js")))
}

