function BrowserUtils() {
  this.navigateToDefaultMap = function () {
    window.location.href = "./index.html";
  };

  this.showMessage = function (message, onClose) {
    $("#modal-content").html(message);
    $("#modal").modal("show");
    onClose &&
      $("#modal").on("hidden.bs.modal", () => {
        $("#modal").off();
        onClose();
      });
  };
}
