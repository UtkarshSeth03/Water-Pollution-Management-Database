import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Login from "./pages/Login"
import ViewUserRequests from "./pages/ViewUserRequests"
import ViewLakeDetails from "./pages/ViewLakeDetails"
import ViewRiverDetails from "./pages/ViewRiverDetails"

function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path = "/" element = { <Login/> }/>
                    <Route path = "/home/:user" element = { <Home/> }/>
                    <Route path = "/admin/:user" element = { <Home/> }/>
                    <Route path = "/government/:user" element = { <Home/> }/>
                    <Route path = "/viewUserRequests/:user" element = { <ViewUserRequests/> }/>
                    <Route path = "/viewLakeDetails/:user" element = { <ViewLakeDetails/> }/>
                    <Route path = "/viewRiverDetails/:user" element = { <ViewRiverDetails/> }/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App