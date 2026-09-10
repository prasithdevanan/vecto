import { createHashRouter } from "react-router-dom"
import App from "../App"
import Dashboard from "../pages/dashboard/dashboard"
import Setting from "../pages/setting/setting"
import Collection from "../pages/collection/collection"
import SvgDetails from "../pages/dashboard/svgDetails";


const router = createHashRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                index: true,
                element: <Dashboard />
            },
            {
                path: "/collection",
                element: <Collection />
            },
            {
                path: "/settings",
                element: <Setting />
            },
            {
                path: "/svgDetails",
                element: <SvgDetails />
            }
        ]
    }])


export default router;