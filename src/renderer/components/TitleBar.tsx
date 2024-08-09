import { VscChromeMinimize, VscChromeClose } from "react-icons/vsc";
// import { LuMinimize2 } from "react-icons/lu";
import { TbArrowsMaximize } from "react-icons/tb";
import "./TitleBar.css";

function minimizeApp() {
  window.electron.ipcRenderer.sendMessage("minimize-app", "");
}

function closeApp() {
  window.electron.ipcRenderer.sendMessage("close-app", "");
}

function maximize() {
  window.electron.ipcRenderer.sendMessage("maximize-app", "");
}

function TitleBar() {
  return (
    <header className="title-bar">
      <div className="drag-region">
        <div className="title">Electron Js Periodic Table</div>
        <div className="window-controls">
          <button type="button" className="button" onClick={minimizeApp}>
            <VscChromeMinimize />
          </button>

          <button type="button" className="button" onClick={maximize}>
            <TbArrowsMaximize />
          </button>

          <button type="button" className="button" onClick={closeApp}>
            <VscChromeClose />
          </button>
        </div>
      </div>
    </header>
  );
}

export default TitleBar;
