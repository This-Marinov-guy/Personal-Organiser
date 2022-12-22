import React, { Fragment } from "react";
import Background from "../components/HomePage/Background";
import InfoPanel from "../components/HomePage/InfoPanel";
import HomePanel from "../components/HomePage/TitlePanel";
import NavBar from "../components/UI/NavBar";
import intro from '../images/intro.mp4';

function Home() {
  return (
    <Fragment>
      <Background src={intro} />
      <HomePanel />
      <InfoPanel />
    </Fragment>
  );
}

export default Home;
