import { RouterProvider, createBrowserRouter } from "react-router-dom";
import RootLayout from "./layout/RootLayout";
import "./index.css";
import { projects } from "./projects/projectsData";
import { Sidebar } from "lucide-react";

const childrenRoutes = [
  {
    index: true,
    element: (
      <>
        <div className="min-h-screen w-full max-w-full justify-center items-center flex gap-3 p-4">
          <div className="flex flex-row space-x-2 items-center rounded-md shadow-md p-4 bg-white">
            <Sidebar className="w-10 h-10 text-gray-800" />
            <p className="text-3xl text-gray-800 font-serif leading-5">
              Select a project from the sidebar
            </p>
          </div>
        </div>
      </>
    ),
  },
  ...projects.map((proj) => ({
    path: proj.path,
    element: <proj.component />,
  })),
];

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: childrenRoutes,
  },
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
