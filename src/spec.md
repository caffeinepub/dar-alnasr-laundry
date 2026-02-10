# Specification

## Summary
**Goal:** Update the price of the single selected catalog item so it displays as AED 4.00 in the UI.

**Planned changes:**
- Identify the catalog item that feeds the price shown at XPath `/html[1]/body[1]/div[1]/div[1]/div[1]/main[1]/div[1]/div[4]/div[1]/div[1]/span[1]`.
- Update only that item’s `price : Nat` value to `4` in `backend/main.mo`, relying on existing formatting and data flow.

**User-visible outcome:** When navigating to the same category and item, the price at the specified location shows AED 4.00, and all other item prices remain unchanged.
