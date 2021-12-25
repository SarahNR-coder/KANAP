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

const retrieveItemData = () =>fetch("http://localhost:3000/api/products")
    .then(res =>{
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
            var values = Object.values(item);
        
            for(let j=0;j<values.length; j++) {
                let value = values[j];
                if (value === idUrl){
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
const setImageAttributes = (item) => {

    const productImage = document.createElement("img");
    productImage.setAttribute("src", item.imageUrl);
    productImage.setAttribute("alt", item.altTxt);

    return productImage;
};

const fillImageDiv =(productImageWithAttributes)=>{

    const ImageItem = productImageWithAttributes;
    const productDivImage = document.querySelector('div.item__img');

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

const getOption =(productColorsItem) =>{
const options = productColorsItem.getElementsByTagName('option');
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
    const options = productColorsItem.getElementsByTagName('option');

    if(optionIndex >= 0){
        productColors.children[optionIndex].selected;
        var color = options[optionIndex].value;
    }

    return color;
}





//*******************************************************
//***********************QUANTITY************************
//*******************************************************

const InputElements  = document.getElementsByTagName('input');
const quantityElement = InputElements[0];

const getQuantity =() =>{
    var quantity = quantityElement.value;
    return quantity;
}

//********************************************************
//***********************LOCALSTORAGE*********************
//********************************************************


//à chaque click sur le bouton TRANSMET LES VALEURS DU TABLEAU de panier dans le storage 

const setPurchase=()=> {
    var currentId = localStorage.getItem('id');
    var currentColor = localStorage.getItem('color');
    var currentQuantity = localStorage.getItem('quantity');
    var currentQuantityNumber = parseInt(currentQuantity);

    var arrCartEntryBis = [currentId, currentColor, currentQuantityNumber];

    console.log('setPurchase marche');

    return arrCartEntryBis;

}

//récupère (get) valeurs du storage => je crée un NOUVEAU TABLEAU (j'actualise le tableau) => ex dans le panier je change la quantité et la couleur d'un produit=> le tableau de panier est différent

//appelée UNIQUEMENT DANS POPULATE STORAGE dans cette page


const populateStorage =(arrCartEntryBis)=>{

    localStorage.setItem('id', arrCartEntryBis[0]);
    localStorage.setItem('color', arrCartEntryBis[1]);
    localStorage.setItem('quantity', arrCartEntryBis[2]);

    
    console.log('populateStorage marche: AU STORAGE LES VALEURS arrCartEntryBis[0]:'+arrCartEntryBis[0] +'pour id; arrCartEntryBis[1]:'+arrCartEntryBis[1]+'pour color; arrCartEntryBis[2]:'+arrCartEntryBis[2]+'pour quantity');

    //TRANSMISSION VALEURS TABLEAU LOCAL=> STORAGE, VALEURS QUI S'AJOUTENT A CELLES TRANSMISES PAR LE PANIER
    setPurchase();
    //RECUPERATION VALEURS DU STORAGE (VALEURS QUI PROVIENNENT AUSSI DU PANIER ex. change quantité et/ou couleur dans le panier)

    //CREATION NOUVEAU TABLEAU LOCAL
    //=> retourne nouveau arrCartEntry

    console.log('nouveau tableau après récupération des valeurs du storage par setPurchase:'+arrCartEntry);

}
//function activée au click bouton


//****************************MAIN************************

const main = async () => {

    const item = await retrieveItemData();

    const productImageWithAttributes = setImageAttributes(item);
    const NewproductImage= productImageWithAttributes;
    fillImageDiv(NewproductImage);
    showTitle(item);
    showPrice(item);
    const productColorsItem = showColors(item);
    showDescription(item);


    const colorToArr = await colorChanging(productColorsItem);
    const quantityValue = getQuantity();
    const quantityToArr = parseInt(quantityValue);
    const arrCartEntry = [idUrl, colorToArr,quantityToArr];

    productColors.addEventListener('change',function(e){
        colorChanging(productColorsItem);
        return e.target.value;
    });

    quantityElement.addEventListener('change', function(e){
        getQuantity();
        return e.target.value;
    });

    const button = document.getElementsByTagName('button')[0];
    button.addEventListener('click', function(e){
        function sendToCart(arrCartEntry){

            if(arrCartEntry[1]!='SVP choisissez une couleur' && arrCartEntry[2] !=0){       
                populateStorage();
            }
            arrCartEntryBis = arrCartEntry;
            console.log('bouton entendu!');
        };
        sendToCart(arrCartEntry);  
        return e.target.value;
    });

}

main();


