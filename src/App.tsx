import { BrowserRouter, Route, Routes } from "react-router-dom";
import { HomePage } from "./pages/Homepage";
import SignInPage from "./pages/SignInPage";

function App() {
  return (
    <>
      {/* <HomePage /> */}
      {/* <SignInPage /> */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="/signin" element={<SignInPage />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
