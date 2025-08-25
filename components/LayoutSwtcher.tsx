// LayoutSwitcher.tsx
"use client";

import React, { useMemo, useState, cloneElement, type ReactElement } from "react";
import type { LayoutKind, LayoutConfig, LayoutOrchestraProps } from "./LayoutOrchestra";

export type LayoutType = LayoutKind;
export type LayoutOverrideMap = Partial<Record<LayoutType, Partial<LayoutConfig>>>;

type Controlled =
  | { value: LayoutType; onChange: (next: LayoutType) => void; defaultValue?: never }
  | { value?: never; onChange?: (next: LayoutType) => void; defaultValue?: LayoutType };

export type LayoutSwitcherProps = Controlled & {
  /** Must be a LayoutOrchestra element */
  children: ReactElement<LayoutOrchestraProps>;
  /** Which layouts to expose in the UI */
  layouts?: LayoutType[];
  /** Per-layout config overrides merged into child's config */
  overrides?: LayoutOverrideMap;
  /** Merge child's existing config first (default true) */
  keepChildConfig?: boolean;
  /** Optional wrapper class */
  className?: string;
  /** Custom controls renderer; receive current, setter, and the list */
  renderControls?: (current: LayoutType, set: (l: LayoutType) => void, layouts: LayoutType[]) => React.ReactNode;
}

const DEFAULT_LAYOUTS: LayoutType[] = ["row", "column", "grid", "circle", "arc", "spiral"];

export function LayoutSwitcher({
  children,
  layouts = DEFAULT_LAYOUTS,
  overrides,
  keepChildConfig = true,
  className,
  renderControls,
  ...ctrl
}: LayoutSwitcherProps) {
  // Controlled vs uncontrolled
  const [inner, setInner] = useState<LayoutType>(
    "defaultValue" in ctrl && ctrl.defaultValue ? ctrl.defaultValue : "row"
  );

  const current: LayoutType = "value" in ctrl && ctrl.value ? ctrl.value : inner;

  const setCurrent = (l: LayoutType) => {
    if ("onChange" in ctrl && ctrl.onChange) ctrl.onChange(l);
    if (!("value" in ctrl)) setInner(l);
  };

  // Merge configs: child's config → overrides for selected layout
  const childCfg = keepChildConfig ? ((children.props as LayoutOrchestraProps).config ?? {}) : {};
  const mergedCfg = useMemo(
    () => ({ ...childCfg, ...(overrides?.[current] ?? {}) }),
    [JSON.stringify(childCfg), JSON.stringify(overrides?.[current]), current]
  );

  const enhanced = useMemo(
    () =>
      cloneElement(children, {
        layout: current,
        config: mergedCfg,
      }),
    [children, current, mergedCfg]
  );

  return (
    <div className={className}>
      {renderControls
        ? renderControls(current, setCurrent, layouts)
        : <LayoutSwitcherButtons current={current} onSelect={setCurrent} layouts={layouts} />}
      {enhanced}
    </div>
  );
}

export function LayoutSwitcherButtons({
  current,
  onSelect,
  layouts,
}: {
  current: LayoutType;
  onSelect: (l: LayoutType) => void;
  layouts: LayoutType[];
}) {
  return (
    <div className="flex gap-2 flex-wrap mb-3">
      {layouts.map((l) => (
        <button
          key={l}
          onClick={() => onSelect(l)}
          className={`px-3 py-1 rounded-md border transition ${
            current === l
              ? "bg-teal-600 text-white border-teal-600"
              : "bg-white text-teal-600 border-teal-600 hover:bg-teal-50"
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
