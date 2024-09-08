import React from "react";
import ReactDOM from "react-dom/client";
import "./style.css";
import { QueryClientProvider } from "@tanstack/react-query";
import {
  createMemoryHistory,
  createRouter,
  RouterProvider,
} from "@tanstack/react-router";

// Import the generated route tree
import { routeTree } from "./routeTree.gen";
import { queryClient } from "@/entrypoints/popup/lib/query-client.ts";
import { Spinner } from "@nextui-org/react";

const memoryHistory = createMemoryHistory({
  initialEntries: ["/"], // Pass your initial url
});

// Create a new router instance
const router = createRouter({
  routeTree,
  history: memoryHistory,
  context: {
    queryClient,
  },
  defaultPendingComponent: () => (
    <div className="w-[400px] h-[600px] flex items-center justify-center">
      <Spinner />
    </div>
  ),
});

// Register the router instance for type safety
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>,
);
