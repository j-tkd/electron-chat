const { app, Menu } = require("electron");
const createWindow = require("./createWindow");

const setAppMenu = () => {
  const isMac = process.platform === "darwin";

  // Template
  const template = [
    {
      label: "File",
      submenu: [
        {
          label: "New Window",
          accelerator: "CmdOrCtrl+N",
          click: () => createWindow(),
        },
        { type: "separator" },
        { label: "Close", accelerator: "CmdOrCtrl+W", role: "close" },
      ],
    },
    {
      label: "Edit",
      submenu: [
        {
          lable: "Copy",
          accelerator: "CmdOrCtrl+C",
          role: "copy",
        },
        {
          label: "Paste",
          accelerator: "CmdOrCtrl+V",
          role: "paste",
        },
        {
          label: "Cut",
          accelerator: "CmdOrCtrl+X",
          role: "cut",
        },
        {
          label: "Select All",
          accelerator: "CmdOrCtrl+A",
          role: "selectAll",
        },
      ],
    },
    {
      label: "View",
      submenu: [
        {
          label: "Reload",
          accelerator: "CmdOrCtrl+R",
          click: (item, focusedWindow) =>
            focusedWindow && focusedWindow.reload(),
        },
        {
          label: "Toggle DevTools",
          accelerator: isMac ? "Alt+Command+I" : "Ctrl+Shift+I",
          click: (item, focusedWindow) =>
            focusedWindow && focusedWindow.toggleDevTools(),
        },
      ],
    },
    {
      role: "help",
      submenu: [
        {
          label: "Learn More",
          click: async () => {
            const { shell } = require("electron");
            await shell.openExternal("https://electronjs.org");
          },
        },
      ],
    },
  ];

  // //   MacOs
  if (isMac) {
    template.unshift({
      label: app.getName(),
      submenu: [
        { role: "about" },
        { type: "separator" },
        { role: "services", submenu: [] },
        { type: "separater" },
        { role: "hide" },
        { role: "hideOthers" },
        { role: "unhide" },
        { type: "separator" },
        { role: "quit" },
      ],
    });

    template.push({
      role: "window",
      submenu: [{ role: "minimize" }, { role: "zoom" }],
    });
  }

  for (const t of template) {
    console.log(t);
  }
  const appMenu = Menu.buildFromTemplate(template);

  Menu.setApplicationMenu(appMenu);
};

module.exports = setAppMenu;
