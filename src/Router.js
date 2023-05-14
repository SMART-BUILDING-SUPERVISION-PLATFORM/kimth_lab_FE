import { BrowserRouter, Routes, Route } from "react-router-dom";
import Member from "./components/auth";
import SignIn from "./components/auth/signin";
import SignUp from "./components/auth/signup";
import GlobalContainer from "./components/global/container";
import Main from "./pages";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<Member />}>
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
        </Route>
        {/* static */}
        <Route path="/" element={<GlobalContainer />}>
          {/* Outlet Position /components/global/container/index.js */}
          <Route path="/" element={<Main />} />
          {/* <Route path="project:id" element={<Main />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
