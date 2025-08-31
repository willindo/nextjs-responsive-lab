"use client";
import React, { createContext, useContext, useState } from "react";
import { motion } from "framer-motion";

// ------------------ types ------------------
type ShapeType = "line" | "circle" | "wave" | "custom";

interface ShapeSettings {
    shape: ShapeType;
    // generator params
    amplitude: number;
    frequency: number;
    radius: number;
    segments: number;
    // custom path text
    customPath: string;
    // global transform inputs
    offsetX: number;
    offsetY: number;
    rotate: number;
    scaleX: number;
    scaleY: number;
}

// ------------------ context ------------------
const ShapeContext = createContext<{
    settings: ShapeSettings;
    setSettings: React.Dispatch<React.SetStateAction<ShapeSettings>>;
} | null>(null);

export const ShapeProvider = ({ children }: { children: React.ReactNode }) => {
    const [settings, setSettings] = useState<ShapeSettings>({
        shape: "line",
        amplitude: 50,
        frequency: 2,
        radius: 80,
        segments: 20,
        customPath: "M0,0 L100,0",
        offsetX: 0,
        offsetY: 0,
        rotate: 0,
        scaleX: 1,
        scaleY: 1,
    });

    return (
        <ShapeContext.Provider value={{ settings, setSettings }}>
            {children}
        </ShapeContext.Provider>
    );
};

export const useShape = () => {
    const ctx = useContext(ShapeContext);
    if (!ctx) throw new Error("useShape must be used within ShapeProvider");
    return ctx;
};

// ------------------ path generator hook ------------------
export const useShapePath = () => {
    const { settings } = useShape();
    const { shape, amplitude, frequency, radius, segments, customPath, offsetX, offsetY, rotate, scaleX, scaleY } =
        settings;

    let path = "";
    if (shape === "line") {
        path = `M0,0 L200,0`;
    } else if (shape === "circle") {
        path = `M ${radius},0 A ${radius},${radius} 0 1,0 ${-radius},0 A ${radius},${radius} 0 1,0 ${radius},0`;
    } else if (shape === "wave") {
        const step = 200 / segments;
        let d = `M0,0`;
        for (let i = 0; i < segments; i++) {
            const x1 = i * step + step / 2;
            const y1 = amplitude * Math.sin((i * Math.PI) / frequency);
            const x2 = (i + 1) * step;
            const y2 = amplitude * Math.sin(((i + 1) * Math.PI) / frequency);
            d += ` Q ${x1},${y1} ${x2},${y2}`;
        }
        path = d;
    } else if (shape === "custom") {
        path = customPath;
    }

    const transform = `translate(${offsetX},${offsetY}) rotate(${rotate}) scale(${scaleX},${scaleY})`;

    return { path, transform };
};

// ------------------ control panel ------------------
export const ShapeControlPanel = () => {
    const { settings, setSettings } = useShape();

    const update = (field: keyof ShapeSettings, value: any) => {
        setSettings((s) => ({ ...s, [field]: value }));
    };

    return (
        <div className="p-3 space-y-4 bg-gray-50 rounded-lg shadow">
            {/* dropdown */}
            <select
                value={settings.shape}
                onChange={(e) => update("shape", e.target.value as ShapeType)}
            >
                <option value="line">Line</option>
                <option value="circle">Circle</option>
                <option value="wave">Wave</option>
                <option value="custom">Custom</option>
            </select>

            {/* generator inputs */}
            {settings.shape === "circle" && (
                <div>
                    <label>Radius: {settings.radius}</label>
                    <input
                        type="range"
                        min={10}
                        max={200}
                        step={1}
                        value={settings.radius}
                        onChange={(e) => update("radius", Number(e.target.value))}
                    />
                </div>
            )}

            {settings.shape === "wave" && (
                <>
                    <div>
                        <label>Amplitude: {settings.amplitude}</label>
                        <input
                            type="range"
                            min={10}
                            max={100}
                            step={1}
                            value={settings.amplitude}
                            onChange={(e) => update("amplitude", Number(e.target.value))}
                        />

                    </div>
                    <div>
                        <label>Frequency: {settings.frequency}</label>
                        <input
                            type="range"
                            min={1}
                            max={10}
                            step={1}
                            value={settings.frequency}
                            onChange={(e) => update("frequency", Number(e.target.value))}
                        />
                    </div>
                    <div>
                        <label>Segments: {settings.segments}</label>
                        <input
                            type="range"
                            min={2}
                            max={50}
                            step={1}
                            value={settings.segments}
                            onChange={(e) => update("segments", Number(e.target.value))}
                        />
                    </div>
                </>
            )}

            {settings.shape === "custom" && (
                <textarea
                    className="w-full border p-2 rounded"
                    rows={3}
                    value={settings.customPath}
                    onChange={(e) => update("customPath", e.target.value)}
                />
            )}

            {/* global transform inputs */}
            <div><label>OffsetX: {settings.offsetX}</label>
                 <input
    type="range"
    min={-200}
    max={200}
    step={1}
    value={settings.offsetX}
    onChange={(e) => update("offsetX", Number(e.target.value))}
  />
            </div>
            <div><label>OffsetY: {settings.offsetY}</label>
                <input
    type="range"
    min={-200}
    max={200}
    step={1}
    value={settings.offsetY}
    onChange={(e) => update("offsetY", Number(e.target.value))}
  />
            </div>
            <div><label>Rotate: {settings.rotate}</label>
                <input
    type="range"
    min={-180}
    max={180}
    step={1}
    value={settings.rotate}
    onChange={(e) => update("rotate", Number(e.target.value))}
  />
            </div>
            <div><label>ScaleX: {settings.scaleX}</label>
                <input
    type="range"
    min={0.1}
    max={3}
    step={0.1}
    value={settings.scaleX}
    onChange={(e) => update("scaleX", Number(e.target.value))}
  />
            </div>
            <div><label>ScaleY: {settings.scaleY}</label>
                <input
    type="range"
    min={0.1}
    max={3}
    step={0.1}
    value={settings.scaleY}
    onChange={(e) => update("scaleY", Number(e.target.value))}
  />
            </div>
        </div>
    );
};

// ------------------ usage demo ------------------
export default function Demo() {
    const { path, transform } = useShapePath();
    return (
        <div className="flex gap-6">
            <ShapeControlPanel />
            <svg width={400} height={200} className="border bg-white">
                <motion.path d={path} stroke="blue" fill="transparent" transform={transform} />
            </svg>
        </div>
    );
}
