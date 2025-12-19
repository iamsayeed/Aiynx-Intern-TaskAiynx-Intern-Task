# App Graph Builder

A responsive React application for visualizing and interacting with service architecture graphs.

##Deployed Link : https://aiynx-task.vercel.app/

## Setup Instructions

1.  **Install Dependencies**:
    ```bash
    npm install
    ```

2.  **Start Development Server**:
    ```bash
    npm run dev
    ```
    The app will handle `msw` (Mock Service Worker) initialization automatically.

3.  **Run Checks**:
    - Lint: `npm run lint`
    - Typecheck: `npm run typecheck`

## Key Decisions

-   **Architecture**: Feature-based folder structure (`features/canvas`, `features/apps`, `features/inspector`) for scalability.
-   **Graph Library**: `ReactFlow` (@xyflow/react) chosen for its robustness and customization capabilities.
-   **State Management**: `Zustand` for client-side UI state (selection, panels) due to its simplicity and performance; `TanStack Query` for server state (apps, graphs) to handle caching and loading states.
-   **UI Components**: `shadcn/ui` (built on Radix UI) used for accessible, unstyled primitives styled with Tailwind CSS.
-   **Mocking**: `MSW` (Mock Service Worker) intercepts requests at the network level, providing a realistic API simulation without a backend.

## Known Limitations

-   **Data Persistence**: All changes (node names, positions) are local to the session and are reset on page reload because they are stored in simulated mock databases in memory.
-   **Edge Editing**: There is currently no UI to add or remove edges between nodes manually.
