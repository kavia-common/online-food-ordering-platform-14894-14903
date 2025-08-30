import { component$, useSignal, $, useVisibleTask$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { login, getUser } from "~/lib/storage";
import { Link } from "@builder.io/qwik-city";

// PUBLIC_INTERFACE
export default component$(() => {
  const email = useSignal('');
  const password = useSignal('');
  const error = useSignal<string | null>(null);
  const loggedIn = useSignal(false);

  useVisibleTask$(() => {
    loggedIn.value = !!getUser();
  });

  const onSubmit = $( (ev: Event) => {
    ev.preventDefault();
    error.value = null;
    try {
      login({ email: email.value, password: password.value });
      loggedIn.value = true;
      window.location.href = "/";
    } catch (e:any) {
      error.value = e?.message ?? "Login failed";
    }
  });

  return (
    <section class="container" style={{ marginTop: '1rem' }}>
      <div class="card section" style={{ maxWidth: '480px', marginInline: 'auto' }}>
        <h2 class="section-title">Login</h2>
        {error.value && <p style={{ color: 'crimson' }}>{error.value}</p>}
        <form onSubmit$={onSubmit} style={{ display:'grid', gap:'0.75rem' }}>
          <div>
            <label>Email</label>
            <input class="input" type="email" required value={email.value} onInput$={(e:any)=> email.value = e.target.value} />
          </div>
          <div>
            <label>Password</label>
            <input class="input" type="password" required value={password.value} onInput$={(e:any)=> password.value = e.target.value} />
          </div>
          <button class="btn primary" type="submit">Login</button>
          <p class="line">No account? <Link href="/auth/register">Create one</Link></p>
        </form>
      </div>
    </section>
  );
});

export const head: DocumentHead = {
  title: "Foodly • Login",
  meta: [{ name: "description", content: "Login to your Foodly account." }],
};
