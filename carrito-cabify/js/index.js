const mug = 7.5;
const voucher = 5;
const tshirt = 20;

let carrito = [];
let numeroCupones = [];
let numeroCamisetas = [];

let resultado = 0;
let resultadoDescuentoCupon = 0;
let resultadoDescuentoCamiseta = 0;
let resultadoCupones = 0;
let resultadoCafe = 0;
let resultadoCamiseta = 0;
let contadorCupon = 0;
let contadorCamiseta = 0;
let contadorCafe = 0;
let carritoDescuentoCupones = [];
let element = document.createElement("h2");



/////////////////////añadir productos al carrito/////////////////////
function añadirCarrito(...theArgs) {
  carrito.push(...theArgs);
}
function miFuncion() {
  document
    .getElementById("compra")
    .value.split(",")
    .forEach(element => {
      añadirCarrito(eval(element));
    });

  ///identifica cuantos productos de la oferta hay en la compra/////////

  function identificaOfertas(e) {
    var idc = e.indexOf(voucher);
    var idt = e.indexOf(tshirt);
    while (idc != -1) {
      numeroCupones.push(idc);
      idc = e.indexOf(voucher, idc + 1);
    }
    while (idt != -1) {
      numeroCamisetas.push(idt);
      idt = e.indexOf(tshirt, idt + 1);
    }
  }

  identificaOfertas(carrito);
  console.log(numeroCamisetas.length, "numero de camisetas en el carrito");
  console.log(numeroCupones.length, "numero de cupones en el carrito");

  ////////////////realizando suma y descuento//////////////////////////

  ////////////////PRIMER SUPUESTO AMBAS OFERTAS ///////////////////////
  if (numeroCupones.length >= 2 && numeroCamisetas.length >= 3) {
    console.log("1º ambas ofertas");
    var soloCupones = carrito.filter(number => number == 5);

    var soloCamiseta = carrito.filter(number => number == 20);

    var soloCafe = carrito.filter(number => number == 7.5);

    var carritoDescuentoCamiseta = soloCamiseta.map(function(number) {
      return number - 1;
    });

    if (numeroCupones.length % 2 == 0) {
      carritoDescuentoCupones = soloCupones.map(function(number) {
        return number / 2;
        console.log(carritoDescuentoCupones);
      });
    } else {
      var cuponesPagar = Math.round(numeroCupones.length / 2);
      resultadoDescuentoCupon = cuponesPagar * 5;
    }

    for (var q = 0; q < carritoDescuentoCupones.length; q++) {
      resultadoDescuentoCupon += carritoDescuentoCupones[q];
    }

    for (var q = 0; q < carritoDescuentoCamiseta.length; q++) {
      resultadoDescuentoCamiseta += carritoDescuentoCamiseta[q];
    }
    for (var q = 0; q < soloCafe.length; q++) {
      resultadoCafe += soloCafe[q];
    }
    //////////////suma de los articulos////////////////////////////
    if (resultadoCafe == undefined) {
      resultado = resultadoDescuentoCamiseta + resultadoDescuentoCupon;
    } else {
      resultado =
        resultadoDescuentoCamiseta + resultadoCafe + resultadoDescuentoCupon;
    }

    ////////////////SEGUNDO SUPUESTO OFERTA CAMISETAS///////////////////////
  } else if (numeroCamisetas.length >= 3) {
    console.log("2º oferta de camisetas");

    var soloCupones = carrito.filter(number => number == 5);

    var soloCamiseta = carrito.filter(number => number == 20);

    var soloCafe = carrito.filter(number => number == 7.5);

    var carritoDescuento = soloCamiseta.map(function(number) {
      return number - 1;
    });
    for (var i = 0; i < carritoDescuento.length; i++) {
      resultadoDescuentoCamiseta += carritoDescuento[i];
    }

    for (var q = 0; q < soloCupones.length; q++) {
      resultadoCupones += soloCupones[q];
    }
    for (var q = 0; q < soloCafe.length; q++) {
      resultadoCafe += soloCafe[q];
    }
    //////////////suma de los articulos //////////////////////////////
    if (resultadoCafe == undefined) {
      resultado = resultadoDescuentoCamiseta + resultadoCupones;
    } else if (resultadoCupones == undefined) {
      resultado = resultadoDescuentoCamiseta + resultadoCafe;
    } else if (resultadoCupones == undefined && resultadoCafe == undefined) {
      resultado = resultadoDescuentoCamiseta;
    } else {
      resultado = resultadoDescuentoCamiseta + resultadoCafe + resultadoCupones;
    }

    ////////////////TERCE SUPUESTO OFERTA CUPONES ///////////////////////
  } else if (numeroCupones.length >= 2) {
    console.log("3º oferta de cupones");

    var soloCupones = carrito.filter(number => number == 5);

    var soloCamiseta = carrito.filter(number => number == 20);

    var soloCafe = carrito.filter(number => number == 7.5);

    if (numeroCupones.length % 2 == 0) {
      carritoDescuentoCupones = soloCupones.map(function(number) {
        return number / 2;
        console.log(carritoDescuentoCupones);
      });
    } else if (numeroCupones.length == 3) {
      soloCupones.pop();
      for (var q = 0; q < soloCupones.length; q++) {
        resultadoDescuentoCupon += soloCupones[q];
      }
    } else {
      var cuponesPagar = Math.round(numeroCupones.length / 2);
      resultadoDescuentoCupon = cuponesPagar * 5;
    }

    for (var q = 0; q < carritoDescuentoCupones.length; q++) {
      resultadoDescuentoCupon += carritoDescuentoCupones[q];
    }

    for (var q = 0; q < soloCamiseta.length; q++) {
      resultadoCamiseta += soloCamiseta[q];
    }
    for (var q = 0; q < soloCafe.length; q++) {
      resultadoCafe += soloCafe[q];
    }
    //////////////suma de los articulos /////////////////////////////////////
    if (resultadoCafe == undefined) {
      resultado = resultadoDescuentoCupon + resultadoCamiseta;
    } else if (resultadoCamiseta == undefined) {
      resultado = resultadoDescuentoCupon + resultadoCafe;
    } else if (resultadoCamiseta == undefined && resultadoCafe == undefined) {
      resultado = resultadoDescuentoCupon;
    } else {
      resultado = resultadoDescuentoCupon + resultadoCafe + resultadoCamiseta;
    }
  } else {
    console.log(carrito, "4º sin ofertas");
    for (var q = 0; q < carrito.length; q++) {
      resultado += carrito[q];
    }
  }
  ////////////////////// total ////////////////////////////////////////////////////////
  element.innerHTML = resultado + "€";
  var parent = document.getElementsByTagName("h3")[0];
  parent.appendChild(element);
  console.log(resultado + "€");
}