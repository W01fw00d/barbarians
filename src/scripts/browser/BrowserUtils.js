function BrowserUtils(enableModals) {
  this.navigateToDefaultMap = () => {
    window.location.href = "./index.html";
  };

  this.showMessage = (message, onClose) => {
    if (enableModals) {
      $("#modal-content").html(message);
      $("#modal").modal("show");
      onClose &&
        $("#modal").on("hidden.bs.modal", () => {
          $("#modal").off();
          onClose();
        });
    } else {
      onClose && onClose();
    }
  };
}
