"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useConfig } from "@/components/contexts/ConfigContext";
import type { Config } from "@/components/contexts/ConfigContext";

type Target = { id: string; label: string };

type DevLinkState = {
  // panel's live draft (used when attached to targets)
  draft: Config;
  setDraft: React.Dispatch<React.SetStateAction<Config>>;

  // registry + attach/detach
  targets: Target[];
  connectedIds: string[];
  register: (id: string, label?: string) => void;
  unregister: (id: string) => void;
  connect: (id: string) => void;
  disconnect: (id: string) => void;
  isConnected: (id: string) => boolean;
};

const DevLinkContext = createContext<DevLinkState | null>(null);

export function DevLinkProvider({ children }: { children: React.ReactNode }) {
  const { config: globalConfig } = useConfig();
  const [draft, setDraft] = useState<Config>(globalConfig);
  const [targets, setTargets] = useState<Target[]>([]);
  const [connectedIds, setConnectedIds] = useState<string[]>([]);

  // Keep draft in sync with global when nothing is attached
  useEffect(() => {
    if (connectedIds.length === 0) setDraft(globalConfig);
  }, [globalConfig, connectedIds.length]);

  const register = (id: string, label?: string) =>
    setTargets((list) => (list.some((t) => t.id === id) ? list : [...list, { id, label: label ?? id }]));

  const unregister = (id: string) => {
    setTargets((list) => list.filter((t) => t.id !== id));
    setConnectedIds((ids) => ids.filter((x) => x !== id));
  };

  const connect = (id: string) =>
    setConnectedIds((ids) => (ids.includes(id) ? ids : [...ids, id]));

  const disconnect = (id: string) =>
    setConnectedIds((ids) => ids.filter((x) => x !== id));

  const isConnected = (id: string) => connectedIds.includes(id);

  const value: DevLinkState = {
    draft,
    setDraft,
    targets,
    connectedIds,
    register,
    unregister,
    connect,
    disconnect,
    isConnected,
  };

  return <DevLinkContext.Provider value={value}>{children}</DevLinkContext.Provider>;
}

export function useDevLink() {
  const ctx = useContext(DevLinkContext);
  if (!ctx) throw new Error("useDevLink must be used inside DevLinkProvider");
  return ctx;
}

/** Components call this to get the *effective* config.
 * If attached, you get the panel's draft; else you get the global config.
 * Also registers/unregisters the component as a selectable target.
 */
export function useDevLinkedConfig(devId: string, label: string, global: Config) {
  const { register, unregister, isConnected, draft } = useDevLink();

  useEffect(() => {
    register(devId, label);
    return () => unregister(devId);
  }, [devId, label, register, unregister]);

  return isConnected(devId) ? draft : global;
}
