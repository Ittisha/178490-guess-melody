import {clearNode} from "./utils";

const appScreen = document.querySelector(`.app .main`);

const renderScreen = (screen, parentNode = appScreen) => {
  clearNode(parentNode);
  parentNode.appendChild(screen);
};

export default renderScreen;
