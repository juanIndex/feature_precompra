
function cambiarTextoBotonCompra() {
    let botonesCompra = Array.from(document.getElementsByClassName('andes-button__content'))
    botonesCompra.forEach(boton => {
        if (boton.innerHTML === 'Comprar ahora') {
            boton.innerHTML = 'PRE-ORDER';
        }
    })

}

function addPreOrderTextToView(date) {
    const textContainer = document.createElement('div')
    textContainer.className = 'pre-order'
    textContainer.innerHTML = ` 
        Este producto NO ESTÁ a la venta aún. Compralo ahora ONLINE y asegurátelo.
        <p></p>
        <p>Tu pedido saldrá de nuestra tienda con fecha estimada el  <strong>${date}</strong>.</p>
    `
    let sameParentDesktop = document.getElementsByClassName('ui-vip-core-container--column__right')[0]
    let nextNode = document.getElementsByClassName('ui-pdp-container__row--stock-information')[0]

    let nextNodeMobile = document.getElementsByClassName('ui-pdp-stock-information')[0]
    let sameParentMobile = document.getElementsByClassName('ui-pdp-container__row--stock-information')[0]

    sameParentDesktop ? sameParentDesktop.insertBefore(textContainer, nextNode)
        :
        sameParentMobile.insertBefore(textContainer, nextNodeMobile)

}



var urlSku = 'https://sheets.googleapis.com/v4/spreadsheets/1ZhpFViOSSbGAAN8hFWq7fIw9byaUD9FKknuSFeHRD34/values/sku!A:C?alt=json&key=AIzaSyCQffePdDsbMORiZXVQmxOXohTn00giTjo';

function getPrecompraSearch(id_producto, agregarClase) {
    fetch(urlSku)
        //.catch(error => getMenu(urlBackup))
        .then(response => response.json())
        .then(data => {
            for (var i = 0; i < data.values.length; i++) {
                let skuSheet = data.values[i][1];
                let fechaSheet = data.values[i][2];
                let dayFecha = fechaSheet.split('de')[0];
                let monthFecha = fechaSheet.split('de')[1];
                if (skuSheet == id_producto) {
                    let clase = "." + agregarClase;
                    let fechaSpan = document.createElement("div");
                    fechaSpan.innerHTML = `<span class="precompraTag">PRE-ORDER</span><div class="fechaInterior"><span>${dayFecha}</span><span>${monthFecha}</span></div>`;
                    document.querySelector(clase).append(fechaSpan);


                    setTimeout(() => {

                        cambiarTextoBotonCompra()
                        addPreOrderTextToView(fechaSheet)
                    }, 1500);
                }
            }
        });
};
