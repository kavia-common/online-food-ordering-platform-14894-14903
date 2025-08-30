import { component$, $ } from "@builder.io/qwik";
import type { MenuItem } from "~/lib/types";
import { addToCart } from "~/lib/storage";

interface Props {
  item: MenuItem;
}

// PUBLIC_INTERFACE
export const MenuItemCard = component$<Props>(({ item }) => {
  const onAdd = $( () => {
    addToCart(item, 1);
  });
  return (
    <article class="card product" aria-label={item.name}>
      <div class="media">
        <div class="emoji">{item.emoji ?? "🍽️"}</div>
      </div>
      <div class="content">
        <div class="price-row">
          <div style={{ fontWeight: 800 }}>{item.name}</div>
          <div>${item.price.toFixed(2)}</div>
        </div>
        <p class="line" style={{ margin: '0.35rem 0 0.5rem' }}>{item.description}</p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems:'center' }}>
          <span class="badge"> {item.category} </span>
          <button class="btn accent" onClick$={onAdd}>Add to cart</button>
        </div>
      </div>
    </article>
  );
});
