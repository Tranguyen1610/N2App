import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import ProtectedRoute from "./routing/ProtectedRoute";
import ProtectedRouteNoLogin from "./routing/ProtectedRouteNoLogin";
import LayoutCustom from "./screen/LayoutCustom";
import LoginScreen from "./screen/Login/LoginScreen";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/login"
          element={
            <ProtectedRouteNoLogin>
              <LoginScreen />
            </ProtectedRouteNoLogin>
          }
        />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <LayoutCustom name={"DashBoard"} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Course"
          element={
            <ProtectedRoute>
              <LayoutCustom name={"Course"} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/TeacherFee"
          element={
            <ProtectedRoute>
              <LayoutCustom name={"TeacherFee"} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Order"
          element={
            <ProtectedRoute>
              <LayoutCustom name={"Order"} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Teacher"
          element={
            <ProtectedRoute>
              <LayoutCustom name={"Teacher"} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Student"
          element={
            <ProtectedRoute>
              <LayoutCustom name={"Student"} />
            </ProtectedRoute>
          }
        />
        <Route
          path="/Video"
          element={
            <ProtectedRoute>
              <LayoutCustom name={"Video"} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
