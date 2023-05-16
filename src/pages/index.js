import styled from "@emotion/styled";
import OverviewBox from "../components/common/project/overview/index";
import ProjectListContainer from "../components/common/project/projectList";
import { useEffect, useState } from "react";
import useApi from "../components/hooks/api/axiosInterceptor";

const MainContainer = styled.div`
  width: 100vw;
  height: 100vh;
  overflow: hidden;
  background-color: whitesmoke;
  display: flex;
  justify-content: start;
  flex-direction: column;
  align-items: center;
  color: white;
  font-size: 50px;
  padding: 0px 50px 40px 50px;
`;

// const dummyProjectList = [
//   {
//     id: 1,
//     name: "Sample Project 1",
//     startDate: "2023-01-01",
//     endDate: "2023-02-28",
//     processRate: 50,
//     thumbnailUrl:
//       "https://images.unsplash.com/photo-1534237710431-e2fc698436d0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YnVpbGRpbmd8ZW58MHx8MHx8&w=1000&q=80",
//     floorUrl:
//       "https://images.unsplash.com/photo-1534237710431-e2fc698436d0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8YnVpbGRpbmd8ZW58MHx8MHx8&w=1000&q=80",
//   },
//   {
//     id: 2,
//     name: "Sample Project 2",
//     startDate: "2023-03-15",
//     endDate: "2023-05-31",
//     processRate: 25,
//     thumbnailUrl:
//       "https://en.seoultech.ac.kr/storage/splash/SNUST1AFD6F09CE4647CAB9B66C50255213BC.png",
//     floorUrl:
//       "https://en.seoultech.ac.kr/storage/splash/SNUST1AFD6F09CE4647CAB9B66C50255213BC.png",
//   },
//   {
//     id: 3,
//     name: "Sample Project 3",
//     startDate: "2023-06-10",
//     endDate: "2023-07-20",
//     processRate: 75,
//     thumbnailUrl:
//       "https://uni24k.com/media/CACHE/images/unis/pic_school_14163_building_bf4edbb7/7459d22960f7b059ad4427e304e5e343.jpg",
//     floorUrl:
//       "https://uni24k.com/media/CACHE/images/unis/pic_school_14163_building_bf4edbb7/7459d22960f7b059ad4427e304e5e343.jpg",
//   },
//   {
//     id: 4,
//     name: "Sample Project 4",
//     startDate: "2023-04-01",
//     endDate: "2023-09-30",
//     processRate: 10,
//     thumbnailUrl:
//       "https://images.pexels.com/photos/302769/pexels-photo-302769.jpeg?cs=srgb&dl=pexels-pixabay-302769.jpg&fm=jpg",
//     floorUrl:
//       "https://images.pexels.com/photos/302769/pexels-photo-302769.jpeg?cs=srgb&dl=pexels-pixabay-302769.jpg&fm=jpg",
//   },
//   {
//     id: 5,
//     name: "Sample Project 5",
//     startDate: "2023-08-15",
//     endDate: "2023-12-31",
//     processRate: 90,
//     thumbnailUrl:
//       "https://koreajoongangdaily.joins.com/data/photo/2023/03/04/6370fba3-314e-4201-aff3-f9ae9655f40c.jpg",
//     floorUrl:
//       "https://koreajoongangdaily.joins.com/data/photo/2023/03/04/6370fba3-314e-4201-aff3-f9ae9655f40c.jpg",
//   },
// ];

const Main = () => {
  // TODO: admin 종류에 따라(id에 따라) 프로젝트 리스트 다르게 하는거
  const [projectList, setProjectList] = useState();
  const [params, setParams] = useState({
    name: null,
    ctrClass: null,
    detailCtrClass: null,
    companyId: null,
    onlyMine: false,
  });

  useEffect(() => {
    (async () => {
      const { data } = await useApi.get("/api/project", {
        params,
      });
      setProjectList(data);
    })();
  }, [params]);

  // console.log(projectList);

  return (
    <MainContainer>
      <OverviewBox />
      <ProjectListContainer projectList={projectList} />
    </MainContainer>
  );
};

export default Main;

// Main: 프로젝트 리스트 (overview)
// GlobalContainer: header, sidebar, sessionID에 따라 재로그인 alert
// ProjectListForm: Main 페이지의 한 프로젝트 프레임
// ProjectHome: [Sidebar - HOME]
// ProjectConstruction: [Sidebar - 시공감리]
// ProjectStructure: [Sidebar - 구조감리]
// ProjectRobot: [Sidebar - 로봇]
// ProjectDocs: [Sidebar - 도면/문서]
// ProjectSettings: [Sidebar - 설정]
