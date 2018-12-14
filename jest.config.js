module.exports = {
  "setupFiles": [
    "./test/jestsetup.js"
  ],
  "testURL": "http://localhost/",
  "moduleNameMapper": {
    "ansi-styles": "<rootDir>/node_modules/ansi-styles",
    "jest-matcher-utils": "<rootDir>/node_modules/jest-matcher-utils",
    "^react-(.+)": "<rootDir>/node_modules/react-$1",
    "^react-dom": "<rootDir>/node_modules/react-dom",
    "^react[/](.+)": "<rootDir>/node_modules/react/$1",
    "^react": "<rootDir>/node_modules/react",
    "^views": "<rootDir>/src/views",
    "^icons": "<rootDir>/src/icons",
    "^components": "<rootDir>/src/components",
    "^utils[/](.+)$": "<rootDir>/src/utils/$1",
    "^test[/](.+)": "<rootDir>/test/$1",
    "^.+\\.(css|scss|svg)$": "<rootDir>/src/test/__mocks__/staticMocks.js"
  },
  "moduleFileExtensions": [
    "js",
    "json",
    "jsx"
  ],
  "roots": [
    "src/test"
  ]
}