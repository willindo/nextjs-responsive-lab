'use client'
import HorizontalBox from "./HorizontalBox";

export default function HorizSmall() {
  return (
    <main>
      <HorizontalBox debug>
        <div style={{ flex: "0 0 50vw", background: "tomato" }}>One</div>
        <div style={{ flex: "0 0 50vw", background: "skyblue" }}>Two</div>
        <div style={{ flex: "0 0 50vw", background: "limegreen" }}>Three</div>
        <div style={{ flex: "0 0 50vw", background: "orange" }}>Four</div>
      </HorizontalBox>
    </main>
  );
}
