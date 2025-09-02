"use client";
import { useState } from "react";

type ConfigField =
  | { type: "number"; key: string; label: string; min?: number; max?: number; step?: number }
  | { type: "boolean"; key: string; label: string }
  | { type: "select"; key: string; label: string; options: { label: string; value: any }[] };

interface DevConfigPanelProps<T extends Record<string, any>> {
  schema: ConfigField[];
  values: T;
  onChange: (values: T) => void;
  position?: "bottom-right" | "bottom-left" | "top-right" | "top-left";
}

export function DevConfigPanel1<T extends Record<string, any>>({
  schema,
  values,
  onChange,
  position = "bottom-left",
}: DevConfigPanelProps<T>) {
  const [open, setOpen] = useState(true);

  const panelPos: Record<string, string> = {
    "bottom-right": "bottom-4 right-4",
    "bottom-left": "bottom-4 left-4",
    "top-right": "top-4 right-4",
    "top-left": "top-4 left-4",
  };

  const handleChange = (key: string, newVal: any) => {
    onChange({ ...values, [key]: newVal });
  };

  return (
    <div className={`fixed z-50 ${panelPos[position]}`}>
      <button
        className="bg-gray-800 text-white text-sm px-2 py-1 rounded shadow"
        onClick={() => setOpen(!open)}
      >
        {open ? "Hide Config" : "Show Config"}
      </button>

      {open && (
        <div className="mt-2 w-64 bg-white shadow-lg rounded-lg p-3 space-y-3 border">
          {schema.map((field) => {
            switch (field.type) {
              case "number":
                return (
                  <div key={field.key} className="flex items-center justify-between">
                    <label className="text-sm">{field.label}</label>
                    <input
                      type="number"
                      value={values[field.key]}
                      min={field.min}
                      max={field.max}
                      step={field.step ?? 1}
                      onChange={(e) => handleChange(field.key, Number(e.target.value))}
                      className="border p-1 rounded w-20 text-sm"
                    />
                  </div>
                );
              case "boolean":
                return (
                  <div key={field.key} className="flex items-center justify-between">
                    <label className="text-sm">{field.label}</label>
                    <input
                      type="checkbox"
                      checked={values[field.key]}
                      onChange={(e) => handleChange(field.key, e.target.checked)}
                    />
                  </div>
                );
              case "select":
                return (
                  <div key={field.key} className="flex items-center justify-between">
                    <label className="text-sm">{field.label}</label>
                    <select
                      value={values[field.key]}
                      onChange={(e) => handleChange(field.key, e.target.value)}
                      className="border p-1 rounded text-sm"
                    >
                      {field.options.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </select>
                  </div>
                );
              default:
                return null;
            }
          })}
        </div>
      )}
    </div>
  );
}