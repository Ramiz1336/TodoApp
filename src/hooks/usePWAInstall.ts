import { useEffect, useState } from "react";
import { showToast, systemInfo } from "../utils";

export interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[];
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;
  prompt: () => Promise<void>;
}

// Module-level singleton to capture the event immediately upon bundle evaluation
let globalDeferredPrompt: BeforeInstallPromptEvent | null = null;
const listeners = new Set<(event: BeforeInstallPromptEvent | null) => void>();

if (typeof window !== "undefined") {
  window.addEventListener("beforeinstallprompt", (e: Event) => {
    e.preventDefault();
    globalDeferredPrompt = e as BeforeInstallPromptEvent;
    listeners.forEach((listener) => listener(globalDeferredPrompt));
  });

  window.addEventListener("appinstalled", () => {
    globalDeferredPrompt = null;
    listeners.forEach((listener) => listener(null));
  });
}

export function usePWAInstall() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(
    () => globalDeferredPrompt,
  );

  useEffect(() => {
    const listener = (prompt: BeforeInstallPromptEvent | null) => {
      setDeferredPrompt(prompt);
    };
    listeners.add(listener);
    return () => {
      listeners.delete(listener);
    };
  }, []);

  const isAppInstalled = systemInfo.isPWA;
  const isPWAEligible = "serviceWorker" in navigator && !isAppInstalled;
  const canInstall = isPWAEligible && (deferredPrompt !== null || systemInfo.os === "iOS");

  const promptInstall = async (onAccepted?: () => void) => {
    if (deferredPrompt) {
      try {
        await deferredPrompt.prompt();
        const choiceResult = await deferredPrompt.userChoice;
        if (choiceResult.outcome === "accepted") {
          globalDeferredPrompt = null;
          setDeferredPrompt(null);
          onAccepted?.();
        } else {
          showToast("Installation dismissed.", { type: "error" });
        }
      } catch (err) {
        console.error("PWA install error:", err);
      }
      return;
    }

    if (systemInfo.os === "iOS") {
      showToast(
        "To install on iOS: tap the Share button in Safari and choose 'Add to Home Screen'.",
        { duration: 6000, type: "blank" },
      );
      return;
    }

    showToast(
      "To install the app, click the install icon (⊕) in your browser address bar or menu.",
      { duration: 5000, type: "blank" },
    );
  };

  return {
    canInstall,
    isPWAEligible,
    isAppInstalled,
    deferredPrompt,
    install: () => promptInstall(),
    promptInstall,
  };
}
