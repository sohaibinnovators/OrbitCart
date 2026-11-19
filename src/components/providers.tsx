"use client";

import { StoreProvider } from "@/src/context/store";
import { CartDrawer } from "@/src/components/layout/CartDrawer";
import { SearchDialog } from "@/src/components/layout/SearchDialog";
import { ToastNotification } from "@/src/components/ui/ToastNotification";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <StoreProvider>
      {children}
      <CartDrawer />
      <SearchDialog />
      <ToastNotification />
    </StoreProvider>
  );
}
