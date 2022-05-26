import {Route, Routes} from "react-router-dom";
import MainPage from "../pages/MainPage";
import CrudPage from "../pages/CrudPage";

const AppRouter =() =>{
    return (
        <Routes>
            <Route path='/' element={<MainPage/>}></Route>
            <Route path='/new' element={<CrudPage/>}></Route>
        </Routes>
    )
}

export default AppRouter