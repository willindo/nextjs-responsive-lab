import plugin from "tailwindcss/plugin";

export default {
  content: [
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
