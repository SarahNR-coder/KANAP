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

//----------------------var param (ligne relative +2)
var arrCartEntryChange=(arr)=>{
    var arr = setPurchase();//var param
    var arrCartEntry = ["","",""];
    
    arrCartEntry = arr;

    return arrCartEntry;//var arrCartEntryPossiblyChanged string [];
}

//-----------------------------------arr param (ligne relative +3)
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

var retrieveArrCartEntry =()=>{

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

    var optionCollection = productColors.querySelectorAll('option');

    for(let i=0; i<optionCollection.length; i++){
        var option = optionCollection[i];

        if(option.selected){
            var color = option.getAttribute('value');
            arrCartEntry[1]= color;
            console.log( 'arrCartEntry[1] : '+arrCartEntry[1])
        }
    }

    //--------------- var param HTMLInputElement
    arrCartEntry[2] = quantityElement.getAttribute('value');
    // 'value' est associé à un string       =>  HTMLInputElement.getAttribute('value') donne un string => arrCartEntry[2] est local var  string 

    return arrCartEntry;//const arrCartEntry
}

function populateStorage (arrCartEntry){

    localStorage.setItem('id', arrCartEntry[0]);
    localStorage.setItem('color', arrCartEntry[1]);
    localStorage.setItem('quantity', arrCartEntry[2]);

}

const button= document.querySelector('button'); 

//****************************MAIN************************

const main = async () => {

    const item = await retrieveItemData();

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
    const productColors = showColors(item);
    //ajuste à item retourne const productColors

    productColors.addEventListener('change', function(event){
        console.log('productColorsItem change ==> event.target.value = '+event.target.value);
        var color = event.target.value;
        //productColors.value
        var options = productColors.getElementsByTagName('option');
        for(let i=0; i<options.length; i++){
            var option=options[i];
            if(option.getAttribute('value') === color){
                option.selected = true;
            }
        }
    });

    //rappel const quantityElement  = document.querySelector('input');

    quantityElement.addEventListener('change',function changeEventHandlerQuantity (event){
        console.log('quantityElementChange ==> event.target.value = '+event.target.value);

        var quantity = event.target.value;
        //quantityElement.value
        //var quantity porte la valeur et la met en attribut de quantityElement
        quantityElement.getAttribute('value') = quantity;

    });
}

main();

const arrCartEntry = retrieveArrCartEntry();

console.log('const arrCartEntry = retrieveArrCartEntry(item) = '+arrCartEntry);

button.addEventListener('click', function(event){
    console.log('event.target.value  de button : '+event.target.value);

    if(arrCartEntry[1]!="" && arrCartEntry[2] !="0"){      
        populateStorage(arrCartEntry);
    }
});



