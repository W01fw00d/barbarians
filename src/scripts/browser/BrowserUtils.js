function BrowserUtils() {
  this.reloadLocation = function() {
    location.reload();
  }

  this.showMessage = function(message) {
    alert(message);
  }
}
