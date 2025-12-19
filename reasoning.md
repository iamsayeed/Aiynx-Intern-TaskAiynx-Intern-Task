# Reasoning & Architecture

This document describes the technical decisions and architectural approach for the **App Graph Builder**.

## 1. Technology Stack Selection

### Core: React + Vite + TypeScript
- **Vite**: Chosen for its superior development experience (HMR) and build performance compared to CRA.
- **TypeScript**: Essential for a complex UI like a graph editor to ensure type safety for node data and props.

### UI Library: Tailwind CSS + shadcn/ui
- **Tailwind**: Provides utility-first styling for rapid development and consistency.
- **shadcn/ui**: Selected because it offers accessible, unstyled components (Radix UI) that we can fully own and customize. It avoids the "component library lock-in" while providing a robust foundation for complex inputs (Tabs, Sliders).

### Graph Visualization: ReactFlow (@xyflow/react)
- We needed a library that supports drag-and-drop, zooming, and custom node rendering out of the box.
- ReactFlow is the industry standard for React-based node editors, offering excellent performance and deep customization capabilities via custom node types.

### State Management: Zustand + TanStack Query
- **Separation of Concerns**: We separated **Server State** (data) from **Client State** (UI).
- **TanStack Query**: Handles data fetching, caching, loading/error states, and refetching. This eliminates the need for manual `useEffect` data loading and boilerplate.
- **Zustand**: Used for global UI state (`selectedAppId`, `isMobilePanelOpen`). It was chosen over Redux (too boilerplate) and Context API (performance concerns with frequent updates) for its simplicity and atomic updates.

### Mocking: Mock Service Worker (MSW)
- Instead of simple `setTimeout` promises, we used **MSW**.
- This intercepts requests at the network level (Service Worker), making the app behave *exactly* as it would with a real backend.
- **Benefit**: Switching to a real API in the future only requires disabling the MSW worker; the application code remains unchanged.

## 2. Architectural Decisions

### Feature-Based Folder Structure
Instead of grouping by functionality (e.g., `components`, `hooks`), we grouped by **Feature** to maintain high cohesion:
- `src/features/canvas`: Contains the Graph Canvas and custom Service Node.
- `src/features/inspector`: Contains the Right Panel and Node Inspector logic.
- `src/features/apps`: Contains the App List selection logic.

This makes the codebase easier to navigate and scale.

### Decoupled Data Flow
1.  **Selection**: When a node is clicked, we only update `selectedNodeId` in the Zustand store.
2.  **Reaction**: The `RightPanel` subscribes to this store value and conditionally renders the `NodeInspector`.
3.  **Updates**: The Inspector modifies the local ReactFlow state (via `useReactFlow`). This ensures immediate UI feedback (optimistic UI) while maintaining a source of truth.

### Responsive Design
- The layout uses a CSS Grid/Flexbox approach.
- The Right Panel automatically transforms into a slide-over Drawer on mobile devices (<1024px) to preserve screen real estate for the graph, managed by a simple boolean flag in the store.

## 3. Trade-offs & Future Improvements

-   **Persistence**: Currently, data edits are local to the graph instance and do not persist to the mock database. In a real app, we would implement `mutations` in TanStack Query to send `PATCH` requests.
-   **Edge Editing**: The current requirements focused on node inspection. Adding edge creation/deletion would require enabling ReactFlow's connection handles and additional event listeners.
-   **Testing**: We relied on TypeCheck and Linting. Unit tests for the custom Node logic and E2E visual tests (e.g., Playwright) would be a valuable addition.
