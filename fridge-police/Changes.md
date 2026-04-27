# FridgePolice — Implementation Notes (Changes.md)

## Overview

FridgePolice is a lightweight prototype designed to manage shared food consumption among roommates. The system allows users to log food items, request portions, approve usage, and maintain an accurate representation of fridge inventory.

While the core workflow appears simple, the implementation focuses on handling real-world inconsistencies such as simultaneous actions, incomplete workflows, indistinguishable items, and mismatches between system state and physical reality.

This prototype prioritizes **correctness of state management** over UI complexity or production-level architecture.

---

## Core Design Approach

The system is built using in-memory state to simulate backend behavior. Each food item is modeled with:

- A unique identifier (`id`)
- Ownership metadata
- Quantity tracking (`totalQuantity`, `availableQuantity`)
- A list of requests with lifecycle states

Each request progresses through defined states:
`pending → approved → consumed / expired / rejected`

This structure ensures traceability and controlled state transitions.

---

## Scenario 1: Concurrency Conflict

### Problem

Multiple users may attempt to request or consume the same remaining portion simultaneously, leading to over-allocation.

### Solution

Before approving any request, the system dynamically validates whether sufficient quantity is still available at that exact moment.

Approval is only granted if:

- `requested amount ≤ available quantity`

If not, the request is rejected.

### Outcome

This prevents double allocation and ensures that the system never promises more food than actually exists.

---

## Scenario 2: Stale State (Unconsumed Approved Requests)

### Problem

A request may be approved but never acted upon, leaving the system in an inconsistent state indefinitely.

### Solution

Each request includes a timestamp (`createdAt`). The system periodically checks for stale approvals and expires them after a predefined duration.

Expired requests:

- Are marked as `expired`
- No longer block inventory usage

### Outcome

The system avoids “ghost reservations” and ensures that unused approvals do not distort inventory or cost calculations.

---

## Scenario 3: Identity Ambiguity (Identical Items)

### Problem

Multiple real-world items (e.g., two identical ketchup bottles) cannot be reliably tracked if identified only by name.

### Solution

Each item is assigned a **unique identifier (`id`)**, independent of its name or appearance.

### Outcome

Even visually identical items are treated as distinct entities, enabling accurate tracking of ownership, usage, and quantity.

---

## Scenario 4: Reality Desynchronization

### Problem

The physical state of the fridge may change without being reflected in the system (e.g., someone consumes food without logging it).

### Solution

The system provides a manual override mechanism that allows users to correct inventory by marking items as “gone.”

### Outcome

This ensures the system remains adaptable and can be corrected when it diverges from reality, preventing long-term inconsistencies.

---

## Key Engineering Decisions

- **In-memory state management** was used to keep the prototype simple and focused on logic rather than infrastructure.
- **Explicit state transitions** were implemented for requests to maintain clarity and control over lifecycle changes.
- **Validation at the time of action** (instead of relying on past state) ensures correctness under concurrent interactions.
- **Manual correction mechanisms** were intentionally included to handle real-world unpredictability.

---

## Assumptions

- All quantities are represented as percentages for simplicity.
- No authentication or user identity verification is implemented.
- Time-based expiry is simulated and manually triggered for demonstration purposes.
- The system operates in a single-session environment (no true multi-user backend).

---

## Conclusion

This prototype demonstrates how a seemingly simple system can fail under real-world conditions and how careful state management can prevent those failures.

The focus of this implementation is not feature richness, but **resilience under imperfect user behavior** — which is the core challenge in real-world software systems.
