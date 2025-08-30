import { component$, useSignal, $, useVisibleTask$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { register, getUser } from "~/lib/storage";
import { Link } from "@builder.io/qwik-city";

// PUBLIC_INTERFACE
export default component$(() => {
  const email = useSignal('');
  const name = useSignal('');
  const password = useSignal('');
  const error = useSignal<string | null>(null);

  useVisibleTask$(() => {
    if (getUser()) window.location.href = "/";
  });

  const onSubmit = $( (ev: Event) => {
    ev.preventDefault();
    error.value = null;
    try {
      register({ email: email.value, password: password.value, name: name.value });
      window.location.href = "/";
    } catch (e:any) {
      error.value = e?.message ?? "Registration failed";
    }
  });

  return (
    <section class="container" style={{ marginTop: '1rem' }}>
      <div class="card section" style={{ maxWidth: '520px', marginInline: 'auto' }}>
        <h2 class="section-title">Create your account</h2>
        {error.value && <p style={{ color: 'crimson' }}>{error.value}</p>}
        <form onSubmit$={onSubmit} style={{ display:'grid', gap:'0.75rem' }}>
          <div>
            <label>Name</label>
            <input class="input" type="text" required value={name.value} onInput$={(e:any)=> name.value = e.target.value} />
          </div>
          <div>
            <label>Email</label>
            <input class="input" type="email" required value={email.value} onInput$={(e:any)=> email.value = e.target.value} />
          </div>
          <div>
            <label>Password</label>
            <input class="input" type="password" required value={password.value} onInput$={(e:any)=> password.value = e.target.value} />
          </div>
          <button class="btn primary" type="submit">Create account</button>
          <p class="line">Already have an account? <Link href="/auth/login">Login</Link></p>
        </form>
      </div>
    </section>
  );
});

export const head: DocumentHead = {
  title: "Foodly • Register",
  meta: [{ name: "description", content: "Register a new Foodly account." }],
};
