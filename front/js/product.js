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

const promise1 = new Promise((resolve, reject) => {
   setTimeout(() => {
        resolve('foo');
     }, 300);
    });

const promiseRetrieveData = new Promise((resolve,reject) =>{
    retrieveData (() => {
        resolve('item');
    },reject(300));
})

const retrieveItemData =() =>
    
    fetch("http://localhost:3000/api/products")
    .then(res => {
      if (res.ok) {
        return res.json();
      }
    })
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

const main = async (item) => {

    const item = await retrieveItemData(item)

    fillImageDiv(item);
    showTitle(item);
    showPrice(item);
    showColors(item);
    showDescription(item);
}

main();

//***********************COULEURS************************************************************************************
//********************************************************

function getOption(itemMain){
const options = showColors(itemMain).querySelectorAll('option');
var optionNumber = 0;
    for(let i=0; i<options.length; i++){
        if(options[i].selected){
            optionNumber=i;
        }
    }
    return optionNumber;
};

productColors.addEventListener('change', colorChanging =async (item) =>{
    const itemMain = await main(item);
    const optionIndex = getOption(itemMain);
    const options = showColors(itemMain).querySelectorAll('option');

    var color='';

    if(optionIndex >= 0){
        productColors.children[optionIndex].selected;
        color = options[optionIndex].value;
    }

    return color;
});

var colorToCarr = colorChanging(item);

console.log('color:'+ colorToCarr);


//*******************************************************
//***********************QUANTITY************************
//*******************************************************

const InputElements  = document.getElementsByTagName('input');
const quantityElement = InputElements[0];
var quantityValue = quantityElement.value;

quantityElement.addEventListener('change',function getQuantity(){
    var quantity = quantityElement.value;
    quantityValue = quantity;
});


var quantityToCarr = parseInt(quantityValue);

console.log('quantity:'+ quantityToCarr);

//*******************************************************
//***********************PANIER**************************
//*******************************************************

var arrCartEntry = [idUrl, colorToCarr,quantityToCarr];
console.log('tableau issu des choix de couleur et quantité sur cette page:'+ arrCartEntry);

function populateStorage (){

    localStorage.setItem('id', arrCartEntry[0]);
    localStorage.setItem('color', arrCartEntry[1]);
    localStorage.setItem('quantity', arrCartEntry[2]);

    
    console.log('populateStorage marche: AU STORAGE LES VALEURS arrCartEntry[0]:'+arrCartEntry[0] +'pour id; arrCartEntry[1]:'+arrCartEntry[1]+'pour color; arrCartEntry[2]:'+arrCartEntry[2]+'pour quantity');

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

function sendToCart(){

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

    arrCartEntry = [currentId, currentColor, currentQuantityNumber]

    console.log('setPurchase marche');

}

//récupère (get) valeurs du storage => je crée un NOUVEAU TABLEAU (j'actualise le tableau) => ex dans le panier je change la quantité et la couleur d'un produit=> le tableau de panier est différent

//appelée UNIQUEMENT DANS POPULATE STORAGE
