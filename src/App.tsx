import React, { useEffect, lazy, Suspense, useState } from "react";
import { Routes, Route, Outlet, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  VideoId,
  setCurrentVideoId,
} from "./components/common/data/videoidReducer";

import Header from "./components/common/header/Header";
import Spinner from "./components/common/loader/Spinner";
import SidebarRenderer from "./components/common/sidebar/SidebarRenderer";
import MSidebar from "./components/common/sidebar/MSidebar";
import Notification from "./components/common/popup/Notification";

import { useMediaQuery } from "react-responsive";

const Home = lazy(() => import("./components/homepage/Home"));
const PlayerHome = lazy(() => import("./components/playerpage/Home"));
const Short = lazy(() => import("./components/shortpage/Short"));
const Subscriptions = lazy(
  () => import("./components/subscriptionpage/Subscriptions")
);
const Channel = lazy(() => import("./components/channelpage/Channel"));
const LikedPage = lazy(() => import("./components/likedPage/LikedPage"));
const HelpPopUp = lazy(() => import("./components/common/popup/Help"));

const RenderList = lazy(() => import("./components/explorelist/RenderList"));

const WrapperComponent = ({ children }: any) => {
  const isMobile = useMediaQuery({ maxWidth: 1280 });
  return (
    <div>
      <Header />
      {isMobile ? <MSidebar /> : <SidebarRenderer />}
      {children}
      <Notification />
    </div>
  );
};

const MWrapperComponent = ({ children }: any) => {
  return (
    <div>
      <Header />
      <MSidebar />
      {children}
      <Notification />
    </div>
  );
};

const HomeWrapper = ({ children }: any) => {
  return (
    <Suspense fallback={<Spinner />}>
      <WrapperComponent>{children}</WrapperComponent>
    </Suspense>
  );
};

const PlayerHomeWrapper = ({ children }: any) => {
  return (
    <Suspense fallback={<Spinner />}>
      <MWrapperComponent>{children}</MWrapperComponent>
    </Suspense>
  );
};

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <HomeWrapper>
            <Home />
          </HomeWrapper>
        }
      />
      <Route
        path="/shorts/:videoId"
        element={
          <HomeWrapper>
            <Short />
          </HomeWrapper>
        }
      />
      <Route
        path="/subscriptions"
        element={
          <HomeWrapper>
            <Subscriptions />
          </HomeWrapper>
        }
      />

      <Route
        path="/likedvideos"
        element={
          <HomeWrapper>
            <LikedPage />
          </HomeWrapper>
        }
      />
      <Route
        path="/channel/:channelcustomUrl"
        element={
          <HomeWrapper>
            <Channel />
          </HomeWrapper>
        }
      />
      <Route
        path="/watch/:videoId"
        element={
          <PlayerHomeWrapper>
            <PlayerHome />
          </PlayerHomeWrapper>
        }
      />

      <Route
        path="/explore/:categoryId"
        element={
          <HomeWrapper>
            <RenderList />
          </HomeWrapper>
        }
      />

      <Route path="/*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
