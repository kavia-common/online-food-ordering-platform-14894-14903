import { component$, useSignal, $ } from "@builder.io/qwik";
import { Link, useLocation } from "@builder.io/qwik-city";
import { getUser, logout } from "~/lib/storage";

// PUBLIC_INTERFACE
export const Header = component$(() => {
  const loc = useLocation();
  const userSig = useSignal(getUser());

  const onLogout = $(() => {
    logout();
    userSig.value = null;
  });

  return (
    <header class="header">
      <div class="container header-inner">
        <Link class="brand" href="/">
          <span class="brand-badge">Foodly</span>
          <span>Your favorite bites</span>
        </Link>

        <nav class="nav" aria-label="Primary">
          <Link href="/" aria-current={loc.url.pathname === "/" ? "page" : undefined}>Menu</Link>
          <Link href="/orders" aria-current={loc.url.pathname.startsWith("/orders") ? "page" : undefined}>Orders</Link>
          <Link href="/auth/login" aria-current={loc.url.pathname.startsWith("/auth") ? "page" : undefined}>Account</Link>
        </nav>

        <div class="header-actions">
          {userSig.value ? (
            <>
              <span style={{ alignSelf: 'center', color: 'var(--text-muted)' }}>Hi, {userSig.value.name}</span>
              <button class="btn" onClick$={onLogout}>Logout</button>
            </>
          ) : (
            <>
              <Link class="btn" href="/auth/login">Login</Link>
              <Link class="btn primary" href="/auth/register">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
});
