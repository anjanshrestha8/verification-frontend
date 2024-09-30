import { BrowserRouter, Routes, Route } from "react-router-dom";
import App from "./App";
import Success from "./Success";
function Router() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}></Route>
          <Route path="/success" element={<Success />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default Router;
