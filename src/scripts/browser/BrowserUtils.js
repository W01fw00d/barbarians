function BrowserUtils(showModals) {
  this.showModals = showModals;

  this.navigateToDefaultMap = () => {
    window.location.href = "./index.html";
  };

  this.enableModals = () => {
    this.showModals = true;
  };

  this.disableModals = () => {
    this.showModals = false;
  };

  this.showMessage = (message, onClose) => {
    if (this.showModals) {
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
