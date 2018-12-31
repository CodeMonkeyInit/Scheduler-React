import React from 'react';
import { Route } from 'react-router';
import Layout from './components/Layout';
import Home from './components/Home';
import Objectives from "./components/Objectives";

import './App.css';

export default () => (
  <Layout>
    <Route exact path='/' component={Home} />
    <Route path='/objectives' component={Objectives} />
  </Layout>
);
