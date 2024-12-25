import {ReactElement} from "react";
import {NavBar} from "../components/NavBar.tsx";
import SideBar from "../components/SideBar.tsx";


function Layout(props: { children: ReactElement }) {

    return (
            <div>
                <NavBar />
                <div className={'flex'}>
                    <SideBar />
                    {props.children}
                </div>
            </div>
    );
}

export default Layout;