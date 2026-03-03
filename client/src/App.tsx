import * as React from "react";

// 1. import `HeroUIProvider` component
import { HeroUIProvider } from "@heroui/react";

import Dashboard from "./screens/Dashboard";

function App() {
  return (
    <HeroUIProvider>
      <Dashboard />
    </HeroUIProvider>
  );
}

export default App;
