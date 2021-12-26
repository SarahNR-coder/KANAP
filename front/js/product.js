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

var productImage = document.createElement("img");
//Adapter la page au produit
function setImageAttributes (item){
  
    productImage.setAttribute("src", item.imageUrl);
    productImage.setAttribute("alt", item.altTxt);

};

const fillImageDiv =(item)=>{

    setImageAttributes(item);
    var productDivImage = document.querySelector('div.item__img');

    productDivImage.appendChild(productImage);

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



var showColors = (item) =>{
    var productColors = document.querySelector('select');

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
const setColorsElement=(item)=>{

    var productColors  = showColors(item);
    var options = productColors.querySelector('option');

    if(retrieveArrCartEntry(productColors)){
        var arrCartEntry = retrieveArrCartEntry(productColors);
        var value = arrCartEntry[1]
        for(let i=0; i<options.length; i++){
            var option = options[i];
            var val =option.getAttribute('value');
            if(value = val){
                option.selected;
            ;}
        }    
    }

    return productColors;
}


function setQuantityElement (){

    var quantityElement  = document.querySelector('input');        
    return quantityElement;
}

//********************************************************
//***********************LOCALSTORAGE*********************
//********************************************************




var setPurchase=()=> {
    var currentId = localStorage.getItem('id');
    var currentColor = localStorage.getItem('color');
    var currentQuantity = localStorage.getItem('quantity');

    var arr;
    if(currentId !=null && currentColor != null && currentQuantity != null){
        arr = [currentId, currentColor, currentQuantity];
    }else{
        arr = 'setPurchase n a pas retourné de tableau'
    }
    console.log('setPurchase marche');

    return arr;

}

//soit retourne un tableau => arrCartEntry prendra les valeurs de ce tableau (change)
//soit ne retourne pas de tableau

var arrCartEntryChange=(arrCartEntry)=>{
    var arr = setPurchase();
    var arrCartEntry;
    if( arr !='setPurchase n a pas retourné de tableau' && arr!= arrCartEntry  ){
        arrCartEntry = arr;
    }
    return arrCartEntry;
}

var arrCartEntryAfterPossibleChange =(arrCartEntry)=>{
    var arrCartEntryPossiblyChanged = arrCartEntryChange(arrCartEntry);
    var arrCartEntry;
    arrCartEntry = arrCartEntryPossiblyChanged;

    return arrCartEntry;
}

const retrieveArrCartEntry =(productColors,quantityElement)=>{

    var quantityElement = setQuantityElement();
    var arrCartEntry = new Array(3);
    var arrCartEntry = arrCartEntryAfterPossibleChange(arrCartEntry);

    arrCartEntry[0] = idUrl;

    var options = productColors.querySelectorAll('option');
    var index=0;
    options[index].selected;
    for(index of options.length){
        arrCartEntry[1]= options[index].getAttribute('value');
    }

    arrCartEntry[2] = quantityElement.getAttribute('value');

    return arrCartEntry;
}

function populateStorage (arrCartEntry){
    var arrCartEntry = retrieveArrCartEntry(productColors,quantityElement);

    localStorage.setItem('id', arrCartEntry[0]);
    localStorage.setItem('color', arrCartEntry[1]);
    localStorage.setItem('quantity', arrCartEntry[2]);

    console.log('populateStorage marche: AU STORAGE LES VALEURS arrCartEntry[0]:  '+arrCartEntry[0] +' pour id; arrCartEntry[1]:  '+arrCartEntry[1]+'  pour color; arrCartEntry[2]:  '+arrCartEntry[2]+' pour quantity');

}

function  sendToCart(arrCartEntry){
    if(arrCartEntry[1]!='SVP choisissez une couleur' && arrCartEntry[2] !=0){          
        populateStorage(arrCartEntry);
    }
}

//****************************MAIN************************

const main = async () => {

    const item = await retrieveItemData();

    setImageAttributes(item);
    fillImageDiv(item);
    showTitle(item);
    showPrice(item);
    showColors(item);
    const productColors = setColorsElement(item);

    showDescription(item);

    const quantityElement =setQuantityElement();

    const arrCartEntry = retrieveArrCartEntry(productColors,quantityElement);
    
    productColors.addEventListener('change', function(event){
        console.log('productColorsItem change ==> event.target.value = '+event.target.value);;
    });

    quantityElement.addEventListener('change',function changeEventHandlerQuantity (event){
        console.log('quantityElementChange ==> event.target.value = '+event.target.value);
    });

    const button= document.querySelector('button');

    button.addEventListener('click', function(event){
        sendToCart(arrCartEntry);
        console.log('bouton entendu!');
        console.log('Pour le click du bouton =====>event.target.value ='+event.target.value);
    });
}

main();


