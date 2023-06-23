import { BrowserRouter, Routes, Route } from "react-router-dom";
import Member from "./components/auth";
import SignIn from "./components/auth/signin";
import SignUp from "./components/auth/signup";
import GlobalContainer from "./components/global/container";
import Main from "./pages";
import AdminCa from "./pages/admin/admin-ca";
import AdminSa from "./pages/admin/admin-sa";
import ProjectInfoForm from "./components/common/project/form";
import Newbie from "./components/admin/ca/newbie";
import MyPage from "./components/common/user";

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
          <Route path="/" element={<Main />} />

          <Route path="project">
            <Route path="add" element={<ProjectInfoForm />} />
            {/* <Route path=":projectId" /> */}
          </Route>

          <Route path="admin">
            <Route path="service" element={<AdminSa />}>
              {/* <Route path=":menu" /> */}
            </Route>
            <Route path="company" element={<AdminCa />}>
              <Route path="newbie" element={<Newbie />} />
            </Route>
          </Route>

          <Route path="my" element={<MyPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
