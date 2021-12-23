//Récupérer les caractéristiques du produit à partir de la valeur id="" dans l'url de la page

const urlIdValue =()=>{
    var str = window.location.href;
    var url = new URL(str);
    var search_params = new URLSearchParams(url.search);
    if (search_params.has("id")) {
        var id = search_params.get("id");
        console.log(id)
        return id;
    }
}

const retrieveItemData = () =>
    
    fetch("http://localhost:3000/api/products")
    .then(res => {
      if (res.ok) {
        return res.json();
      }
    })
    .then(data => {
      console.log(data);
      return data;
    })
    .then(retrieveItem =(data) =>{        

        for(let i=0; i<data.length; i++) {

            let item= data[i];
            let values = Object.values(item);
            console.log(values);
        
            for(let j=0;j<values.length; j++) {
                let value = values[j];
                const id = urlIdValue();
                if (value === id){
                    console.log(item);
                    return item;
                }

            }

        } 
    })
    .catch(err =>{ 
        console.log("erreur suivante:" + err)
    })


//Adapter la page au produit
const showImage = (item) => {

    
    const productImage = document.createElement("img");
    productImage.setAttribute("src", item.imageUrl);
    productImage.setAttribute("alt", item.altTxt);

    

    return productImage;
};

const fillImageDiv =(item)=>{

    const ImageItem = showImage(item);

    if(ImageItem != undefined){
        console.log(ImageItem);
    }
    const productDivImage = document.getElementsByClassName('item__img')[0];

    productDivImage.appendChild(ImageItem);

    return productDivImage;
};

const showTitle = (item) => {
    const productTitle = document.getElementById('title');
    productTitle.textContent = item.name;

    return productTitle;
};

const showPrice = (item) => {

    const productPrice = document.getElementById(
        'price');
    productPrice.textContent = item.price;

    return productPrice;
};

const showDescription = (item) => {

    const productDescription = document.getElementById('description')
    productDescription.textContent = item.description

    return productDescription
};


const productColors = document.getElementById('colors');

const addColorOptions = (item) =>{

    let colorChoice = item.colors

    for(let i=0; i<colorChoice.length; i++){

        let color = colorChoice[i]

        const productColorOption = document.createElement('option');
        
        productColorOption.setAttribute('value', color);

        productColorOption.textContent = color;

        return productColorOption
    }

    const options = document.querySelectorAll('option')
    const arr = Array.prototype.slice.call(options)
    console.log(arr)

    return options
}

const showColors =(item)=>{
    const colorOptions = addColorOptions(item)
    productColors.append(colorOptions)

    return productColors
}

const WhatIsSelectedColor =() =>{
    var color ='';

    productColors.addEventListener('change', (event => {
        color = event.target.value;
        console.log('couleur résultante :'+ color)
    }))
    return color;

}
    

    /**if(itemColorsOption.nodeType)
    itemColorsOption.getAttribute('value')**/


const quantityElement  = document.getElementById('quantity') //quantityElement de type <input>

const showQuantity = () =>{
    var index = 0;

    quantityElement.addEventListener('change',(event =>{
        index = event.target.value;
        console.log('quantité résultante :'+ index)        
    }))

    return index;
}

const main = async () => {

    const item = await retrieveItemData()

    fillImageDiv(item);
    showTitle(item);
    showPrice(item);
    addColorOptions(item);
    showColors(item);
    showDescription(item);
}
main();

/**class ProductElements {
    constructor() {
        this.id = urlIdValue();
        this.productColor = WhatIsSelectedColor();
        this.quantity = showQuantity();
    }
}

let productElements = new ProductElements('id','productColor','quantity')**/
const retrieveEventElements =async() =>{

    var id = urlIdValue();
    var productColor = WhatIsSelectedColor();
    var quantity = showQuantity();
    var arr = new Array(id, productColor, quantity);

    console.log(arr)
    return arr
}

retrieveEventElements();
/**const forEvent =async(event)=>{
    const colorForEvent = WhatIsSelectedColor(event);
    const quantityForEvent = showQuantity(event);

    retrieveEventElements(colorForEvent, quantityForEvent);

}

forEvent();
**/

//Stocker les informations d'envoi de produit dans le panier

/**

function storageAvailable(type) {
    var storage;
    try {
        storage = window[type];
        var x = '__storage_test__';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        return e instanceof DOMException && (
            // everything except Firefox
            e.code === 22 ||
            // Firefox
            e.code === 1014 ||
            // test name field too, because code might not be present
            // everything except Firefox
            e.name === 'QuotaExceededError' ||
            // Firefox
            e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
            // acknowledge QuotaExceededError only if there's something already stored
            (storage && storage.length !== 0);
    }
}

if (storageAvailable('localStorage')) {
    console.log('Yippee! We can use localStorage awesomeness')
  }
else {
    console.log('Too bad, no localStorage for us')
  }


if  (!localStorage.getItem('id', 'color','quantity')) {
    populateStorage(); //stocker
} else {
    setStyles(); //récupérer
}

// Récupérer les valeur du localStorage
function setStyles() {
    var currentId = localStorage.getItem('id');
    var currentColor = localStorage.getItem('color');
    var currentQuantity = localStorage.getItem('quantity');
  
    document.getElementById('id').value = currentId;
    document.getElementById('color').value = currentColor;
    document.getElementById('quantity').value = currentQuantity;
  
    htmlElem.style.backgroundColor = '#' + currentColor;
    pElem.style.fontFamily = currentFont;
    imgElem.setAttribute('src', currentImage);
  }


//Stocker dans le localStorage
function populateStorage() {
    localStorage.setItem('id', urlIdValue() );
    localStorage.setItem('color', document.getElementById('color').value);
    localStorage.setItem('quantity', document.getElementById('quantity').value);
  
    setStyles();
  }

  **/