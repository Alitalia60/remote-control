const path = require('node:path');

module.exports = {
  entry: {
    main: path.resolve(__dirname, './index.ts')
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    chunkFormat: 'module'
  },
  mode: "development",
  resolve: {
    // Add `.ts` and `.tsx` as a resolvable extension.
    extensions: [".ts", ".tsx", ".js"],
    // Add support for TypeScripts fully qualified ESM imports.
    extensionAlias: {
      ".js": [".js", ".ts"],
      ".cjs": [".cjs", ".cts"],
      ".mjs": [".mjs", ".mts"]
    }
  },
  module: {
    rules: [
      // all files with a `.ts`, `.cts`, `.mts` or `.tsx` extension will be handled by `ts-loader`
      { test: /\.([cm]?ts|tsx)$/, loader: "ts-loader" },
      { test: /\.node$/, loader: "node-loader" },
    ]
  },
  target: "node",

}