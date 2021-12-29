import React, {useContext} from 'react';
import { pagesMapping, RoutingContext} from 'context/Routing';
import logo from './logo.svg';
import MenuPage from 'pages/Menu';
import WorkoutLog from 'pages/WorkoutLog';
import Layout from 'Layout';
import './App.css';

function App() {
  const {page} = useContext(RoutingContext)

  return (
    <Layout>
    {(pagesMapping.menu === page) && <MenuPage />}
    {(pagesMapping.workoutLog === page) && <WorkoutLog />}
  </Layout>
  );
}

export default App
