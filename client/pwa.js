import runtime from "offline-plugin/runtime";

runtime.install({
  // When an update is ready, tell ServiceWorker to take control immediately:
  onUpdateReady() {
    window.console.log("update ready");
    runtime.applyUpdate();
  },

  // Reload to get the new version:
  onUpdated() {
    window.console.log("updated");
    window.location.reload();
  }
});
