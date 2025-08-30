import { component$, useSignal, useVisibleTask$, $ } from "@builder.io/qwik";
import { getCart, updateCart, placeOrder } from "~/lib/storage";
import type { CartItem } from "~/lib/types";
import { Link } from "@builder.io/qwik-city";

// PUBLIC_INTERFACE
export const SidebarCart = component$(() => {
  const items = useSignal<CartItem[]>([]);
  const total = useSignal(0);

  const recalc = $(() => {
    total.value = items.value.reduce((s, c) => s + c.item.price * c.qty, 0);
  });

  useVisibleTask$(() => {
    items.value = getCart();
    recalc();
  });

  const inc = $((id: string) => {
    const current = items.value.find((c) => c.item.id === id);
    const qty = (current?.qty ?? 0) + 1;
    items.value = updateCart(id, qty);
    recalc();
  });
  const dec = $((id: string) => {
    const current = items.value.find((c) => c.item.id === id);
    const qty = Math.max(0, (current?.qty ?? 0) - 1);
    items.value = updateCart(id, qty);
    recalc();
  });

  const onCheckout = $(() => {
    if (!items.value.length) return;
    const order = placeOrder();
    // naive redirect to order detail/history
    window.location.href = "/orders?placed=" + encodeURIComponent(order.id);
  });

  return (
    <aside class="sidebar">
      <div class="card section">
        <h3 class="section-title" style={{ fontSize: '1.25rem' }}>Your Cart</h3>
        <div class="cart-list">
          {items.value.length === 0 && (
            <p class="line">Your cart is empty. Add something delicious!</p>
          )}
          {items.value.map((c) => (
            <div class="cart-item" key={c.item.id}>
              <div>
                <div style={{ fontWeight: 700 }}>{c.item.name}</div>
                <div class="line">${c.item.price.toFixed(2)} × {c.qty}</div>
              </div>
              <div class="qty">
                <button aria-label="decrease" onClick$={() => dec(c.item.id)}>-</button>
                <span>{c.qty}</span>
                <button aria-label="increase" onClick$={() => inc(c.item.id)}>+</button>
              </div>
            </div>
          ))}
        </div>

        <div style={{ display:'flex', justifyContent:'space-between', marginTop:'0.75rem', fontWeight:800 }}>
          <span>Total</span>
          <span>${total.value.toFixed(2)}</span>
        </div>

        <div style={{ display:'grid', gap:'0.5rem', marginTop:'0.75rem' }}>
          <button class="btn primary" onClick$={onCheckout} disabled={items.value.length === 0}>Checkout</button>
          <Link class="btn" href="/orders">View order history</Link>
        </div>
      </div>
    </aside>
  );
});
