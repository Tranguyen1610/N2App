import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import LayoutCustom from './screen/LayoutCustom';
import LoginScreen from './screen/Login/LoginScreen';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginScreen />} />

        <Route path="/" element={<LayoutCustom name={"DashBoard"}/>} />
        <Route path="/Course" element={<LayoutCustom name={"Course"} />} />
        <Route path="/Order" element={<LayoutCustom name={"Order"} />} />
        <Route path="/Teacher" element={<LayoutCustom name={"Teacher"} />} />
        <Route path="/Student" element={<LayoutCustom name={"Student"} />} />
        <Route path="/Video" element={<LayoutCustom name={"Video"} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
