import { useState } from "react";
import { LayoutOrchestra, type LayoutKind } from "@/components/LayoutOrchestra";
import { LayoutSwitcher, LayoutSwitcherButtons, type LayoutOverrideMap } from "@/components/LayoutSwitcher";
import { DevConfigPanel } from "./DevConfiPanel";
const overrides: LayoutOverrideMap = {
  circle: { radius: 180, angleStart: -90, rotateWithTangent: true },
  arc: { radius: 240, angleStart: -45, sweep: 90, rotateWithTangent: true },
  spiral: { spiralA: 12, spiralB: 16, spiralStepDeg: 36 },
};

export function LayoutController() {

  const [layout, setLayout] = useState<LayoutKind>("row");
  const items = Array.from({ length: 8 }, (_, i) => <div key={i} className="w-10 h-10 rounded-full bg-purple-500" />);

  return (
    <>
      <LayoutSwitcherButtons current={layout} onSelect={setLayout} layouts={["row","circle","arc","spiral"]} />
      <LayoutSwitcher {...config} value={layout} onChange={setLayout} overrides={overrides}>
        <LayoutOrchestra width={560} height={360} />
      </LayoutSwitcher>
      {/* children can also be passed later */}
      <LayoutOrchestra width={560} height={360} layout={layout} config={overrides[layout]} animate>
        {items}
      </LayoutOrchestra>
    </>
  );
}
