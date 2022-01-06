// Fichier de gestion de la page panier

/**
 * @returns {string[]}
 * Aquisition des données du localStorage
 */
 var setPurchase=()=>{
    var cartArray =null;
    if(localStorage.length != 0){
        cartArray =new Array("");
        for(let i=0; i<localStorage.length; i++){ 
            var line= localStorage.getItem(localStorage.key(i));            
            cartArray[i]=line;
        }
        return cartArray;
    }
    return cartArray;
}

/**
 * @param {any} imageUrlKanap 
 * @param {any} altTxtKanap 
 * @returns {HTMLDivElement}
 * Création de l'image de la fiche produit panier
 */
var addImageTocartItem =(imageUrlKanap, altTxtKanap)=>
{
    const itemImage = document.createElement('div');
    const itemImageShown = document.createElement('img');
    itemImageShown.setAttribute('src', imageUrlKanap);
    itemImageShown.setAttribute('alt', altTxtKanap);
    itemImage.appendChild(itemImageShown);
    return itemImage;
}

/**
 * @param {any} color 
 * @param {any} quantity 
 * @param {any} nameKanap 
 * @param {any} price 
 * @returns {HTMLDivElement}
 * Création du contenu de la fiche produit panier
 */
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

/**
 * @param {any} line 
 * @returns {any}
 * Extraction de l'identifiant
 */
var idInLine = (line)=>{
    var location = line.search(/[,]/);
    var id = line.substring(0,
    location);
    return id; 
}

/**
 * @param {any} line 
 * @returns {any}
 * Extraction de la couleur
 */
var colorInLine = (line)=>{
    var location = line.search(/[,]/);
    var colorAndQuantity = line.substring(
    location +1, line.length-1);
    var locationSecond = colorAndQuantity.search(/[,]/) + location;
    var color= line.substring(location +1, +locationSecond +1 );
    return color;
}

/**
 * @param {any} line 
 * @returns {any}
 * Extraction de la quantité
 */
var quantityInLine = (line)=>{
    var location =  line.search(/[,]/);
    var colorAndQuantity = line.substring(location +1, line.length);
    var locationSecond = colorAndQuantity.search(/[,]/) +1;
    var quantity = colorAndQuantity.substring(locationSecond, colorAndQuantity.length);
    return quantity;
}

/**
 * @returns {int}
 * Calcul du prix total
 */
var totalPriceCalc=()=>{
    var totalPriceInt = 0;
    var totalPriceHTML = document.getElementById("totalPrice");
    var inputs = document.getElementsByName("itemQuantity");
 
    for(let i=0; i<inputs.length; i++){
        var input = inputs[i];
        var quantity = input.value;
        var quantityInt = parseInt(quantity);
        var priceElement = document.getElementsByClassName('cart__item__content__description')[i].getElementsByTagName('p')[1];
        var string = priceElement.textContent;
        var price = string.substring(0,string.length - string.match(/\s/g).length -3);
        price = price.replace(/ /g, "");
        var priceInt = parseInt(price); 
        totalPriceInt += quantityInt*priceInt;
    }
    var totalPrice = totalPriceInt.toString() +',00';
    totalPriceHTML.textContent = totalPrice;
    return totalPriceInt;
}

/**
 * @returns {int}
 * Calcul de la quantité totale
 */
var totalQuantityCalc=()=>{
    var totalQuantityInt = 0;
    var totalQuantityHTML = document.getElementById("totalQuantity");
    var inputs = document.getElementsByTagName('input');

    for(let i=0; i<inputs.length; i++){      
        if(inputs[i].name == 'itemQuantity'){
            var input = inputs[i];
            item = input.closest("article");
            var quantity = input.value;
            var quantityInt = parseInt(quantity);
            totalQuantityInt += quantityInt
        }
    }

    var totalQuantity = totalQuantityInt.toString();
    totalQuantityHTML.textContent = totalQuantity;
    return totalQuantityInt;
}

/**
 * @param {any} data 
 * @returns {HTMLElement}
 * Recupération des données du store
 * Création de toutes les fiches produit panier
 */
var createCollection =(data)=>{  
    i = 0;
    var cartArray = setPurchase();
    var cartItems = document.getElementById("cart__items");

    cartArray.forEach(line =>{       
        var color = colorInLine(line);
        var quantity = quantityInLine(line);
        var id = idInLine(line);

        var priceInt = 0;
        var priceString ="";
        var nameKanap ="";
        var imageUrlKanap ="";
        var altTxtKanap ="";
        i=0;
        
        do{
            if(data[i]._id == id){
                priceInt = data[i].price;
                priceString = priceInt.toString();
                nameKanap = data[i].name;        
                imageUrlKanap = data[i].imageUrl;
                altTxtKanap = data[i].altTxt;
            }
            i++;
        } while(i < data.length)

        var itemImage = addImageTocartItem(imageUrlKanap, altTxtKanap);
        itemImage.classList.add('cart__item__img');
        var itemContent =addContentTocartItem(color, quantity, nameKanap, priceString);
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

/**
 * Création d'un ensemble de fiches produit panier
 */
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

/**
 * Fonction principale
 * Gestion des evenements de modification et suppression
 */
const main =async()=>{
    var cartItems = await create();
    totalPriceCalc();
    totalQuantityCalc();
    var inputs = document.getElementsByName('itemQuantity');
    var deletes = document.getElementsByClassName('deleteItem');

    for(let i=0; i<inputs.length; i++){
        inputs[i].addEventListener('change', function (e) {
            var item = document.getElementsByClassName("cart__item")[i];
            var id = item.dataset.id;
            var color = item.dataset.color;
            var theName = item.getElementsByTagName('h2')[0];
            var idName = theName.textContent.substring(6);
            var quantityNow = e.target.value;
            totalQuantityCalc();
            totalPriceCalc();
            localStorage.setItem(idName+','+color,[id+','+color+','+quantityNow]);
        })
    
        deletes[i].addEventListener('click', (_e) =>{
            var item = document.getElementsByClassName("cart__item")[i];
            cartItems.removeChild(item);
            var color = item.dataset.color;
            var theName = item.getElementsByTagName('h2')[0];
            var idName = theName.textContent.substring(6);
            totalQuantityCalc();
            totalPriceCalc();
            localStorage.removeItem(idName+','+color);
            location.reload();
        })
    }
}

main();