//TODO Name it BoardPainter
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

  this.repaintTown = function(
    iteration,
    unit,
    conqueredUnit,
    annotation,
    img,
    extraTitle
  ) {
    const newId = $(iteration + ' img')
      .attr('id')
      .replaceAt(
        $(iteration + ' img').attr('id').length - 1,
        annotation
      );
      title = '[' + conqueredUnit.name + ']' + extraTitle;

    $(iteration + ' a img').attr('id', newId);
    $(iteration + ' a img').attr('src', './src/images/board/' + img + '.png');
    $(iteration + ' a').attr('title', title);
  }
}
