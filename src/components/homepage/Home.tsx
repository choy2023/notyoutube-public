import React, { useState, lazy, Suspense } from "react";

import Spinner from "../common/loader/Spinner";

const VideoList = lazy(() => import("./VideoList"));


const Home = () => {
  return (
    <Suspense fallback={<Spinner/>}>
      <VideoList />
    </Suspense>
  );
};

export default Home;
