//fonctions de récupération de données-------------

//récupération des données de catalogue de canapés (API)
const retrieveData = () =>fetch("http://localhost:3000/api/products")
.then(res =>{
    if (res.ok){
        return res.json();
    }
})
.then (data => {
    console.log(data);
    return data;})
.catch (err => console.log('erreur suivante:'+ err))

 var setPurchase=()=>{
    var lineValue0 = localStorage.getItem(localStorage.key(0));
    var finalStorageArr =new Array("");
    finalStorageArr[0] = lineValue0;      
    for(let i=1; i<localStorage.length; i++){ 
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
    QuantityInput.setAttribute('name', 'ItemQuantity');
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
    var part1 = line.substring(0,
    line.search(/[,]/)   +1);
    var id = part1;
    return id; 
}
var colorInLine = (line)=>{
    var part2 = line.substring(
    line.search(/[,]/)    +1);
    var color= part2.substring(0,
    line.search(/[,]/)    +1);
    return color;
}

var quantityInLine = (line)=>{
    var part2 = line.substring(
    line.search(/[,]/)    +1);
    var quantity= part2.substring(
    line.search(/[,]/)    +1);

    return quantity;
}
const image=(line)=>
{
    var itemImage =addImageTocartItem(imageUrlKanap, altTxtKanap);
    itemImage.classList.add('cart__item__img');
    return itemImage;
}

const content=(line)=>{
var itemContent =addContentTocartItem(color, quantity, nameKanap, price);
itemContent.classList.add('cart__item__content');
return itemContent;
}

//création d'une section d'items comportant une fiche/article par produit commandé

//**************************************************


const createArticlesAndAppendToSection =()=> 
fetch("http://localhost:3000/api/products")
.then(res =>{
    if (res.ok){
        return res.json();
    }
})
.then (data => {
    return data;
})
.then(data=> {
    i = 0;
    var finalStorageArr = setPurchase();
    finalStorageArr.forEach(line =>{
        
        var color = colorInLine(line);
        var quantity = quantityInLine(line);
        var id = idInLine(line);
        i=0;
        
        do{
            if(data[i]._id == id){
                price0 = data[i].price;
                price = toPriceString(price0);
                nameKanap = data[i].name;        imageUrlKanap = data[i].imageUrl;
                altTxtKanap = data[i].altTxt;
            }
            i++;
        }while(i < data.length)
  
        var itemImage = image(line);
        var itemContent = content(line)
        var item = document.createElement("section");
        item.classList.add('cart__item');
        item.dataset.id = id;
        item.dataset.color = color;
        item.appendChild(itemImage);
        item.appendChild(itemContent);
        var itemCollection = new HTMLCollection(item);
        i++;
    })
    return itemCollection;         
})
.then(  ()=>{
    var totalQuantity0 = 0

    var finalStorageArr = setPurchase();
    finalStorageArr.forEach(line =>{
        var quantity = quantityInLine(line);
        var quantity0 = parseInt(quantity);
        totalQuantity0 += quantity0; 
    })
    var totalQuantity= totalQuantity0.toString();
    return totalQuantity;    
})
.then( data =>{
    var totalPrice0 =0;
    var finalStorageArr = setPurchase();
    finalStorageArr.forEach(line =>{
        var quantity = quantityInLine(line);
        var quantity0 = parseInt(quantity);
        var id = idInLine(line);
        var price0=0
        i=0;
        
        do{
            if(data[i]._id == id){
                price0 = dataArr[i].price;
            }
            i++;
        }while(i < data.length)
       
        totalPrice0 += quantity0*price0;
        var totalPrice = totalPrice0.toString();
        return totalPrice;
    }
)})
.then(itemCollection =>{
    cart.removeChild(cart.querySelector("#cart__items"));
    cart.querySelector("#cart__items").append(itemCollection);
    cart.appendChid(cart.querySelector("#cart__items"));
    cart.querySelector('#totalQuantity').textContent = totalQuantity;
    cart.querySelector('#totalPrice').textContent
    = totalPrice;
    return cart;   
})
.catch (err => console.log('erreur suivante:'+ err))

    

    const totalQuantityHTML = document.getElementById('totalQuantity');
    const totalPriceHTML = document.getElementById('totalPrice');
    var totalQuantity0 =0;
    var totalPrice0 =0;
    const cartItems = document.getElementById('cart__items');    
    for(let i=0; i<finalStorageArr.length; i++){
        
        const cartItem = document.createElement('article');
        cartItem.classList.add('cart__item');
        cartItems.appendChild(cartItem);

        var line ="";
        line = finalStorageArr[i];
        var part1EndIndex =line.search(/[,]/);
        var part2 = line.substring(part1EndIndex+1);
        var part2FirstPartEndIndex = part2.search(/[,]/);
        var quantity= part2.substring(part2FirstPartEndIndex+1);
        
        var id = line.substring(0,part1EndIndex);
        var color= part2.substring(0,part2FirstPartEndIndex);              
        var quantity0 = parseInt(quantity);

        totalQuantity0 += quantity0;
        
        console.log('id arr ='+id);
        console.log('color arr ='+color);
        console.log('quantity arr = '+ quantity);
        console.log('quantity0, from quantity arr, ='+quantity0);

        var nameKanap="";
        var price0 = 0;
        var price = "";
        var imageUrlKanap = "";
        var altTxtKanap = "";

        cartItem.setAttribute('data-id',id);
        cartItem.setAttribute('data-color',color); 
    
        //*Boucle for : à chaque ligne du LocalStorage (panier) on extrait l'id, la couleur et la quantité;
        //***recherche de l'élement du panier dans le catalogue (data) grâce à l'id
        //**je crée une vignette cartItem 'article.cart__item' pour chaque produit-panier correspondant chacunes à une ligne du tableau-panier (localStorage)
        var j=0;
        do{//***
            if(data[j]._id == id){
                price0 = data[j].price;

                totalPrice0 += price0*quantity0;

                price = toPriceString(price0);
                console.log('price0 from data = '+price0)
                console.log('from price0 from data : price = '+price);

                nameKanap = data[j].name;        imageUrlKanap = data[j].imageUrl;
                altTxtKanap = data[j].altTxt;

                var itemImage =addImageTocartItem(imageUrlKanap, altTxtKanap);
                itemImage.classList.add('cart__item__img');
            
                var itemContent =addContentTocartItem(color, quantity, nameKanap, price);
                itemContent.classList.add('cart__item__content');
                
                cartItem.appendChild(itemImage);
                //**
                cartItem.appendChild(itemContent);
                //***

                //*pour chaque produit-panier que l'on ajoute le prix global augmente du prix correspondant à ce seul produit panier: la quantité d'occurences de ce produit panier (quantité de ce même produit)*le prix unitaire de ce produit-panier;
                //**à un id donné correspond une section image donnée
                //***à un id donné correspond une section content donnée
            }
            j++;    
        }while(j<data.length);
    }
    var totalQuantity = totalQuantity0.toString();
    totalQuantityHTML.textContent= totalQuantity;
    var totalPrice = toPriceString(totalPrice0);
    var string = totalPrice + ',00';
    totalPriceHTML.textContent= string;

    return cartItems;
}
//à chaque ligne de tableau-panier (localStorage), correspondant à un Kanapé donné avec une couleur donnée, correspond une vignette produit cartItem 'article.item__cart', que l'on ajoute (appendChild())sous la 'section.items__cart' nommée cartItems;
//on renvoie la section remplie par les vignettes produit qui est une variable car une fois établie elle peut changer puisque l'on peut supprimer des vignettes cartItem;

const main =async()=>{
    const data = await retrieveData();
    var finalStorageArr =setPurchase();
    var cartItems = createArticlesAndAppendToSection(data, finalStorageArr);

    var cartItemCollection = cartItems.querySelectorAll("article");

    var totalQuantity = totalQuantityHTML.textContent
    var totalQuantity0 = parseInt(totalQuantity);
    var string = totalPriceHTML.textContent;
    var totalPrice = string.substring(0,string.match(/\s/g).length -1 -3);
    var totalPrice0 = parseInt(totalPrice);

    cartItemCollection.forEach(item => {
        var inputHTML = item.closest("input");
        var color = item.dataset.color;
        var id = item.dataset.id;
        var name =item.querySelector('h2').textContent;
        var idName = name.substring(6);
        var string = item.querySelector('.cart__item__content__description').querySelectorAll('p')[1].textContent;
        var price = string.substring(0,string.match(/\s/g).length -1 -4);
        var price0 = parseInt(price);

        var line = finalStorageArr[i];
        var part1EndIndex =line.search(/[,]/);
        var part2 = line.substring(part1EndIndex+1);
        var part2FirstPartEndIndex = part2.search(/[,]/);
        var quantity= part2.substring(part2FirstPartEndIndex+1);             
        var quantity0 = parseInt(quantity);

        console.log('idName foreach item = '+idName);
        console.log('color foreach item = '+color);        
        console.log('id foreach item = '+id);
        console.log('price foreach item = '+price);
        console.log('price0 foreach item: '+ price0); 
        console.log('quantity foreach item ='+quantity)
        console.log('quantity0 foreach item ='+quantity0)

        inputHTML.addEventListener('change', function (e) {
            var quantityNow0 = 0;
            var quantityNow = e.target.value;
            quantityNow0 =parseInt(quantityNow);

            var totalQuantityNow0 = totalQuantity0 - quantity0 +quantityNow0;
            var totalPriceNow0 = totalPrice0 -quantity0*price0 + quantityNow0*price0

            totalQuantityHTML.textContent=totalQuantityNow0.toString();
            totalPriceHTML.textContent = toPriceString(totalPriceNow0) +',00';

            finalStorageArr.splice(finalStorageArr.indexOf(id+','+color+','+quantity),1, [id+','+color+','+quantityNow]);
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

            finalStorageArr.splice(finalStorageArr.indexOf(id+','+color+','+quantity),1)
            localStorage.removeItem(idName+','+color);
        })
    })   
}


//vRvY              
    

    


main();

