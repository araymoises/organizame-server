var pdf = require('pdfkit');
var fs = require('fs');

var Documents =
[
  {documento_id: 1, fecha: "14/01/1997", folio: "Folio 1", nombre_comprador: 'Moisés Aray', total: 500},
  {documento_id: 2, fecha: "28/10/1995", folio: "Folio 2", nombre_comprador: 'María Castillo', total: 1900},
  {documento_id: 3, fecha: "04/09/2015", folio: "Folio 3", nombre_comprador: 'Anastasia Aray', total: 525},
];
var Details =
[
  {documento_id: 1, documento_detalle_id: 1, unidad_medida: "Folio 1", precio: 'Moisés Aray', cantidad: 500, subtotal: 100, descripcion: 'prueba 1'},
  {documento_id: 2, documento_detalle_id: 1, unidad_medida: "Folio 1", precio: 'Moisés Aray', cantidad: 500, subtotal: 100, descripcion: 'prueba 1'},
  {documento_id: 1, documento_detalle_id: 2, unidad_medida: "Folio 1", precio: 'Moisés Aray', cantidad: 500, subtotal: 100, descripcion: 'prueba 1'},
  {documento_id: 1, documento_detalle_id: 3, unidad_medida: "Folio 1", precio: 'Moisés Aray', cantidad: 500, subtotal: 100, descripcion: 'prueba 1'},
  {documento_id: 3, documento_detalle_id: 1, unidad_medida: "Folio 1", precio: 'Moisés Aray', cantidad: 500, subtotal: 100, descripcion: 'prueba 1'},
  {documento_id: 1, documento_detalle_id: 4, unidad_medida: "Folio 1", precio: 'Moisés Aray', cantidad: 500, subtotal: 100, descripcion: 'prueba 1'},
  {documento_id: 3, documento_detalle_id: 2, unidad_medida: "Folio 1", precio: 'Moisés Aray', cantidad: 500, subtotal: 100, descripcion: 'prueba 1'},
  {documento_id: 2, documento_detalle_id: 2, unidad_medida: "Folio 1", precio: 'Moisés Aray', cantidad: 500, subtotal: 100, descripcion: 'prueba 1'},
  {documento_id: 3, documento_detalle_id: 3, unidad_medida: "Folio 1", precio: 'Moisés Aray', cantidad: 500, subtotal: 100, descripcion: 'prueba 1'},
];
var get = function(req, res){
  res.send(Documents);
};

var add = function(req, res){
  var total_prize = 0;
  console.log(Object.keys(req.body.details).length);

  var length = Documents.length + 1;
  var subtotal;

  for (var i = 0; i < Object.keys(req.body.details).length; i++) {
    subtotal = (req.body.details[i].cantidad * req.body.details[i].precio);
    total_prize = (total_prize + subtotal);
    Details.push({documento_id: length, documento_detalle_id: i+1, unidad_medida: req.body.details[i].unidad_medida, precio: req.body.details[i].precio, cantidad: req.body.details[i].cantidad, subtotal: subtotal, descripcion: req.body.details[i].descripcion});
  }
/*
  req.body.details.forEach((e, index) => {
    subtotal = e.cantidad * e.subtotal;
    total_prize = total_prize + subtotal;
    Details.push({documento_id: length, documento_detalle_id: index+1, unidad_medida: req.body.details[index].unidad_medida, precio: req.body.details[index].precio, cantidad: req.body.details[index].cantidad, subtotal: subtotal, descripcion: req.body.details[index].descripcion});
  });*/
  //console.log('Total Prize:');
  //console.log(total_prize);
  Documents.push({documento_id: length, fecha: req.body.fecha, folio: req.body.folio, nombre_comprador: req.body.nombre_comprador, total: total_prize});
  //console.log('Documents:');
//  console.log(Documents);
//  console.log('Details:');
  //console.log(Details);

  var doc = new pdf;
  var filePath = '/../pdf/document-' + length + '.pdf';
  doc.pipe(fs.createWriteStream(__dirname + filePath));

  doc.font('Times-Roman')
    .fontSize(48)
    .text('NodeJS PDF Document', 100, 100);

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
