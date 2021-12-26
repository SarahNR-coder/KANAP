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

let optionElement =productColors.querySelector('option');
optionElement.selected = true;
//dans le tableau la valeur couleur aura la valeur =====>  optionElement.value ( fonction retrieveArrCartEntry avec  pour paramètres productColors et quantityElement)



//*******************************************************
//***********************QUANTITY************************
//*******************************************************

const quantityElement  = document.querySelector('input');
//dans le tableau la valeur quantité aura la valeur =======> quantityElement.value;

//********************************************************
//***********************LOCALSTORAGE*********************
//********************************************************




var setPurchase=()=> {
    var currentId = localStorage.getItem('id');
    var currentColor = localStorage.getItem('color');
    var currentQuantity = localStorage.getItem('quantity');

    var arr;
    if(currentId !=null && currentColor != null && currentQuantityNumber != null){
        arr = [currentId, currentColor, currentQuantityNumber];
    }else{
        arr = 'setPurchase n a pas retourné de tableau'
    }
    console.log('setPurchase marche');

    return arr;

}

//soit retourne un tableau => arrCartEntry prendra les valeurs de ce tableau


const populateStorage =(arrCartEntry)=>{

    localStorage.setItem('id', arrCartEntry[0]);
    localStorage.setItem('color', arrCartEntry[1]);
    localStorage.setItem('quantity', arrCartEntry[2]);

    console.log('populateStorage marche: AU STORAGE LES VALEURS arrCartEntry[0]:'+arrCartEntry[0] +'pour id; arrCartEntry[1]:'+arrCartEntry[1]+'pour color; arrCartEntry[2]:'+arrCartEntry[2]+'pour quantity');

    //TRANSMISSION VALEURS TABLEAU LOCAL=> STORAGE, VALEURS QUI S'AJOUTENT A CELLES TRANSMISES PAR LE PANIER


    if(arr!= arrCartEntry){//si le tableau généré n'est pas arrCartEntry
        var newArrCartEntry = arr;//on nomme ce tableau newArrCartEntry
    }

}

const  sendToCart=(arrCartEntry)=>{
    if(arrCartEntry[1]!='SVP choisissez une couleur' && arrCartEntry[2] !=0){          
        populateStorage(arrCartEntry);
    }
}

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

    button.addEventListener('click', function(event){
        sendToCart(arrCartEntryPossiblyChanged);
        console.log('bouton entendu!');
    });      
}

main();



