import { ToastProvider } from "@heroui/toast";
import { HeroUIProvider } from "@heroui/react";

import Dashboard from "./screens/Dashboard";

function App() {
  return (
    <HeroUIProvider>
      <ToastProvider placement="top-right" />
      <Dashboard />
    </HeroUIProvider>
  );
}

export default App;
