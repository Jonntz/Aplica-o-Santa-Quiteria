import { createBrowserRouter } from "react-router-dom";
import { Layout } from "../components/Layout";
import { Communities } from "../pages/Communities";
import { CommunityDetail } from "../pages/CommunityDetail";
import { Events } from "../pages/Events";
import { Home } from "../pages/Home";
import { Liturgy } from "../pages/Liturgy";
import { Sacraments } from "../pages/Sacraments";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "eventos", element: <Events /> },
      { path: "liturgia", element: <Liturgy /> },
      { path: "sacramentos", element: <Sacraments /> },
      { path: "comunidades", element: <Communities /> },
      { path: "comunidades/:id", element: <CommunityDetail /> },
    ],
  },
]);
