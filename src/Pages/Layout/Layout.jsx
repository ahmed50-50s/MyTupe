import { Outlet } from "react-router-dom";
import NavBar from "../../components/NavBar/NavBar";



export default function Layout(){
    return(
        <>  
            
            <NavBar />
            <div className="pt-17">
                <Outlet></Outlet>
            </div>
        </>
    )
}