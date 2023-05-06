import { Space } from "antd";
import AppFooter from "../../components/AppFooter";
import AppHeader from "../../components/AppHeader";
import SideMenu from "../../components/SideMenu";
import DashBoardScreen from "./DashBoardScreen";

export default function DashBoardLayout() {
    return (
        <div className='Main'>
            <AppHeader />
            <Space className='SideMenuAndPageContent'>
                <SideMenu/>
                <div className='PageContent'>
                    <DashBoardScreen />
                </div>
            </Space>
            <AppFooter />
        </div>
    )
}