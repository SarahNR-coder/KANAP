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

const showDescription =(item)=>{

    const productDescription = document.getElementById('description');
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
    return productColors//var
}

//retourne var ou const
var setColorsElement=(item)=>{

    var productColors  = showColors(item);
    var options = productColors.querySelectorAll('option');
    var arrCartEntry = retrieveArrCartEntry(item);

    if(arrCartEntry != null){
        let index=0;
        var color = options[index].getAttribute('value');
        for(index of options.length){
            if(color === arrCartEntry[1]){
                options[index].selected;
            }
        }
    return productColors;// var productColors, car change, 
    // la couleur change,elle donne la valeur que doit avoir l'attribut de l' HTMLOptionElement qui est celui qui est sélectionné
    //l'HTMLOptionElement sélectionné change
    //l'HTMLSelectElement change
    }
}

//return var ou const
var setQuantityElement=(item)=>{

    var quantityElement  = document.querySelector('input');
    var qt = quantityElement.getAttribute('value');

    var arrCartEntry= retrieveArrCartEntry(item);
    if(arrCartEntry != null){
        qt = arrCartEntry[2]
        quantityElement.setAttribute('value',qt)
    }
       
    return quantityElement; // var quantityElement car change,
    //la quantité change (voir addEventListener dans main)
    //ce qui fait que la valeur de son attribut 'value' change 
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

    return arr;//var arr [string,string,string] ou string = 'setPurchase n a pas retourné de tableau'

}

//soit retourne un tableau => arrCartEntry prendra les valeurs de ce tableau (change)
//soit ne retourne pas de tableau

//----------------------var param (ligne relative +2)
var arrCartEntryChange=(arr)=>{
    var arr = setPurchase();//var param
    var arrCartEntry = ["","",""];
    if( arr !='setPurchase n a pas retourné de tableau' && arr!= arrCartEntry  ){
        arrCartEntry = arr;
    }
    return arrCartEntry;//var arrCartEntryPossiblyChanged string [];
}

//-----------------------------------var param (ligne relative +2)
var arrCartEntryAfterPossibleChange =(arr)=>{
    var arrCartEntry =["","",""]; //var
    var arrCartEntryPossiblyChanged = arrCartEntryChange(arr);// local var_ _ _ = _ _ _ _ _(param)

    arrCartEntry = arrCartEntryPossiblyChanged;

    return arrCartEntry;
    //var arrCartEntry (avec NOUVELLES VALEURS possiblement)
    
    //ces NOUVELLES VALEURS résulteraient de la comparaison avec les *****valeurs obtenues par setPurchase*****,

    // comparaison <=> arrCartEntryChange retourne des valeurs === NOUVELLES VALEURS

    //******valeurs obtenues par setPurchase***********

    //setPurchase retourne un tableau de valeurs (arr) correspondant à l'id, la couleur et la quantité indiqués dans le localStorage, valeurs qu'il a récupéré par localStorage.getItem ==> "NOUVELLES VALEURS"

}
//----------- = (any param item) =>{
var retrieveArrCartEntry =(item)=>{

    var arrCartEntry = ["","",""];
    //local var arrCartEntry any[] avec 3 entrées
    
    var variableUpDate = arrCartEntryAfterPossibleChange(arrCartEntry);
    arrCartEntry = variableUpDate;
    //arrCartEntryAfterPossibleChange, avec pour paramètre de fonction (local var arrCartEntry any[]), retourne local var any[](variableUpDate)
    //arrCartEntry prend la valeur de variableUpDate, une variable arrCartEntry (qui aurait pu prendre de nouvelles valeurs ===> voir commentaire (à ligne relative -20 à -12)

    //****************************************************
    //*Conclusion :  local var arrCartEntry = [any,any,any]**************************************************

    arrCartEntry[0] = idUrl;//idUrl const string
    //donc local var arrCartEntry[0] devient const string quand retourné

    var productColors =setColorsElement(item);
    var options = productColors.querySelectorAll('option');

    let option=options[index];
    option.selected;
    arrCartEntry[1]= option.getAttribute('value');

    //--------------- var param HTMLInputElement
    arrCartEntry[2] = setQuantityElement().getAttribute('value');// 'value' est associé à un string       =>  HTMLInputElement.getAttribute('value') donne un string => arrCartEntry[2] est local var  string 

    return arrCartEntry;//var arrCartEntry
}

function populateStorage (item){
    var arrCartEntry = retrieveArrCartEntry(item);

    localStorage.setItem('id', arrCartEntry[0]);
    localStorage.setItem('color', arrCartEntry[1]);
    localStorage.setItem('quantity', arrCartEntry[2]);

    console.log('populateStorage marche: AU STORAGE LES VALEURS arrCartEntry[0]:  '+arrCartEntry[0] +' pour id; arrCartEntry[1]:  '+arrCartEntry[1]+'  pour color; arrCartEntry[2]:  '+arrCartEntry[2]+' pour quantity');

}

function  sendToCart(item){

    var arrCartEntry = retrieveArrCartEntry(item);
    if(arrCartEntry[1]!="" && arrCartEntry[2] !="0"){          
        populateStorage(item);
    }
}

//****************************MAIN************************

const main = async () => {

    const item = await retrieveItemData();

    var arrCartEntry = [idUrl,"","0"];
    setImageAttributes(item);
    fillImageDiv(item);
    showTitle(item);
    showPrice(item);
    showColors(item);
    setColorsElement(item);

    showDescription(item);

    setQuantityElement(item);

    productColors.addEventListener('change', function(event){
        console.log('productColorsItem change ==> event.target.value = '+event.target.value);;
        retrieveArrCartEntry(item);
        setColorsElement(item);
        stopPropagation();
    });

    quantityElement.addEventListener('change',function changeEventHandlerQuantity (event){
        console.log('quantityElementChange ==> event.target.value = '+event.target.value);
        retrieveArrCartEntry(item);
        setQuantityElement(item);
        stopPropagation();
    });

    const button= document.querySelector('button');

    button.addEventListener('click', function(event){
        retrieveArrCartEntry(item);
        sendToCart(item);
        stopPropagation();
        console.log('bouton entendu!');
        console.log('Pour le click du bouton =====>event.target.value ='+event.target.value);
        console.log('arrCartEntry au click du bouton'+ arrCartEntry);
    });
    console.log('arrCartEntry à la fin :'+ arrCartEntry);
    return arrCartEntry;
}

main();


