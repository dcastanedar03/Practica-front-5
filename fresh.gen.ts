// DO NOT EDIT. This file is generated by Fresh.
// This file SHOULD be checked into source version control.
// This file is automatically updated during development when running `dev.ts`.

import * as $_404 from "./routes/_404.tsx";
import * as $_app from "./routes/_app.tsx";
import * as $_layout from "./routes/_layout.tsx";
import * as $api_API from "./routes/api/API.tsx";
import * as $id_id_ from "./routes/id/[id].tsx";
import * as $index from "./routes/index.tsx";
import * as $project from "./routes/project.tsx";
import * as $Addtoproject from "./islands/Addtoproject.tsx";
import * as $CreateProject from "./islands/CreateProject.tsx";
import * as $Delete from "./islands/Delete.tsx";
import * as $Fmodal from "./islands/Fmodal.tsx";
import * as $Modal from "./islands/Modal.tsx";
import * as $Return from "./islands/Return.tsx";
import * as $listaPeliculas from "./islands/listaPeliculas.tsx";
import { type Manifest } from "$fresh/server.ts";

const manifest = {
  routes: {
    "./routes/_404.tsx": $_404,
    "./routes/_app.tsx": $_app,
    "./routes/_layout.tsx": $_layout,
    "./routes/api/API.tsx": $api_API,
    "./routes/id/[id].tsx": $id_id_,
    "./routes/index.tsx": $index,
    "./routes/project.tsx": $project,
  },
  islands: {
    "./islands/Addtoproject.tsx": $Addtoproject,
    "./islands/CreateProject.tsx": $CreateProject,
    "./islands/Delete.tsx": $Delete,
    "./islands/Fmodal.tsx": $Fmodal,
    "./islands/Modal.tsx": $Modal,
    "./islands/Return.tsx": $Return,
    "./islands/listaPeliculas.tsx": $listaPeliculas,
  },
  baseUrl: import.meta.url,
} satisfies Manifest;

export default manifest;
