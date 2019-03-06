function MapPainter() {
  this.eraseMap = function() {
    $('#map').html('');
  }

  this.paintRow = function(rowIndex) {
    $('#map').append('<tr id="row' + rowIndex + '"></tr>');
  }

  this.paintCell = function(id, rowIndex, columnIndex, icon, imageRoute, ground, display) {
    $('#row' + rowIndex).append(
      '<th class="cell" id="cell' + rowIndex + '' + columnIndex + '">' + icon + '</th>'
    );
    $('#cell' + rowIndex + '' + columnIndex).css({
      'background-image': 'url(' + imageRoute + ground + ')'
    });
    $('#icon' + id).css({'display' : display});
  }
}
