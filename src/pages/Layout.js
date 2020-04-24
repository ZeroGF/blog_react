import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";
import { BackTop } from "antd";
import "antd/dist/antd.css";
import "../static/css/common.less";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Index from "./Index";
import List from "./list";
import Detail from "./detail";
import Collect from "./Collect";
import Friends from "./friends";
import About from "./About";
import NotFound from "./Not404";
function Layout() {
  return (
    <div className="layout">
      <Router>
        <Header />
        <div className="layout-main">
          <Switch>
            {/* <Route path="/login" exact component={Login}></Route> */}
            {/* <Redirect from="/" to="/index" /> */}
            <Route path="/" exact component={Index}></Route>
            <Route path="/index" exact component={Index}></Route>
            <Route path="/list" exact component={List}></Route>
            <Route path="/detail/:id" exact component={Detail}></Route>
            <Route path="/collect" exact component={Collect}></Route>
            <Route path="/friends" exact component={Friends}></Route>
            <Route path="/about" exact component={About}></Route>
            <Route path="/404" component={NotFound} />
            <Route component={NotFound}></Route>
          </Switch>
        </div>
      </Router>
      <BackTop />
      <Footer />
    </div>
  );
}
export default Layout;
