import React from "react";
import { Redirect } from "react-router-dom";
import { FuseUtils } from "@fuse";
import { ExampleConfig } from "app/main/example/ExampleConfig";
import { Register2PageConfig } from "app/page/register/Register2PageConfig";
import { WelcomeConfig } from "app/page/welcome/WelcomeConfig";
import { BoardConfig } from "app/main/board/BoardConfig";
import {EnvoiyerConfig} from  "app/page/envoiyer/EnvoiyerConfig"

const routeConfigs = [
  ExampleConfig,
  Register2PageConfig,
  WelcomeConfig,
  BoardConfig,
  EnvoiyerConfig
];

const routes = [
  ...FuseUtils.generateRoutesFromConfigs(routeConfigs),
  {
    path: "/",
    component: () => <Redirect to="/welcome" />
  }
];

export default routes;
