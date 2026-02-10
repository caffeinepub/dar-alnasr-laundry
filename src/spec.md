# Specification

## Summary
**Goal:** Add a mobile-first online ordering experience for laundry services, including cart, checkout, authentication gating, and order history.

**Planned changes:**
- Add a mobile-first catalog ordering flow to select services from the existing catalog, adjust quantities per item, and view a cart with line totals and an overall AED-formatted total.
- Add a checkout screen to collect customer name, phone, pickup address, optional delivery address (or same-as-pickup toggle), pickup date/time window, and order notes, with English validation and labels.
- Require Internet Identity authentication to place an order while keeping catalog browsing available to unauthenticated users, preserving cart contents through login.
- Implement backend order support in a single Motoko actor: define order types, persist orders in canister state, create orders, and list the authenticated caller’s orders with stable unique order IDs.
- Add a “My Orders” UI area for signed-in users to view order history and detailed order information, including empty states.
- Apply a consistent mobile-app-style “fresh laundry” theme (warm neutrals + teal accents) across catalog, cart, checkout, confirmation, and orders screens.

**User-visible outcome:** Users can browse laundry services on mobile, add items to a cart, sign in with Internet Identity to checkout and place an order, see an order confirmation with an order ID, and view their order history in “My Orders.”
