import { Container } from "@mui/material";
// import Loader from "./components/hocs/Loader"
import Navbar from "./components/ui/Navbar";
// import { useAppSelector } from './redux/hooks';
import { Route, Routes } from "react-router-dom";
import MainPage from "./components/pages/MainPage";
import BrowsePage from "./components/pages/BrowsePage";
// import PrivateRouter from "./components/hocs/PrivateRouter";
// import AuthPage from "./components/pages/AuthPage";
import LoginPage from "./components/pages/LoginPage";
import PrivateRouter from "./components/hocs/PrivateRouter";
import { useAppSelector } from "./redux/hooks";

function App(): JSX.Element {

  const user = useAppSelector((store) => store.user)
  return (

    <>
      <Navbar />
      <Container>
        <Routes>

          <Route path="/" element={< MainPage />} />

          <Route element={<PrivateRouter isAllowed={user.data.status === 'guest'}/>}>
            <Route path="/login" element={<LoginPage />} />
          </Route>
          
          <Route element={<PrivateRouter isAllowed={user.data.status === 'logged'}  />}>
          <Route path="/browse" element={< BrowsePage />} />
          </Route> 



        </Routes>
      </Container>
    </>

  )
}

export default App
