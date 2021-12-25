//Récupérer les caractéristiques du produit à partir de la valeur id="" dans l'url de la page

const urlIdValue =()=>{
    var str = window.location.href;
    var url = new URL(str);
    var search_params = new URLSearchParams(url.search);
    if (search_params.has("id")) {
        var id = search_params.get("id");
        return id;
    }
}

const idUrl= urlIdValue();

const retrieveItemData =() =>

    fetch("http://localhost:3000/api/products")
    .then(res =>{
        if (res.ok) {
      return response.json();
    }})
    .then(data => {
      return data;
    })
    .then(retrieveItem =(data) =>{        

        for(let i=0; i<data.length; i++) {
            var item= data[i];
            let values = Object.values(item);
        
            for(let j=0;j<values.length; j++) {
                let value = values[j];
                if (value === idUrl){
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

const showColors = (item) =>{

    let colorChoice = item.colors

    for(let i=0; i<colorChoice.length; i++){

        let color = colorChoice[i]

        var productColorOption = document.createElement('option');

        
        productColorOption.setAttribute('value', color);

        productColorOption.textContent = color;

        productColors.appendChild(productColorOption)
    }
    return productColors

}


//***********************COULEURS************************************************************************************
//********************************************************

function getOption(productColorsItem){
const options = productColorsItem.querySelectorAll('option');
var optionNumber = 0;
    for(let i=0; i<options.length; i++){
        if(options[i].selected){
            optionNumber=i;
        }
    }
    return optionNumber;
};

const colorChanging =(productColorsItem) =>{
    const optionIndex = getOption(productColorsItem);
    const options = productColorsItem.querySelectorAll('option');

    if(optionIndex >= 0){
        productColors.children[optionIndex].selected;
        var color = options[optionIndex].value;
    }

    return color;
}


productColors.addEventListener('change', colorChanging);


//*******************************************************
//***********************QUANTITY************************
//*******************************************************

const InputElements  = document.getElementsByTagName('input');
const quantityElement = InputElements[0];

quantityElement.addEventListener('change',function getQuantity(){
    var quantity = this.quantityElement.value;
    return quantity;
});

const quantityValue = getQuantity();
var quantityToCarr = parseInt(quantityValue);

console.log('quantity:'+ quantityToCarr);


//********************************************************
//***********************LOCALSTORAGE*********************
//********************************************************

function populateStorage (arrEntrySendToCart){

    localStorage.setItem('id', arrEntrySendToCart[0]);
    localStorage.setItem('color', arrEntrySendToCart[1]);
    localStorage.setItem('quantity', arrEntrySendToCart[2]);

    
    console.log('populateStorage marche: AU STORAGE LES VALEURS arrEntrySendToCart[0]:'+arrEntrySendToCart[0] +'pour id; arrEntrySendToCart[1]:'+arrEntrySendToCart[1]+'pour color; arrEntrySendToCart[2]:'+arrEntrySendToCart[2]+'pour quantity');

    //TRANSMISSION VALEURS TABLEAU LOCAL=> STORAGE, VALEURS QUI S'AJOUTENT A CELLES TRANSMISES PAR LE PANIER
    setPurchase();
    //RECUPERATION VALEURS DU STORAGE (VALEURS QUI PROVIENNENT AUSSI DU PANIER ex. change quantité et/ou couleur dans le panier)

    //CREATION NOUVEAU TABLEAU LOCAL
    //=> retourne nouveau arrCartEntry

    console.log('nouveau tableau après récupération des valeurs du storage par setPurchase:'+arrCartEntry);

}
//function activée au click bouton

const button = document.querySelector('button');

button.addEventListener('click', sendToCart);

function sendToCart(arrCartEntry){

    if(arrCartEntry[1]!='SVP choisissez une couleur' && arrCartEntry[2] !=0){       
        populateStorage();
    }
    console.log('bouton entendu!');
};

//à chaque click sur le bouton TRANSMET LES VALEURS DU TABLEAU de panier dans le storage 

function setPurchase() {
    var currentId = localStorage.getItem('id');
    var currentColor = localStorage.getItem('color');
    var currentQuantity = localStorage.getItem('quantity');
    var currentQuantityNumber = parseInt(currentQuantity);

    var arrCartEntry = [currentId, currentColor, currentQuantityNumber];

    console.log('setPurchase marche');

    return arrCartEntry;

}

//récupère (get) valeurs du storage => je crée un NOUVEAU TABLEAU (j'actualise le tableau) => ex dans le panier je change la quantité et la couleur d'un produit=> le tableau de panier est différent

//appelée UNIQUEMENT DANS POPULATE STORAGE

//****************************MAIN************************



const main = async () => {

    const item = await retrieveItemData();

    fillImageDiv(item);
    showTitle(item);
    showPrice(item);
    showColors(item);
    const productColorsItem = showColors(item);
    showDescription(item);


    const colorToArr = await colorChanging(productColorsItem);
    var arrCartEntry = [idUrl, colorToArr,quantityToCarr];
    sendToCart(arrCartEntry);
}

main();


