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

    var arrCartEntry = [currentId, currentColor, currentQuantityNumber];

    console.log('setPurchase marche');

    return arrCartEntry;

}

//récupère (get) valeurs du storage => je crée un NOUVEAU TABLEAU (j'actualise le tableau) => ex dans le panier je change la quantité et la couleur d'un produit=> le tableau de panier est différent

//appelée UNIQUEMENT DANS POPULATE STORAGE dans cette page


const populateStorage =(arrCartEntry)=>{

    localStorage.setItem('id', arrCartEntry[0]);
    localStorage.setItem('color', arrCartEntry[1]);
    localStorage.setItem('quantity', arrCartEntry[2]);

    console.log('populateStorage marche: AU STORAGE LES VALEURS arrCartEntry[0]:'+arrCartEntry[0] +'pour id; arrCartEntry[1]:'+arrCartEntry[1]+'pour color; arrCartEntry[2]:'+arrCartEntry[2]+'pour quantity');

    //TRANSMISSION VALEURS TABLEAU LOCAL=> STORAGE, VALEURS QUI S'AJOUTENT A CELLES TRANSMISES PAR LE PANIER
    var arr = setPurchase();
    //RECUPERATION VALEURS DU STORAGE (VALEURS QUI PROVIENNENT AUSSI DU PANIER ex. change quantité et/ou couleur dans le panier)

    //CREATION NOUVEAU TABLEAU LOCAL
    //=> retourne nouveau arrCartEntry
    // const newArrCartEntry = setPurchase();

    console.log('nouveau tableau après récupération des valeurs du storage par setPurchase:'+arrCartEntry);

    if(arr!= arrCartEntry){//si le tableau généré n'est pas arrCartEntry
        var newArrCartEntry = arr;//on nomme ce tableau newArrCartEntry
    }
    
    if(newArrCartEntry){
        arrCartEntry = newArrCartEntry;//si un nouveau tableau nommé newArrCartEntry existe
        localStorage.setItem('id', arrCartEntry[0]);
        localStorage.setItem('color', arrCartEntry[1]);
        localStorage.setItem('quantity', arrCartEntry[2]);
    }
}

const  sendToCart=(arrCartEntry)=>{

    var arrCartEntry = new Array(3);
    if(arrCartEntry[1]!='SVP choisissez une couleur' && arrCartEntry[2] !=0){          
        populateStorage(arrCartEntry);//retourne le tableau, qu'il soit le même, donc arrCartEntry ou un nouveau, donc newArrCartEntry;
        return arrCartEntry
    }
}

//function activée au click bouton
//const StorageArray = populateStorage(newArrCartEntry)


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

    productColorsItem.addEventListener('change', function(event){
        console.log('productColorsItem change ==> event.target.value = '+event.target.value);;
    });

    quantityElement.addEventListener('change',function changeEventHandlerQuantity (event){
        console.log('quantityElementChange ==> event.target.value = '+event.target.value);
    });

    const button= document.querySelector('button');

    const colorToArr = colorChanging(productColorsItem);
    const quantityToArr =getQuantity();

    const arrCartEntry =[idUrl, colorToArr, quantityToArr];

    const newArrCartEntrySendToCart = sendToCart(arrCartEntry);
    console.log('newArrCartEntrySendToCart: ' +newArrCartEntrySendToCart);

    button.addEventListener('click', function(event){
        sendToCart();
        console.log('bouton entendu!');
        console.log( 'button.addEventListener event.target.value : '+event.target.value);
    });      

    

}

main();



