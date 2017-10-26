var pdf = require('pdfkit');
var fs = require('fs');
var dateFormat = require('dateformat');

var Documents = [];
var Details =[];
var get = function(req, res){
  res.send(Documents);
};

var add = function(req, res){
  var total_prize = 0;
  console.log(Object.keys(req.body.details).length);
  var j = 100;
  var length = Documents.length + 1;
  var doc = new pdf;
  var filePath = '/../pdf/document-' + length + '.pdf';
  doc.pipe(fs.createWriteStream(__dirname + filePath));

  var subtotal;
  doc.font('Times-Roman');
  for (var i = 0; i < Object.keys(req.body.details).length; i++) {
    subtotal = (req.body.details[i].cantidad * req.body.details[i].precio);
    total_prize = (total_prize + subtotal);
    Details.push({documento_id: length, documento_detalle_id: i+1, unidad_medida: req.body.details[i].unidad_medida, precio: req.body.details[i].precio, cantidad: req.body.details[i].cantidad, subtotal: subtotal, descripcion: req.body.details[i].descripcion});
    doc.fontSize(30)
    .moveDown()
    .text('Detail #' + parseInt(i+1) + ":", 50)
    .fontSize(14)
    .moveDown()
    .text('Unidad Medida: ' + req.body.details[i].unidad_medida, 100)
    .moveDown()
    .text('Precio: ' + req.body.details[i].precio + '$', 100)
    .moveDown()
    .text('Cantidad: ' + req.body.details[i].cantidad, 100)
    .moveDown()
    .text('Subtotal: ' + subtotal + '$', 100)
    .moveDown();
  }

  Documents.push({documento_id: length, fecha: dateFormat(req.body.fecha, "dd/mm/yyyy"), folio: req.body.folio, nombre_comprador: req.body.nombre_comprador, total: total_prize});

  doc.fontSize(40)
  .moveDown()
  .text('Document', 50)
  .fontSize(18)
  .moveDown()
  .text('Fecha: ' + dateFormat(req.body.fecha, "dd/mm/yyyy"), 100)
  .moveDown()
  .text('Folio: ' + req.body.folio, 100)
  .moveDown()
  .text('Comprador: ' + req.body.nombre_comprador, 100)
  .moveDown()
  .text('Total: ' + total_prize + '$', 100)
  .moveDown();

  doc.end();

  res.send(Details);
};

var getById = function(req, res){
  var result = [];
  Details.forEach((e) => {
    if (e.documento_id == req.params.id) {
      result.push(e);
    }
  });
  res.send(result);
};



module.exports = {
  get:get,
  getById:getById,
  add:add
};
