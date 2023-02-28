import React, { useState } from "react";
import MedalCount from "./components/medalCount/medalCount";
import { sortMethod } from './constant';

function App() {

  return (
    <div className="page-wrapper">
      <MedalCount sort={sortMethod.GOLD} />
    </div>
  );
}

export default App;