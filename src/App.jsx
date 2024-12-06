import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./components/Homepage";
import Details from "./components/Details";
import Footer from "./components/Footer";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Homepage /> <Footer />
            </>
          }
        />
        <Route path="/details/:locationId" element={<Details />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
