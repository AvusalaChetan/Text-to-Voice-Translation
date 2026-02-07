import type {JSX} from "react";
import Home from "./pages/Home";

const App = (): JSX.Element => {
  return (
    <main className="min-h-screen w-full text-white">
      <Home />
    </main>
  );
};

export default App;
