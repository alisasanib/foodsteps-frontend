import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ConfigProvider } from "antd";
import { Posts, UserDetails } from "./pages";
import Page from "./layouts/Page";
import "./App.css";

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
        <Routes>
          <Route
            path='/'
            element={<Page />}>
            <Route
              index
              element={<Posts />}
            />{" "}
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
      </BrowserRouter>
    </ConfigProvider>
  );
}

export default App;
