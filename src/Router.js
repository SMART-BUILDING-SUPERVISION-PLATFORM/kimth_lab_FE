import { BrowserRouter, Routes, Route } from "react-router-dom";
import Member from "./components/member";
import SignIn from "./components/member/signin";
import SignUp from "./components/member/signup";
import Forgot from "./components/member/forgot";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Member />}>
          <Route path="/signin" element={<SignIn />} />
          {/* <Route path="/signin" element={<SignUp />} /> */}
          {/* <Route path="/signin" element={<Forgot />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
