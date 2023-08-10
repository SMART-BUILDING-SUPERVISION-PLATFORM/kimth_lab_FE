import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Member from "./components/auth";
import SignIn from "./components/auth/signin";
import SignUp from "./components/auth/signup";
import GlobalContainer from "./components/global/container";
import Main from "./pages";
import Admin from "./pages/admin";
import NewProjectForm from "./components/common/project/form";
import Newbie from "./components/admin/newbie";
import Manage from "./components/admin/manage";
import MyPage from "./pages/myPage";
import View from "./components/project/models/view";
import Project from "./pages/project";
import ProjectForParticipanting from "./components/mypage/outlet/project-participate";
import ProjectForPending from "./components/mypage/outlet/project-pending";
import Inspect from "./components/project/models/inspect";
import Process from "./components/project/models/process";
import UpdateProjectForm from "./components/project/updateProjectForm";

const Router = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/auth/signin" />} />

        {/* before loggin in */}
        <Route path="/auth" element={<Member />}>
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
        </Route>

        {/* after loggin in */}
        <Route element={<GlobalContainer />}>
          <Route path="home" element={<Main />} />
          <Route path="new" element={<NewProjectForm />} />
          <Route path="update/:projectId" element={<UpdateProjectForm />} />
          <Route path=":projectId" element={<Project />}>
            <Route path="view" element={<View />} />
            {/* rest of technical pages, for example */}
            <Route path="inspect" element={<Inspect />} />
            <Route path="process" element={<Process />} />
          </Route>
          <Route path=":id" element={<MyPage />}>
            <Route
              path="project-participanting"
              element={<ProjectForParticipanting />}
            />
            <Route path="project-pending" element={<ProjectForPending />} />
          </Route>
          {/* for administrator [SERVICE, COMPANY] */}
          <Route path="admin" element={<Admin />}>
            <Route path="pending" element={<Newbie />} />
            <Route path="manage" element={<Manage />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
