import {clearNode} from "./utils";

const appScreen = document.querySelector(`.app .main`);

const renderScreen = (screen, parentNode = appScreen) => {
  clearNode(parentNode);
  parentNode.appendChild(screen);
};

const changeView = (view, parentNode = appScreen) => {
  clearNode(parentNode);
  parentNode.appendChild(view.element);
};
export {renderScreen, changeView};
