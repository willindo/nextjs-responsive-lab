import plugin from "tailwindcss/plugin";
// module.exports = {
//   theme: {
//     container: {
//       type: "inline-size",
//     },
//   },
// }

// export const content = [
//   "./pages/**/*.{js,ts,jsx,tsx}",
//   "./components/**/*.{js,ts,jsx,tsx}",
//   "./app/**/*.{js,ts,jsx,tsx}",
// ];

// export const theme = {
//   container: {
//     type: "inline-size",
//   },
//   extend: {},
// };

export default { 
  content : [
  "./pages/**/*.{js,ts,jsx,tsx}",
  "./components/**/*.{js,ts,jsx,tsx}",
  "./app/**/*.{js,ts,jsx,tsx}",
],
 theme : {
  container: {
    type: "inline-size",
  },
  extend: {},
},
plugins: [
  require("@tailwindcss/line-clamp"),
  // plugin(function ({ addUtilities }) {
  //   const containers = ["a", "b", "c"];

  //   const newUtilities = containers.reduce((acc, name) => {
  //     acc[`.container-${name}container`] = {
  //       "container-type": "inline-size",
  //       "container-name": `${name}container`,
  //     };
  //     return acc;
  //   }, {});

  //   addUtilities(newUtilities);
  // }),

  // 👇 add custom container variants
 // 👇 custom shortcut variant
    plugin(function ({ addVariant }) {
      // `cq-card-md` = container named "card" with min-width:600px
      addVariant("cq-card-md", "@container card (min-width: 600px)");
    }),
    
]
};
