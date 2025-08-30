import { component$ } from "@builder.io/qwik";
import { isDev } from "@builder.io/qwik";
import {
  QwikCityProvider,
  RouterOutlet,
  ServiceWorkerRegister,
} from "@builder.io/qwik-city";
import { RouterHead } from "./components/router-head/router-head";

import "./global.css";

export default component$(() => {
  return (
    <QwikCityProvider>
      <head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#FF5722" />
        <meta name="color-scheme" content="light only" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content="Foodly" />
        <meta property="og:description" content="Order your favorite food online." />
        {!isDev && (
          <link
            rel="manifest"
            href={`${import.meta.env.BASE_URL}manifest.json`}
          />
        )}
        <RouterHead />
        {!isDev && <ServiceWorkerRegister />}
      </head>
      <body lang="en">
        <RouterOutlet />
      </body>
    </QwikCityProvider>
  );
});
