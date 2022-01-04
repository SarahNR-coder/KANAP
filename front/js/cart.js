//fonctions de récupération de données-------------

 var setPurchase=()=>{
    //var lineValue0 = localStorage.getItem(localStorage.key(0));
    var finalStorageArr =new Array("");
    //finalStorageArr[0] = lineValue0;      
    for(let i=0; i<localStorage.length; i++){ 
        var line= localStorage.getItem(localStorage.key(i));            
        finalStorageArr[i]=line;
    }
    return finalStorageArr;
}


//fonctions de calcul de prix string à partir de prix nombres et l'inverse


function toPriceString (price0){
    var string ="";
    string= price0.toString();
    var stringLength = string.length;
    var price ="";

    if(stringLength <4){
        price = string;
    }else{
                    
        var lastCharIndex = stringLength -1;
        var numberOfCharTrios = Math.floor(stringLength/3);
        var totalCharsTrios =numberOfCharTrios*3;
        var string1stPart ="";

        var end1stPartIndex = stringLength - totalCharsTrios;

        string1stPart =string.substring(0, end1stPartIndex);
        var startLastPartIndex = lastCharIndex - 3;
        var stringLastPart = string.substring(startLastPartIndex,lastCharIndex);

        price = string1stPart;

        for(let i=0;end1stPartIndex+i<startLastPartIndex; i+=3 ){
            var stringMiddlePart = string.substring(end1stPartIndex+i,end1stPartIndex+i+3);

            var stringAllMiddleParts = ' '+ stringMiddlePart;
            price += stringAllMiddleParts;

        }
        price +=' '+stringLastPart;
    } 
    return price;
}

//Fonctions création de contenu---------------------

//création de l'image de la vignette produit-panier à partir d'une variable qui est un block div itemImage où l'on insére l'url de l'image et son texte alternatif, block image que l'on retourne;
var addImageTocartItem =(imageUrlKanap, altTxtKanap)=>
{
    const itemImage = document.createElement('div');
    const itemImageShown = document.createElement('img');
    itemImageShown.setAttribute('src', imageUrlKanap);
    itemImageShown.setAttribute('alt', altTxtKanap);

    itemImage.appendChild(itemImageShown);
    //console.log("je passe dans image");

    return itemImage;
}
//création du contenu de la vignette produit-panier à partir d'une variable qui est un block div itemContent, où l'on insère la couleur, le nom, et le prix du produit-panier dans un block div description et sa quantité dans un élément input (quantité changeable), block content que l'on retourne;

var addContentTocartItem =(color, quantity, nameKanap, price) =>
{
    const itemContent = document.createElement('div');
    //#.1
    const contentDescription =document.createElement('div');
    contentDescription.classList.add('cart__item__content__description');
    //#.1
    const contentSettings =document.createElement('div');
    contentSettings.classList.add('cart__item__content__settings');

    //#
    itemContent.appendChild(contentDescription);//#.1
    itemContent.appendChild(contentSettings);//#.2

    //#.1.1
    const descriptionTheName = document.createElement('h2');
    descriptionTheName.textContent = nameKanap;
    //#.1.2 
    const descriptionTheColor = document.createElement('p');
    descriptionTheColor.textContent = color;
    //#.1.3
    const descriptionThePrice = document.createElement('p');
    var string = price+',00 €'; 
    descriptionThePrice.textContent = string ;
    console.log('descriptionThePrice utilise pour son textContent (string), price = '+price);
    console.log('descriptionThePrice donne: textContent (string) = '+string);

    //#.1
    contentDescription.appendChild(descriptionTheName)//#.1.1
    contentDescription.appendChild(descriptionTheColor);//#.1.2
    contentDescription.appendChild(descriptionThePrice);//#.1.3

    //#.2.1
    const settingsQuantity = document.createElement('div');
    settingsQuantity.classList.add('cart__item__content__settings__quantity');
    //#.2.2
    const settingsDelete = document.createElement('div');
    settingsDelete.classList.add('cart__item__content__settings__delete');

    //#.2
    contentSettings.appendChild(settingsQuantity);//#.2.1
    contentSettings.appendChild(settingsDelete);//#.2.2

    //#.2.1.1
    const QuantityP = document.createElement('p');
    QuantityP.textContent ='Qté :';
    //#.2.1.2
    const QuantityInput = document.createElement('input');
    QuantityInput.setAttribute('type','number');
    QuantityInput.setAttribute('name', 'itemQuantity');
    QuantityInput.setAttribute('min', '1');
    QuantityInput.setAttribute('max','100');
    QuantityInput.setAttribute('value', quantity);

    //#.2.1
    settingsQuantity.appendChild(QuantityP);//#.2.1.1
    settingsQuantity.appendChild(QuantityInput);//#.2.1.2

    //#.2.2.1
    const suppr = document.createElement('p');
    suppr.classList.add('deleteItem');
    suppr.textContent='Supprimer';

    //#.2.2
    settingsDelete.appendChild(suppr);//#.2.2.1

    return itemContent;
}

var idInLine = (line)=>{
    var location = line.search(/[,]/);
    var id = line.substring(0,
    location);
    return id; 
}
var colorInLine = (line)=>{
    var location = line.search(/[,]/);
    var colorAndQuantity = line.substring(
    location +1, line.length-1);
    var location2 = colorAndQuantity.search(/[,]/) + location;
    var color= line.substring(location +1, +location2 +1 );
    // console.log("color : '" + color + "'");
    return color;
}

var quantityInLine = (line)=>{
    // console.log("line : " + line);
    var location =  line.search(/[,]/);
    // console.log("location : " + location);
    var colorAndQuantity = line.substring(location +1, line.length);
    // console.log("colorAndQuantity : '" + colorAndQuantity + "'");
    // var location2 = colorAndQuantity.search(/[,]/) + location + 1;
    var locationSecond = colorAndQuantity.search(/[,]/) +1;
    // console.log("locationSecond : " + locationSecond);
    // var quantity = line.substring(location2 + 1, line.length-1);
    var quantity = colorAndQuantity.substring(locationSecond, colorAndQuantity.length);
    // console.log("quantity : " + quantity);
    return quantity;
}

var totalPriceCalc=()=>{
    var totalPrice0 = 0;
    var totalPriceHTML = document.getElementById("totalPrice");
    // console.log("totalPriceHTML : " + totalPriceHTML.nodeName);
    var inputs = document.getElementsByName("itemQuantity");
    // console.log("inputs : " + inputs.length);
    // var itemColl = document.getElementsByClassName('cart__item');
 
    for(let i=0; i<inputs.length; i++){
        // var item = itemColl[i];
        var input = inputs[i];
        // var item = input.closest("article");
        var quantity = input.value;
        //console.log("quantity s'il te plait avec value : " + quantity);
        var quantity0 = parseInt(quantity);
        // console.log("quantity0 : " + quantity0);
        var priceElement = document.getElementsByClassName('cart__item__content__description')[i].getElementsByTagName('p')[1];
        // console.log("priceElement : " + priceElement.nodeName);
        var string = priceElement.textContent;
        // console.log("string : " + string);
        var price = string.substring(0,string.length - string.match(/\s/g).length -3);
        // console.log("price : " + price);
        price = price.replace(/ /g, "");
        // console.log("price : " + price);
        var price0 = parseInt(price); 
        totalPrice0 += quantity0*price0;
    }
    var totalPrice = toPriceString(totalPrice0) 
    +',00';
    totalPriceHTML.textContent = totalPrice;
    return totalPrice0;
}

var totalQuantityCalc=()=>{
    var totalQuantity0 = 0;
    var totalQuantityHTML = document.getElementById("totalQuantity");
    // console.log('totalQuantityHTML : ' + totalQuantityHTML.nodeName);
    var inputs = document.getElementsByTagName('input');
    // console.log('inputs : ' + inputs.length);
 
    for(let i=0; i<inputs.length; i++){      
        if(inputs[i].name == 'itemQuantity'){
            var input = inputs[i];
            item = input.closest("article");
            var quantity = input.value;
            var quantity0 = parseInt(quantity);
            totalQuantity0 += quantity0
        }
    }
    var totalQuantity = totalQuantity0.toString();
    totalQuantityHTML.textContent = totalQuantity;
    return totalQuantity0;
}

var createCollection =(data)=>{  
    i = 0;
    var finalStorageArr = setPurchase();
    var cartItems = document.getElementById("cart__items");

    finalStorageArr.forEach(line =>{       
        var color = colorInLine(line);
        //console.log("color : " + color);
        var quantity = quantityInLine(line);
        //console.log('quantity : ' + quantity);
        var id = idInLine(line);
        //console.log("id : " + id);

        var price0 = 0;
        var price ="";
        var nameKanap ="";
        var imageUrlKanap ="";
        var altTxtKanap ="";
        i=0;
        
        do{
            if(data[i]._id == id){
                price0 = data[i].price;
                price = toPriceString(price0);
                nameKanap = data[i].name;        
                imageUrlKanap = data[i].imageUrl;
                altTxtKanap = data[i].altTxt;
            }
            i++;
        }while(i < data.length)

        var itemImage = addImageTocartItem(imageUrlKanap, altTxtKanap);
        itemImage.classList.add('cart__item__img');
        var itemContent =addContentTocartItem(color, quantity, nameKanap, price);
        itemContent.classList.add('cart__item__content');
        var item = document.createElement("section");
        item.classList.add('cart__item');        
        item.dataset.id = id;
        item.dataset.color = color;
        item.appendChild(itemImage);
        item.appendChild(itemContent);
        cartItems.appendChild(item);
        i++;
    })
    return cartItems; 
}           
//création d'une section d'items comportant une fiche/article par produit commandé

//**************************************************


var create =()=> 
fetch("http://localhost:3000/api/products")
.then(res =>{
    if (res.ok){
        return res.json();
    }
})
.then(data => {
    return data;
})
.then(data =>{
    var cartItems = createCollection(data);
    return cartItems;
})
.catch (err => {
    console.log('erreur suivante:'+ err);
    return err;
})


    


//à chaque ligne de tableau-panier (localStorage), correspondant à un Kanapé donné avec une couleur donnée, correspond une vignette produit cartItem 'article.item__cart', que l'on ajoute (appendChild())sous la 'section.items__cart' nommée cartItems;
//on renvoie la section remplie par les vignettes produit qui est une variable car une fois établie elle peut changer puisque l'on peut supprimer des vignettes cartItem;

const main =async()=>{
    var cartItems = await create();
    var totalQuantityHTML = document.getElementById("totalQuantity");
    var totalPriceHTML = document.getElementById("totalPrice");
    var totalPrice0 = totalPriceCalc();
    //console.log("totalPrice0 : " + totalPrice0);
    var totalQuantity0 = totalQuantityCalc();
    console.log("totalQuantity0 : " + totalQuantity0);
    var inputs = document.getElementsByName('itemQuantity');
    //var deletes = document.getElementsByClassName('deleteItem');

    //inputs.forEach(input =>{
        //var item = input.closest("article");
    for(let i=0; i<inputs.length; i++){
        var item = document.getElementsByClassName("cart__item")[i];
        var id = item.dataset.id;
        //console.log("id : " + id);
        var color = item.dataset.color;
        var quantity = inputs[i].getAttribute("value");
        var quantity0 = parseInt(quantity);
        var theName = item.getElementsByTagName('h2')[0];
        var idName = theName.textContent.substring(6);
        var thePrice = item
            .getElementsByClassName('cart__item__content__description')[0]
            .getElementsByTagName('p')[1];
        //console.log('thePrice : ' + thePrice);
        var string = thePrice.textContent;
        //console.log('string : ' + string);
        var price = string.substring(0,string.length -5);
        price = price.replace(/ /g, "");
        //console.log('price : ' + price);
        var price0 = parseInt(price);

        inputs[i].addEventListener('change', function (e) {
            var quantityNow0 = 0;
            var quantityNow = e.target.value;
            quantityNow0 = parseInt(quantityNow);
            console.log("quantityNow0 : " + quantityNow0);

            var totalQuantityNow0 = totalQuantity0 - quantity0 +quantityNow0;
            console.log("totalQuantityNow0 : " + totalQuantityNow0);
            var totalPriceNow0 = totalPrice0 -quantity0*price0 + quantityNow0*price0;
            console.log("totalPriceNow0 : " + totalPriceNow0);

            totalQuantityHTML.textContent=totalQuantityNow0.toString();
            console.log("totalQuantityHTML : " + totalQuantityHTML.textContent);

            // totalPriceHTML.textContent = toPriceString(totalPriceNow0) +',00';
            totalPriceHTML.textContent = totalPriceNow0.toString() + ',00';
            console.log("totalPriceHTML : " + totalPriceHTML.textContent);

            var finalStorageArr = setPurchase();
            finalStorageArr.splice(
                finalStorageArr.indexOf(
                    id+','+color+','+quantity),1, 
                    [id+','+color+','+quantityNow]);

            localStorage.setItem(idName+','+color,[id+','+color+','+quantityNow]);
            
            console.log('totalQuantityNow0 foreach item -listen quantityinput-= '+totalQuantityNow0);
            console.log('totalPriceNow0 foreach item -listen quantityinput-= '+totalPriceNow0);
            console.log('idName foreach item -listen quantityinput-= '+idName);
            console.log('color foreach item -listen quantityinput- = '+color);        
            console.log('id foreach item  -listen quantityinput-= '+id);
            console.log('price foreach item -listen quantityinput- = '+price);
            console.log('price0 foreach item -listen quantityinput- = '+ price0);
            console.log('quantityNow0 foreach item -listen quantityinput- ='+quantityNow0) 
            console.log('quantity0 foreach item -listen quantityinput- ='+quantity0)
        })
        var erasor = item.querySelector(".deleteItem");
    
        erasor.addEventListener('click', (_e) =>{
            totalQuantityNow0 = totalQuantity0 -quantity0;
            totalPriceNow0 = totalPrice0 - quantity0*price0;

            totalQuantityHTML.textContent= totalQuantityNow0.toString();

            totalPriceHTML.textContent = toPriceString(totalPriceNow0) + ',00';
 
            cartItems.removeChild(item);
            
            console.log('totalQuantityNow0 foreach item -listen erasor-= '+totalQuantityNow0);
            console.log('totalPriceNow0 foreach item -listen erasor-= '+totalPriceNow0);
            console.log('totalQuantity foreach item -listen erasor-= '+totalQuantity);
            console.log('totalPrice foreach item -listen erasor-= '+totalPrice);
            console.log('idName foreach item -listen erasor- = '+idName);
            console.log('color foreach item -listen erasor- = '+color);
            console.log('price foreach item -listen erasor- = '+price);
            console.log('price0 foreach item -listen erasor- = '+ price0); 
            console.log('quantity0 foreach item -listen erasor- = '+quantity0);  

            var finalStorageArr = setPurchase();
            finalStorageArr.splice(finalStorageArr.indexOf(id+','+color+','+quantity),1)
            localStorage.removeItem(idName+','+color);
        })
    }
}

main();

