function BrowserUtils() {
  this.navigateToDefaultMap = function () {
    window.location.href = "./index.html";
  };

  this.showMessage = function (message, onClose) {
    //TODO: add a flag to disable this feature
    // (take into account that next map won't load without user confirming modal right now...)
    $("#modal-content").html(message);
    $("#modal").modal("show");
    onClose &&
      $("#modal").on("hidden.bs.modal", () => {
        $("#modal").off();
        onClose();
      });
  };
}
