function BrowserUtils() {
  this.navigateToDefaultMap = function() {
    window.location.href = './main.html'
  }

  this.showMessage = function(message) {
    alert(message);
  }
}
