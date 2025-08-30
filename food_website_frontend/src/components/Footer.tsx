import { component$ } from "@builder.io/qwik";

// PUBLIC_INTERFACE
export const Footer = component$(() => {
  return (
    <footer class="footer">
      <div class="container footer-inner">
        <div>© {new Date().getFullYear()} Foodly • Fresh, fast, and tasty.</div>
        <div>Contact: hello@foodly.local • +1 (555) 123-4567</div>
      </div>
    </footer>
  );
});
