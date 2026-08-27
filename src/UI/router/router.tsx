import { createBrowserRouter } from "react-router-dom"
import App from "../App"
import Dashboard from "../pages/dashboard/dashboard"
import Setting from "../pages/setting/setting"
import Collection from "../pages/collection/collection"


const router = createBrowserRouter([
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
            }
        ]
    }])


export default router;