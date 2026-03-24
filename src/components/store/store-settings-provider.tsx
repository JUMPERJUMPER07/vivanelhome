"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { defaultStoreSettings, type StoreSettings } from "@/lib/store";

type StoreSettingsContextValue = {
  settings: StoreSettings;
  isLoading: boolean;
  updateSettings: (nextSettings: StoreSettings) => Promise<void>;
};

const StoreSettingsContext = createContext<StoreSettingsContextValue | null>(null);

export function StoreSettingsProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<StoreSettings>(defaultStoreSettings);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadSettings() {
      try {
        const response = await fetch("/api/store-settings", { cache: "no-store" });
        const data = (await response.json()) as { settings?: StoreSettings };

        if (data.settings) {
          setSettings(data.settings);
        }
      } finally {
        setIsLoading(false);
      }
    }

    void loadSettings();
  }, []);

  async function updateSettings(nextSettings: StoreSettings) {
    const response = await fetch("/api/store-settings", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nextSettings),
    });

    if (!response.ok) {
      throw new Error("Failed to update store settings");
    }

    const data = (await response.json()) as { settings: StoreSettings };
    setSettings(data.settings);
  }

  const value = useMemo(
    () => ({
      settings,
      isLoading,
      updateSettings,
    }),
    [settings, isLoading],
  );

  return <StoreSettingsContext.Provider value={value}>{children}</StoreSettingsContext.Provider>;
}

export function useStoreSettings() {
  const context = useContext(StoreSettingsContext);

  if (!context) {
    throw new Error("useStoreSettings must be used inside StoreSettingsProvider");
  }

  return context;
}
