function BrowserUtils() {
  this.navigateToDefaultMap = function() {
    window.location.href = './main.html'
  }

  this.alert = function(message) {
    alert(message);
  }

  this.showMessage = function(message) {
    $('#modal-content').html(message);
    $('#modal').modal('show');
  }
}
