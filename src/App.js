import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Header from "./components/Header";
import "./App.css";
import Home from "./components/Home";
import Detail from "./components/Detail";
import { useSelector } from "react-redux";
import { selectUserName } from "./feature/user/userSlice";

const basename =
  process.env.NODE_ENV === "production" ? process.env.PUBLIC_URL : "/";

function App() {
  const userName = useSelector(selectUserName);

  return (
    <div className="App">
      <Router basename={basename}>
        <Header />
        <Routes>
          <Route
            path="/"
            element={!userName ? <Login /> : <Navigate to="/home" />}
          />
          <Route
            path="/home"
            element={userName ? <Home /> : <Navigate to="/" />}
          />
          <Route
            path="/detail/:id"
            element={userName ? <Detail /> : <Navigate to="/" />}
          />
          <Route path="*" element={<Navigate to="/" />} />

        </Routes>
      </Router>
    </div>
  );
}

export default App;
