import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';

import ScreenRoutes from './navigations/ScreenRoutes';
import DashBoardScreen from './screen/MainScreen';
import AppHeader from './components/AppHeader';
import { Space } from 'antd';
import SideMenu from './components/SideMenu';
import PageContent from './components/PageContent';
import AppFooter from './components/AppFooter';
import MainScreen from './screen/MainScreen';
function App() {
  return (
    <div className="App">
    {/* <ScreenRoutes/> */}
    {/* <AppHeader/>
    <Space className='SideMenuAndPageContent'>
    <SideMenu></SideMenu>
    <PageContent></PageContent>
    </Space>
    <AppFooter/> */}
    <MainScreen/>
    </div>
 
  );
}

export default App;
