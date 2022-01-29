const { ipcRenderer, contextBridge } = require("electron");

// can be accessed through window.app
contextBridge.exposeInMainWorld("myApp", {
  // Renderer => Main
  // ipcRenderer.invoke(channel, ...args)
  // channel を介して非同期でメインプロセスにメッセージを送信し、結果を待ちます。
  sayHello: (arg) => ipcRenderer.invoke("say-hello", arg),
});
