import "regenerator-runtime/runtime";
import { useEffect } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import BottomNav from "./components/common/bottomnav";
import Landing from "./pages/landing";
import OnBoarding from "./pages/login/onboarding";
import GoogleLogin from "./pages/login/googlelogin";
import AddInfomation from "./pages/login/addinformation";
import Sing from "./pages/contents/sing";
import SingList from "./pages/contents/sing/list";
import SingArtist from "./pages/contents/sing/artist";
import SingGame from "./pages/contents/sing/game";
import Drama from "./pages/contents/drama";
import DramaList from "@/pages/contents/drama/components/dramaList";
import DramaShadowing from "@/pages/contents/common/dramashadowing";
import Entertainment from "./pages/contents/entertainment";
import EntertainmentList from "@/pages/contents/entertainment/components/entertainmentList";
import EntertainmentShadowing from "@/pages/contents/common/entertainmentshadowing";
import Learning from "./pages/learning";
import LearningLife from "./pages/learning/life";
import LearningChatbot from "./pages/learning/chatbot/index";
import LearningResultList from "./pages/learning/result/list";
import LearningResultDetail from "./pages/learning/result/detail";
import Ranking from "./pages/ranking";
import MyPage from "./pages/mypage";
import MyPageEdit from "./pages/mypage/components/edit";
import Contents from "./pages/contents";
import "./App.css";
import LearningLifeChat from "./pages/learning/life/lifechat";
import DramaListPage from "./pages/contents/drama/components/dramalistpage";
import EntertainmentListPage from "./pages/contents/entertainment/components/entertainmentlistpage";

function App() {
  // TopNav를 숨길 페이지 path
  // const hiddenTopPaths = ["/"];
  // BottomNav를 숨길 페이지 path
  const hiddenBottomPaths = [
    "/",
    "/login",
    "/addinformation",
    "/oauth/redirect",
    "/sing/game/:id",
    "/learning/chatbot",
    "/learning/lifechat",
    "/learning/resultdetail",
    (path: any) => path.startsWith("/sing/game/") && !isNaN(path.split("/")[3]),
    (path: any) =>
      path.startsWith("/entertainment/shadowing/") &&
      !isNaN(path.split("/")[3]),
    (path: any) =>
      path.startsWith("/drama/shadowing/") && !isNaN(path.split("/")[3]),
  ];

  const Routing = () => {
    const location = useLocation();
    const shouldHiddenBottom = hiddenBottomPaths.some((pathOrFunc) =>
      typeof pathOrFunc === "function"
        ? pathOrFunc(location.pathname)
        : location.pathname === pathOrFunc
    );
    return (
      <>
        {/* 위에서 보여줄 TopNav */}
        {/* {!hiddenTopPaths.includes(location.pathname) && <TopNav />} */}
        <Routes>
          {/* 라우팅 할 페이지들 */}
          {/* 랜딩페이지 */}
          <Route path="/" element={<Landing />} />
          {/* 로그인페이지 */}
          <Route path="/login" element={<OnBoarding />} />
          {/* 여기는 구글로그인 성공시 리다이렉트 될 페이지 작업할려고 올려둔거 */}
          <Route path="/oauth/redirect" element={<GoogleLogin />} />
          <Route path="/addinformation" element={<AddInfomation />} />
          {/* 콘텐츠페이지 */}
          <Route path="/contents" element={<Contents />} />
          {/* 노래 */}
          <Route path="/sing" element={<Sing />} />
          <Route path="/sing/list" element={<SingList />} />
          <Route path="/sing/artist" element={<SingArtist />} />
          <Route path="/sing/game/:id" element={<SingGame />} />
          {/* 드라마, 예능 페이지 */}
          <Route path="/drama" element={<Drama />} />
          <Route path="/drama/list/:id" element={<DramaList />} />
          <Route path="/drama/list" element={<DramaListPage />} />
          <Route path="/drama/shadowing/:id" element={<DramaShadowing />} />
          <Route path="/entertainment" element={<Entertainment />} />
          <Route
            path="/entertainment/list"
            element={<EntertainmentListPage />}
          />
          <Route
            path="/entertainment/list/:id"
            element={<EntertainmentList />}
          />
          <Route
            path="/entertainment/shadowing/:id"
            element={<EntertainmentShadowing />}
          />
          {/* 학습페이지 */}
          <Route path="/learning" element={<Learning />} />
          <Route path="/learning/life" element={<LearningLife />} />
          <Route path="/learning/lifechat" element={<LearningLifeChat />} />
          <Route path="/learning/chatbot" element={<LearningChatbot />} />
          <Route path="/learning/resultlist" element={<LearningResultList />} />
          <Route
            path="/learning/resultdetail"
            element={<LearningResultDetail />}
          />
          {/* 랭킹페이지 */}
          <Route path="/ranking" element={<Ranking />} />
          {/* 마이페이지 */}
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/mypage/edit" element={<MyPageEdit />} />
        </Routes>
        {!shouldHiddenBottom && <BottomNav />}
      </>
    );
  };

  return <Routing />;
}

export default App;
