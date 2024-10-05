import React, { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ConfigProvider } from "antd";
import "./App.css";

const Posts = lazy(() => import("./pages/Posts"));
const UserDetails = lazy(() => import("./pages/UserDetails"));
const Page = lazy(() => import("./layouts/Page"));

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "'Helvetica Neue', sans-serif",
          colorPrimary: "black",
        },
      }}>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route
              path='/'
              element={<Page />}>
              <Route
                index
                element={<Posts />}
              />
              <Route
                path='posts'
                element={<Posts />}
              />
              <Route
                path='active-user'
                element={<UserDetails />}
              />
              <Route
                path='*'
                element={<Posts />}
              />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
