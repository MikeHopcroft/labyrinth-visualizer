import Head from 'next/head'
import React from "react";

import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

import SplitPane from 'react-split-pane'

import Analyze from './analyze-mode';
import Editor from './editor';
import Info from './info';
import NavBar from './nav-bar';
import NotFound from './page-not-found';
import Welcome from './welcome-mode';
import { RouteComponentProps, withRouter } from "react-router";

class FrameBody extends React.Component<RouteComponentProps<any>> {
  render() {
    console.log(JSON.stringify(this.props));

    let display = 'none';
    let path = 'config.yaml';

    if (this.props.location.pathname === '/network') {
      display = 'block';
    } else if (this.props.location.pathname === '/universe') {
      display = 'block';
      path = 'universe.yaml';
    } else {
      display = 'none';
    }

    return (
      <div style={{ width: '100%', height: '100%' }}>
        <Switch>
          <Route
            path={[
              "/analyze/to/:start/:end",
              "/analyze/to/:start",
              "/analyze/to",
              "/analyze/from/:start/:end",
              "/analyze/from/:start",
              "/analyze/from",
              "/analyze"
            ]}
            component={Analyze}
          />
          <Route path="/universe">
          </Route>
          <Route path="/network">
          </Route>
          <Route exact path="/">
            <Welcome />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>

        <div style={{
          display,
          width: '100%',
          height: '100%'
        }}>
          <Editor path={path}/>
        </div>
      </div>
    );
  }
}

const FrameBodyRouted = withRouter(FrameBody);

function FrameBodyAndInfo() {
  return (
    <div style={{ flexGrow: 1, overflow: 'hidden', position: 'relative' }}>
      <SplitPane split="vertical" minSize={100} defaultSize={600} primary="second">
        <FrameBodyRouted/>
        <Info/>
      </SplitPane>
    </div>
  );
}

export default function Frame() {
  return (
    <Router>
      <Head>
        <title>Labyrinth Visualizer</title>
        <link rel="icon" href="/security-24px.svg" />
      </Head>
      <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}>
        <NavBar />
        <FrameBodyAndInfo />
      </div>
    </Router>
  );
}
