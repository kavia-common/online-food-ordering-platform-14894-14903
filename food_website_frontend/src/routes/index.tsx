import { component$, useSignal, useVisibleTask$, $ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { MenuItemCard } from "~/components/MenuItemCard";
import { SidebarCart } from "~/components/SidebarCart";
import { searchMenu, getMenu } from "~/lib/storage";
import type { MenuItem } from "~/lib/types";

// PUBLIC_INTERFACE
export default component$(() => {
  const all = useSignal<MenuItem[]>([]);
  const list = useSignal<MenuItem[]>([]);
  const query = useSignal('');
  const category = useSignal<'All' | any>('All');

  useVisibleTask$(() => {
    const m = getMenu();
    all.value = m;
    list.value = m;
  });

  const runSearch = $(() => {
    list.value = searchMenu(query.value, category.value);
  });

  return (
    <div class="main-area" role="main">
      <section class="card section" style={{ padding: '1rem' }}>
        <div style={{ display:'grid', gap:'0.5rem', marginBottom:'0.5rem' }}>
          <h2 class="section-title">Browse Menu</h2>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 220px', gap:'0.5rem' }}>
            <input
              class="input"
              type="search"
              placeholder="Search for pizza, burger, salad..."
              value={query.value}
              onInput$={(e:any) => { query.value = e.target.value; runSearch(); }}
            />
            <select class="input" value={category.value} onChange$={(e:any)=>{ category.value = e.target.value; runSearch(); }}>
              <option>All</option>
              <option>Burgers</option>
              <option>Pizzas</option>
              <option>Salads</option>
              <option>Desserts</option>
              <option>Drinks</option>
            </select>
          </div>
        </div>

        <div class="grid">
          {list.value.map((item) => (
            <MenuItemCard key={item.id} item={item} />
          ))}
        </div>
      </section>

      <SidebarCart />
    </div>
  );
});

export const head: DocumentHead = {
  title: "Foodly • Menu",
  meta: [
    { name: "description", content: "Browse the Foodly menu and add items to your cart." },
  ],
};
