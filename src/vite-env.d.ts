/// <reference types="vite/client" />
/// <reference types="vite-plugin-pwa/client" />

declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.PNG' {
  const src: string;
  export default src;
}
