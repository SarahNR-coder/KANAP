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

const productImage = document.createElement("img");

//Adapter la page au produit
function setImageAttributes (item){
  
    productImage.setAttribute("src", item.imageUrl);
    productImage.setAttribute("alt", item.altTxt);

};

const fillImageDiv =(item)=>{

    setImageAttributes(item);
    const productDivImage = document.querySelector('div.item__img');

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

    return productDescription;
};

const productColors = document.querySelector('select');
const productColorOptionBlank = productColors.querySelector('option');

const showColors = (item) =>{
    
    var colorChoice = new Array(); 
    colorChoice = item.colors;
    var options = productColors.querySelectorAll('option');
    //options[0]

    for(let i=0; i<colorChoice.length; i++){

        let color = colorChoice[i];

        var option = options[i+1];//valeur d'index à partir de 1, il y a i couleurs (couleurs de l'item) et i + une option("SVP selectionnez une couleur...")

        option = document.createElement('option');
        option.setAttribute('value', color);

        option.textContent = color;

        productColors.appendChild(option);
    }
    return productColors//CONST PRODUCTCOLORS
}




//****************************MAIN************************

const main = async () => {

    const item = await retrieveItemData();
    //l'item est récupéré

    //rappel const productImage = document.createElement('img');
    setImageAttributes(item);
    //ajuste à item
    fillImageDiv(item);
    // ajuste la div supérieure à productImage (donc à item)

    //rappel const productTitle = document.getElementById('title')
    showTitle(item);
    //ajuste à item

    //rappel const productPrice = document.getElementById('price');
    showPrice(item);
    //ajuste à item

    //rappel const productDescription = document.getElementById('description')
    showDescription(item);
    //ajuste à item

    //rappel const productColors = document.querySelector('select')
    showColors(item);
    //ajuste à item    
}

main(); //la page HTML de l'item est créée


//********************************************************
//***********************LOCALSTORAGE*********************
//********************************************************

function setPurchase() {
    var currentId = localStorage.getItem('id');
    var currentColor = localStorage.getItem('color');
    var currentQuantity = localStorage.getItem('quantity');

    if(currentId !=undefined && currentColor != undefined && currentQuantity != NaN){
        var arr = [currentId, currentColor, currentQuantity];
        return arr
    }
}

//soit retourne un tableau => arrCartEntry prendra les valeurs de ce tableau (change)
//soit ne retourne rien;

function populateStorage (arrCartEntry){

    localStorage.setItem('id', arrCartEntry[0]);
    localStorage.setItem('color', arrCartEntry[1]);
    localStorage.setItem('quantity', arrCartEntry[2]);

}

//********************************************************


var selectedOption = productColors.options[productColors.selectedIndex];

productColors.addEventListener('input', function (e) {
  productColors.value = e.target.value;
  console.log('input => e.target.element :'+ e.target.element);
});
productColors.addEventListener('change', function(e){
    console.log('change => e.target.element :'+ e.target.element);
})

var color = selectedOption.value;

const quantityElement  = document.querySelector('input');
quantityElement.addEventListener('input', function (e) {
    console.log('input => e.target.element :'+ e.target.element);
    quantityElement.value = e.target.value;
});

quantityElement.addEventListener('change', function(e){
    console.log('change => e.target.element :'+ e.target.element);
})



var quantity= quantityElement.value;

var arrCartEntry = [idUrl, color, quantity];
console.log('setPurchase : '+setPurchase());

console.log('///////var arrCartEntry = '+arrCartEntry);

const button= document.querySelector('button'); 

button.addEventListener('click', function(e){
    console.log('e.taget.value :'+e.target.value)
    if(arrCartEntry[1]!="" && arrCartEntry[2]!=""){      
        populateStorage(arrCartEntry);
    }
})

