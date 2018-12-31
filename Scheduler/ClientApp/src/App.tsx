import React from 'react';
import {Route} from 'react-router';
import Layout from './components/Layout';
import Objectives from "./components/Objectives";

import './App.css';

export default () => (
  <Layout>
    <Route path='/' component={Objectives} />
  </Layout>
);
