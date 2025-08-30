import { component$, useSignal, useVisibleTask$ } from "@builder.io/qwik";
import type { DocumentHead } from "@builder.io/qwik-city";
import { getOrders } from "~/lib/storage";
import type { Order } from "~/lib/types";

// PUBLIC_INTERFACE
export default component$(() => {
  const orders = useSignal<Order[]>([]);

  useVisibleTask$(() => {
    orders.value = getOrders();
  });

  return (
    <section class="card section container" style={{ marginTop: '1rem' }}>
      <h2 class="section-title">Order History</h2>
      {orders.value.length === 0 ? (
        <p class="line">No orders yet. Start by adding items to your cart.</p>
      ) : (
        <div style={{ display: 'grid', gap: '0.75rem' }}>
          {orders.value.map((o) => (
            <article class="card section" key={o.id}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems:'baseline' }}>
                <div style={{ fontWeight: 800 }}>Order #{o.id.slice(-6)}</div>
                <div class="badge">{o.status}</div>
              </div>
              <div class="line">{new Date(o.createdAt).toLocaleString()}</div>
              <ul>
                {o.items.map((c) => (
                  <li key={c.item.id}>
                    {c.item.name} × {c.qty} — ${(c.item.price * c.qty).toFixed(2)}
                  </li>
                ))}
              </ul>
              <div style={{ display:'flex', justifyContent:'flex-end', gap:'0.5rem', fontWeight:800 }}>
                <span>Total:</span>
                <span>${o.total.toFixed(2)}</span>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
});

export const head: DocumentHead = {
  title: "Foodly • Orders",
  meta: [{ name: "description", content: "View your previous food orders." }],
};
