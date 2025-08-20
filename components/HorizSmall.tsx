import HorizontalBox from "./HorizontalBox";

export default function HorizSmall() {
  return (
    <main>
      <div style={{ height: "100vh", background: "#eee" }}>Scroll down</div>

      <HorizontalBox debug>
  <div style={{ flex: "0 0 50vw", background: "tomato" }}>One</div>
  <div style={{ flex: "0 0 50vw", background: "skyblue" }}>Two</div>
  <div style={{ flex: "0 0 50vw", background: "limegreen" }}>Three</div>
  <div style={{ flex: "0 0 50vw", background: "orange" }}>Four</div>
</HorizontalBox>


      <div style={{ height: "100vh", background: "#ccc" }}>Scroll continues</div>
    </main>
  );
}
