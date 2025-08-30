/**
 * This file declares env typings for Vite and Qwik usage.
 * Add PUBLIC_ prefixed variables that are safe to expose to the browser.
 */
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly PUBLIC_API_BASE?: string;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
