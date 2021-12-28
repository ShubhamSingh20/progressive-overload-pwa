import React, {useContext} from 'react';
import { pagesMapping, RoutingContext} from 'context/Routing';
import logo from './logo.svg';
import MenuPage from 'pages/Menu';
import WorkoutLog from 'pages/WorkoutLog';
import './App.css';

function App() {
  const {page} = useContext(RoutingContext)

  // const {setPage} = useContext(RoutingContext)
  //  onClick={() => setPage(pagesMapping.about)}>
  console.log(page)
  return (
    <>
    {(pagesMapping.menu === page) && <MenuPage />}
    {(pagesMapping.workoutLog === page) && <WorkoutLog />}
  </>
  );
}

export default App
