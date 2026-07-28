"use client";

import { createContext, useCallback, useContext, useState } from "react";
import { PageLoader } from "@/components/ui/PageLoader";

const PageLoaderReadyContext = createContext(false);

/** True once the full-screen page loader has finished revealing the page. */
export function usePageLoaderReady() {
  return useContext(PageLoaderReadyContext);
}

type PageLoaderProviderProps = {
  children: React.ReactNode;
};

export function PageLoaderProvider({ children }: PageLoaderProviderProps) {
  const [isReady, setIsReady] = useState(false);
  const handleReady = useCallback(() => setIsReady(true), []);

  return (
    <PageLoaderReadyContext.Provider value={isReady}>
      <PageLoader onReady={handleReady} />
      {children}
    </PageLoaderReadyContext.Provider>
  );
}
