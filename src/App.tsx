import { BrowserRouter, Routes } from "react-router-dom";
import RouterWrapper from "./routers/Routes";

function App() {
  return (
    <BrowserRouter>
      <RouterWrapper />
    </BrowserRouter>
  );
}

export default App;
