// module.exports = function (api) {
//   api.cache(true);
//   return {
//     presets: ["babel-preset-expo"],
//     // plugins: ["nativewind/babel"],
//   };
// };

module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      ["babel-preset-expo", 
        { jsxImportSource: "nativewind",
          unstable_transformImportMeta: true,
         }
      ],
      "nativewind/babel",
      
    ],
    plugins: [
      "react-native-reanimated/plugin", // 👈 must be last
    ],
  };
};
