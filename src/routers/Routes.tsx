import React from "react";
import { BrowserRouter as Switch, Route, Routes } from "react-router-dom";
import routes from "./Pages";

const renderRoutes = () => {
  return (
    <Routes>
      {routes.map((item: any, index: number) => {
        return (
          <Route key={item.path} path={item.path} element={item.component} />
        );
      })}
    </Routes>
  );
};

export default renderRoutes;
