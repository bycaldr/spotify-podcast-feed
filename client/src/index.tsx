import React from "react";
import ReactDOM from "react-dom";

import { loadSw } from "~utils/load-sw";

import { Main } from "~main";

loadSw();

ReactDOM.render(<Main />, document.getElementById("❤️"));
