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

    for(let i=0; i<colorChoice.length; i++){

        let color = colorChoice[i];
       // productColorOptionBlank = options[0] //options [i=0] 

        var option = options[i+1]//let i=0 donne let i+1 = 1;
        // comme si pour let j=i+1   (htmloptionelement) option = options[j];
        // option est une des options de couleur dans le tableau colorChoice
        //ça n'inclue pas options[0] qui ne correspond à aucune couleur dans le tableau colorChoice;
        

        // i=0 => j=1 donc je fais correspondre colorChoice[0] à options[1]

        /*<select name="color-select" id="colors">
            options[0]
            <option value="">--SVP, choisissez une couleur -</option>

            item avec "colors" :["vert","blanc"]
            colorechoice[0] = "vert";
            options[1]=<option value="vert">vert</option>
            
            <option value="vert">vert</option>
            <option value="blanc">blanc</option>
         </select>
        */

        //colorChoice[0] dans tableau "colors" de item [couleur item 1, couleur item 2] ==> ça retourne couleur1 ===> 1ère option ajoutée 
       
        option = document.createElement('option');
        option.setAttribute('value', color);

        option.textContent = color;

        productColors.appendChild(option);
    }
    return productColors//CONST PRODUCTCOLORS
}


const quantityElement  = document.querySelector('input');

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
        return arr
    }

}

//soit retourne un tableau => arrCartEntry prendra les valeurs de ce tableau (change)
//soit ne retourne rien;


var retrieveColor =(productColors)=>{
    //*1    
    var arr = setPurchase();
    var  color = arr[1];

    var productColors = document.querySelector('select');
    var options = productColors.getElementsByTagName('option');

    for(let i=0; i<options.length; i++){
        var option = options[i];

        if(option.selected){
            color= option.value;
            console.log( 'color : '+color)
            return color;
        }
    }
}

var retrieveQuantity =(quantityElement)=>{
    //*4 
    var quantityElement = document.querySelector('input');
    var quantity = quantityElement.value;
    console.log( 'quantity : '+quantity)

    return quantity;//*5 
}

//commentaires
//*1 local var arrCartEntry any[] avec 3 entrées
//*2arrCartEntryAfterPossibleChange, avec pour paramètre de fonction (local var arrCartEntry any[]), retourne local var any[](variableUpDate)
//arrCartEntry prend la valeur de variableUpDate, une variable arrCartEntry (qui aurait pu prendre de nouvelles valeurs ===> voir commentaire (à ligne relative -20 à -12)
//****************************************************
//*Conclusion :  local var arrCartEntry = [any,any,any]**************************************************
//*3 idUrl const string
//donc local var arrCartEntry[0] devient const string quand retourné
//*4--------------- var param HTMLInputElement
//*5 const arrCartEntry

function populateStorage (arrCartEntry){

    localStorage.setItem('id', arrCartEntry[0]);
    localStorage.setItem('color', arrCartEntry[1]);
    localStorage.setItem('quantity', arrCartEntry[2]);

}

const button= document.querySelector('button'); 

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

function retrieveArr (){
    
    var options = productColors.querySelectorAll('option');
    function colorChange(){
        var clr="";
        for(let i=0; i<options.length; i++){
            var option = options[i];
            if(option.selected){
                clr = option.value;
            }
        }
        console.log('click clr: ' + clr);
        return clr;
    }

    productColors.onchange = colorChange;
    
    var color = colorChange();

    //rappel const quantityElement  = document.querySelector('input');
    function quantityChange(){
        var qt = quantityElement.value;
        console.log('click qt: ' + qt);
        return qt
    };

    quantityElement.onchange= quantityChange;

    var quantity= quantityChange();

    var arrCartEntry = [idUrl, color, quantity];

    console.log('///////var arrCartEntry = '+arrCartEntry);

    return arrCartEntry;
};

var arrCartEntry = retrieveArr();
console.log('arrCartEntry : ' +arrCartEntry);

button.addEventListener('click', function(_event){
    if(arrCartEntry[1]!="" && arrCartEntry[2]!=""){      
        populateStorage(arrCartEntry);
    }
});
