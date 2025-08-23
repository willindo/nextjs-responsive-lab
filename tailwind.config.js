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
// class="@container">
//   <div class="flex flex-col @md:flex-row"></div>
//   class="@container">
//   <div class="flex flex-col @md:flex-row"></div>
//   <div class="@container">
//   <div class="flex flex-row @sm:@max-md:flex-col"></div>
//   @container/{name} and target specific containers with variants like @sm/{name} and @md/{name}:
//   <div class="@container/main">
//   <!-- ... -->
//   <div class="flex flex-row @sm/main:flex-col"></div>
//    ---- \\\\\\ @theme {
//   --container-8xl: 96rem;
// }
// <div class="@container">
//   <div class="flex flex-col @8xl:flex-row"></div>
//   --------////
//   --------\\\\\\\\\\\Use variants like @min-[475px] and @max-[960px] for one-off container query sizes you don't want to add to your theme:
//   <div class="@container">
//   <div class="flex flex-col @min-[475px]:flex-row"></div>
//   ---------------/////////
//   <div class="@container">
//   <div class="w-[50cqw]"></div>
