import {ReactElement, JSXElementConstructor, ReactNode, ReactPortal} from "react";
import {NavBar} from "../components/NavBar.tsx";
import SideBar from "../components/SideBar.tsx";


function Layout(props: { children: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | null | undefined; }) {

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