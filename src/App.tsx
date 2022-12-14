import { render } from "react-dom";
import { createContext, StrictMode, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleRight,
  faCircleInfo,
  faHouse,
  faPaste,
} from "@fortawesome/free-solid-svg-icons";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { trpc } from "./client";

import Home from "./Components/Home";
import Header from "./Components/Header";
import About from "./Components/About";
import MyDocuments from "./Components/MyDocuments";

export const AppContext = createContext<[boolean, (open: boolean) => void]>([
  true,
  () => {},
]);

const ROUTES_TITLES: { [path: string]: string } = {
  "/": "Início",
  "/my-documents": "Meus Documentos",
  "/about": "Sobre",
};

const App = () => {
  const [open, setOpen] = useState(true);

  const location = useLocation();

  console.log("hash", location.hash);
  console.log("pathname", location.pathname);
  console.log("search", location.search);

  const refatLocation = location.pathname.toString().replace("/", "");
  console.log("ref", refatLocation);

  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: "http://localhost:4000/trpc",
          // optional
          // headers() {
          //   return {
          //     authorization: getAuthCookie(),
          //   };
          // },
        }),
      ],
    })
  );

  return (
    <StrictMode>
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <AppContext.Provider value={[open, setOpen]}>
            <header>
              <Header></Header>
            </header>
            <div className="flex h-screen">
              <nav
                className={`border-r border-gray max-md:absolute max-md:z-10 bg-white ${
                  open ? "" : "max-md:hidden"
                } h-full`}
              >
                <ul>
                  <li className="items-center text-gray-low text-sm p-2 border-b border-gray ">
                    <Link
                      className={`flex justify-between ${
                        location.pathname === "/"
                          ? "text-blue"
                          : "text-gray-low"
                      }`}
                      to="/"
                    >
                      <span className={`${open ? "" : "hidden"}`}>Início</span>
                      <FontAwesomeIcon
                        className=" h-[1rem] ml-2"
                        icon={faHouse}
                      />
                    </Link>
                  </li>
                  <li className="items-center text-gray-low text-sm p-2 border-b border-gray">
                    <Link
                      className={`flex justify-between ${
                        location.pathname === "/my-documents"
                          ? "text-blue"
                          : "text-gray-low"
                      }`}
                      to="/my-documents"
                    >
                      <span className={`${open ? "" : "hidden"}`}>
                        Meus Documentos
                      </span>
                      <FontAwesomeIcon
                        className=" h-[1rem] ml-2"
                        icon={faPaste}
                      />
                    </Link>
                  </li>
                  <li className=" items-center text-gray-low text-sm p-2 border-b border-gray">
                    <Link
                      className={`flex justify-between ${
                        location.pathname === "/about"
                          ? "text-blue"
                          : "text-gray-low"
                      }`}
                      to="/about"
                    >
                      <span className={`${open ? "" : "hidden"}`}>Sobre</span>
                      <FontAwesomeIcon
                        className=" h-[1rem] ml-2"
                        icon={faCircleInfo}
                      />
                    </Link>
                  </li>
                </ul>
              </nav>
              <main className="container py-4 px-2">
                <div className="grid grid-cols-12 gap-x-2">
                  <div className="col-span-12">
                    <ul className="flex text-xs p-2">
                      <li className="items-center text-blue ">
                        <Link className={``} to="/">
                          {ROUTES_TITLES["/"]}
                        </Link>
                      </li>
                      {location.pathname !== "/" && (
                        <>
                          <li className="items-center text-blue">
                            <FontAwesomeIcon
                              className={` h-[0.5rem] ml-2 ${
                                location.pathname === "/" ? "hidden" : ""
                              }`}
                              icon={faAngleRight}
                            />
                          </li>
                          <li className="items-center text-gray-low">
                            <span className="px-2">
                              {ROUTES_TITLES[location.pathname]}
                            </span>
                          </li>
                        </>
                      )}
                    </ul>
                  </div>
                  <div className="col-span-12">
                    <Routes>
                      <Route path="/" element={<Home />} />
                      <Route path="/my-documents" element={<MyDocuments />} />
                      <Route path="/about" element={<About />} />
                      {/* <Route path="/details/:id" element={<Details />} />
            <Route path="/" element={<SearchParams />} /> */}
                    </Routes>
                  </div>
                </div>
              </main>
            </div>
          </AppContext.Provider>
        </QueryClientProvider>
      </trpc.Provider>
    </StrictMode>
  );
};

render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);
