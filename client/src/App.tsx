import type {JSX} from "react";
import Home from "./pages/Home";
import {COLORS} from "./const/colors";

const App = (): JSX.Element => {
  return (
    <>
      <main
        style={{
          height: "100vh",
          width: "100vw",
          backgroundColor: COLORS.background.primary,
          margin: 0,
          padding: 0,
          overflow: "hidden",
          color: COLORS.text.primary,
        }}
      >
        <Home />
      </main>
    </>
  );
};

export default App;
