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

const LineValue0 = localStorage.getItem(localStorage.key(0));
var finalStorageArr =new Array([""]);
var setPurchase=()=> {
    finalStorageArr[0] = LineValue0;      
    for(let i=1; i<localStorage.length; i++){ 
        var LineValue= localStorage.getItem(localStorage.key(i));            
        finalStorageArr[i]=LineValue;
    }
    return finalStorageArr;
}


//fonctions de calcul de prix string à partir de prix nombres et l'inverse


var priceGlobCalculator =(price0)=>{
    var price0_str ="";
    price0_str= price0.toString();
    var price0StringLength = price0_str.length;
    var price ="";

    if(price0StringLength <4){
        price = price0_str +',00'
    }else{
                    
        var lastCharPlace = price0StringLength -1;
        var NbTrios = Math.floor(price0StringLength/3);
        var NbCharInTrios =NbTrios*3;
        var priceNoA ="";

        var charBeforeFirstTrioPlace = price0StringLength - NbCharInTrios;

        priceNoA =price0_str.substring(0, charBeforeFirstTrioPlace);
        var charBeforeLastTrioPlace = lastCharPlace - 3;
        var priceNoZ = price0_str.substring(charBeforeLastTrioPlace,lastCharPlace);

        price = priceNoA;

        for(let i=0;charBeforeFirstTrioPlace+i<charBeforeLastTrioPlace; i+=3 ){
            var subPriceI = price0_str.substring(charBeforeFirstTrioPlace+i,charBeforeFirstTrioPlace+i+3);
            var subPriceNoBY = ' '+ subPriceI;
            price += subPriceNoBY;

        }
        price +=' '+priceNoZ+',00';
    } 
    return price;
}

const blip = 123456678890;
const blop = priceGlobCalculator(blip);
console.log('blop' + blop);


var price0GlobCalculator =(price)=>{
    var price = "";
    var priceLength = price.length;
    var pToComa = price.toString().substring(0, priceLength -1 -3);
    var pTCLessSpaces = pToComa.replace(/[]/,'');
    var price0 = parseInt(pTCLessSpaces);
    return price0;
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

var addContentTocartItem =(color, quantity, nameKanap, priceKanap) =>
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
    descriptionThePrice.textContent = priceKanap   +' E';

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

const totalQuantityHTML = document.getElementById('totalQuantity');
const totalPriceHTML = document.getElementById('totalPrice');
//création d'une section d'items comportant une fiche/article par produit commandé
var createArticlesAndAppendToSection=(data)=>{
    var totalQuantity0 =0;
    var totalPrice0 =0;
    const cartItems = document.getElementById('cart__items');    
    for(let i=0; i<finalStorageArr.length; i++){
        
        const cartItem = document.createElement('article');
        cartItem.classList.add('cart__item');
        cartItems.appendChild(cartItem);

        var LineValue ="";
        LineValue = finalStorageArr[i];
    
        var index1 =LineValue.search(/[,]/);
        var substringNot1 = LineValue.substring(index1+1);
        var index2 = substringNot1.search(/[,]/);
        
        var id = LineValue.substring(0,index1);
        console.log('id ='+id);
        var color= substringNot1.substring(0,index2);
        var quantity= substringNot1.substring(index2+1);        
        var quantity0 = parseInt(quantity);

        totalQuantity0 += quantity0;
        
        console.log('id ='+id);
        console.log('color ='+color);
        console.log('quantity ='+quantity);
        console.log('quantity0 = '+ quantity0);

        var nameKanap="";
        var priceKanap0 = 0;
        var priceKanap = "";
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
                priceKanap0 = data[j].price;

                totalPrice0 += priceKanap0*quantity0;

                priceKanap = priceGlobCalculator(priceKanap0)+' €';

                nameKanap = data[j].name;        imageUrlKanap = data[j].imageUrl;
                altTxtKanap = data[j].altTxt;

                var itemImage =addImageTocartItem(imageUrlKanap, altTxtKanap);
                itemImage.classList.add('cart__item__img');
            
                var itemContent =addContentTocartItem(color, quantity, nameKanap, priceKanap);
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
    var totalPrice = priceGlobCalculator(totalPrice0);
    totalPriceHTML.textContent= totalPrice;

    return cartItems;
}
//à chaque ligne de tableau-panier (localStorage), correspondant à un Kanapé donné avec une couleur donnée, correspond une vignette produit cartItem 'article.item__cart', que l'on ajoute (appendChild())sous la 'section.items__cart' nommée cartItems;
//on renvoie la section remplie par les vignettes produit qui est une variable car une fois établie elle peut changer puisque l'on peut supprimer des vignettes cartItem;

const main =async()=>{
    const finalStorageArr = await setPurchase();
    const data = await retrieveData();
    const cartItems = createArticlesAndAppendToSection(data, finalStorageArr);
  
//vRvY
    var cartItemCollection = cartItems.querySelectorAll("article");

    var totalQuantity = totalQuantityHTML.textContent
    var totalQuantity0 = parseInt(totalQuantity);
    var totalPrice = totalPriceHTML.textContent;
    var totalPrice0 = price0GlobCalculator(totalPrice + ' €');
    

    cartItemCollection.forEach(item => {
        var inputHTML = item.querySelector("input");
        var color = item.dataset.color;
        var id = item.dataset.id;
        var name =item.querySelector('h2').textContent;
        var idName = name.substring(6);       
        var price = item.querySelector('.cart__item__content__description').querySelectorAll('p').textContent;
        console.log('price : ' + price);    
        var price0 = price0GlobCalculator(price);
        console.log('price0 : ' + price0);

        var LineValue = localStorage.getItem(idName +','+ color);
        var strAFHereStrGZ =LineValue.search(/[,]/);
        var strGZ = LineValue.substring(strAFHereStrGZ+1);
        var strGNHerestrOZ = strGZ.search(/[,]/);
        var strOZ= strGZ.substring(strGNHerestrOZ+1);        
        var quantity0 = parseInt(strOZ);

        inputHTML.addEventListener('change', function (e) {
            var quantityNow0 = 0;
            quantityNow0 =parseInt(e.target.value);

            var totalQuantityNow0 = totalQuantity0 - quantity0 +quantityNow0;
            var totalPriceNow0 = totalPrice0 -quantity0*price0 + quantityNow0*price0

            totalQuantityHTML.textContent=totalQuantityNow0.toString();
            totalPriceHTML.textContent = price0GlobCalculator(totalPriceNow0);

            var quantity = quantityNow0.toString();
            localStorage.setItem(idName+','+color, [id,color,quantity])
            
        })
        var erasor = item.querySelector(".deleteItem");
    
        erasor.addEventListener('click', (_e) =>{
            totalQuantityNow0 = totalQuantity0 -quantity0;
            totalPriceNow0 = totalPrice0 - quantity0*price0;

            totalQuantity = totalQuantityNow0.toString();
            totalPrice = priceGlobCalculator(totalPriceNow0);

            totalQuantityHTML.textContent=totalQuantity;
            totalPriceHTML.textContent = totalPrice;
 
            cartItems.removeChild(item);
            
            localStorage.removeItem(idName+','+color)
        })
    })   
}


//vRvY              
    

    


main();

