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

//récupération dans le tableau-panier (localStorage)des produits commandés d'un certain id et parmi ceux qui ont cet id, d'une certaine couleur; Un article pour une combinaison id-couleur
const setPurchase=(LineValue0)=> {
    var finalStorageArr = new Array([""]);
    finalStorageArr[0] = LineValue0;      
    for(let i=1; i<localStorage.length; i++){ 
        var LineValue= localStorage.getItem(localStorage.key(i));            
        finalStorageArr[i]=LineValue;
    }
    return finalStorageArr;
}

//fonctions de calcul de prix string à partir de prix nombres et l'inverse

var priceGlobCalculator =(priceNPQ0)=>{
    var priceNPQ ="";
    var priceNPQ1 ="";
    priceNPQ1= priceNPQ0.toString();
    var length = priceNPQ1.length;

    if(length <4){
        priceNPQ = priceNPQ1 +',00 €'
    }else{
                    
        var lastCharPlace = length -1;
        var NbTrios = Math.floor(length/3);
        var priceNPQNoA ="";
        var n = 0;
        do{ 
            n += 3;
        }while(n <= NbTrios && lastCharPlace>2);
        console.log('n = '+n);

        var nZ = length - n;
        console.log('nZ = '+nZ);

        priceNPQNoA =priceNPQ1.substring(0, nZ);
        var priceNPQNoZ = priceNPQ1.substring(lastCharPlace-3,lastCharPlace);

        priceNPQ = priceNPQNoA;

        for(let i=0;nZ+i+3<lastCharPlace; i+=3 ){
            var subPriceNPQI = priceNPQ1.substring(nZ+i,nZ+i+3);
            var subPriceNPQNoBY = ' '+ subPriceNPQI;
            priceNPQ += subPriceNPQNoBY;

        }
        console.log('priceNPQNoA = '+priceNPQNoA);
        console.log('lastCharPlace = '+lastCharPlace);
        console.log('NbTrios  ='+NbTrios);

    } 
    priceNPQ +=' '+priceNPQNoZ+',00';
    

    console.log('length nombre chiffres dans le string de priceKanap0 (un item) = ' +length);
    console.log('priceKanap mis en forme ='+priceNPQ)

    return priceNPQ;
}


var price0GlobCalculator =(priceNPQ)=>{
    var priceNPQ0 = 0;
    var length = priceNPQ.length;
    var pNPQToComa = priceNPQ.substring(0, length -1 -5);
    var pNPQTCLessSpaces = pNPQToComa.replace(/[]/,'');
    priceNPQ0 = parseInt(pNPQTCLessSpaces);
    return priceNPQ0;
}

//Fonctions création de contenu---------------------

//création de l'image de la vignette produit-panier à partir d'une variable qui est un block div itemImage où l'on insére l'url de l'image et son texte alternatif, block image que l'on retourne;
var addImageTocartItem =(itemImage, imageUrlKanap, altTxtKanap)=>
{

    const itemImageShown = document.createElement('img');
    itemImageShown.setAttribute('src', imageUrlKanap);
    itemImageShown.setAttribute('alt', altTxtKanap);

    itemImage.appendChild(itemImageShown);

    return itemImage;
}
//création du contenu de la vignette produit-panier à partir d'une variable qui est un block div itemContent, où l'on insère la couleur, le nom, et le prix du produit-panier dans un block div description et sa quantité dans un élément input (quantité changeable), block content que l'on retourne;

var addContentTocartItem =(itemContent, color, quantity, nameKanap, priceKanap) =>
{
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
    const DescriptionTitle = document.createElement('h2');
    DescriptionTitle.textContent = nameKanap;
    //#.1.2 
    const DescriptionFirstP = document.createElement('p');
    DescriptionFirstP.textContent = color;
    //#.1.3
    const DescriptionSecondP = document.createElement('p');
    DescriptionSecondP.textContent = priceKanap;

    //#.1
    contentDescription.appendChild(DescriptionTitle)//#.1.1
    contentDescription.appendChild(DescriptionFirstP);//#.1.2
    contentDescription.appendChild(DescriptionSecondP);//#.1.3

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
    const DeleteP = document.createElement('p');
    DeleteP.classList.add('deleteItem');
    DeleteP.textContent='Supprimer';

    //#.2.2
    settingsDelete.appendChild(DeleteP);//#.2.2.1

    return itemContent;
}

//création d'une section d'items comportant une fiche/article par produit commandé
var createArticle=(data)=>{
    const cartItems = document.getElementById('cart__items');
    const LineValue0 = localStorage.getItem(localStorage.key(0));
    const finalStorageArr = setPurchase(LineValue0);

    var totalQuantity="";
    var totalQuantity0 = 0;
    var totalPrice0 = 0;
    var totalPrice = "";

    //*
    for(let i=0; i<finalStorageArr.length; i++){
    
        var LineValue ="";
        LineValue = finalStorageArr[i];
    
        const regex = /[,]/;
        var index1 =LineValue.search(regex);
        var substringNot1 = LineValue.substring(index1+1);
        var index2 = substringNot1.search(regex);
        
        var id = LineValue.substring(0,index1);
        console.log('id ='+id);
        var color= substringNot1.substring(0,index2);
        var quantity= substringNot1.substring(index2+1);        
        var quantity0 = parseInt(quantity);
        
        console.log('id ='+id);
        console.log('color ='+color);
        console.log('quantity ='+quantity);
        console.log('quantity0 = '+ quantity0);

        var nameKanap="";
        var priceKanap0 = 0;
        var priceKanap = "";
        var imageUrlKanap = "";
        var altTxtKanap = "";

        //**       
        const cartItem = document.createElement('article');
        cartItem.classList.add('cart__item');
        cartItem.setAttribute('data-id',id);
        cartItem.setAttribute('data-color',color); 
    
        //*Boucle for : à chaque ligne du LocalStorage (panier) on extrait l'id, la couleur et la quantité;
        //****recherche de l'élement du panier dans le catalogue (data) grâce à l'id
        //***pour chaque produit-panier que l'on ajoute on augmente la quantité globale de la quantité d'occurences de ce produit-panier 
        //**je crée une vignette cartItem 'article.cart__item' pour chaque produit-panier correspondant chacunes à une ligne du tableau-panier (localStorage)

        totalQuantity0 += quantity0;
        //***                
    
        var j=0;
        do{//****
            if(data[j]._id == id){
                var idKanap = "";
                priceKanap0 = data[j].price;
                totalPrice0 += quantity0*priceKanap0;//*
                
                priceKanap = priceGlobCalculator(priceKanap0)+' €';
                idKanap = data[j]._id;
                nameKanap = data[j].name;        imageUrlKanap = data[j].imageUrl;
                altTxtKanap = data[j].altTxt;

                console.log('priceKanap0  =' + priceKanap0);
                console.log('priceKanap  =' + priceKanap);
                console.log('totalQuantity0 incrémenté (recherche catalogue) = '+totalQuantity0);
                console.log('totalPrice0 incrémenté (recherche catalogue) = '+ totalPrice0);
                
                var itemImage = document.createElement('div');
                itemImage =addImageTocartItem(itemImage, imageUrlKanap, altTxtKanap);
                itemImage.classList.add('cart__item__img');
                
                var itemContent = document.createElement('div');
                itemContent =addContentTocartItem(itemContent,color, quantity, nameKanap, priceKanap);
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

        cartItems.appendChild(cartItem);
        return cartItems;

        //à chaque ligne de tableau-panier (localStorage), correspondant à un Kanapé donné avec une couleur donnée, correspond une vignette produit cartItem 'article.item__cart', que l'on ajoute (appendChild())sous la 'section.items__cart' nommée cartItems;
        //on renvoie la section remplie par les vignettes produit qui est une variable car une fois établie elle peut changer puisque l'on peut supprimer des vignettes cartItem;
    }

    totalQuantity= totalQuantity0.toString();
    const totalQuantityHTML= document.getElementById('totalQuantity');
    totalQuantityHTML.textContent= totalQuantity;

    totalPrice = priceGlobCalculator(totalPrice0);
    const totalPriceHTML = document.getElementById('totalPrice');
    totalPriceHTML.textContent= totalPrice;
}


const main =async()=>{
    var totalQuantityHTML = document.getElementById('totalQuantity');
    var totalPriceHTML =document.getElementById('totalPrice');

    const data = await retrieveData();
    var cartItems= document.getElementById('cart__items');

    var totalQuantity = totalQuantityHTML.contentText;
    var totalQuantity0 =parseInt(totalQuantity);
    var totalPrice = totalPriceHTML.contentText;
    var totalPrice0 =price0GlobCalculator(totalPrice);

    var cartItemCount = 0;
    cartItemCount = cartItems.childElementCount;
    
    var inputCollection = document.getElementsByName('itemQuantity');
    var cartItemList = cartItems.children;

    for(let i=0; i<cartItemCount; i++)
    {
        var input = inputCollection[i];
        var cartItem = input.closest('article');
        var descriptionTitle = cartItem.querySelector('h2');
        var descriptionFirstP = descriptionTitle.nextElementSibling;
        var descriptionSecondP = descriptionFirstP.nextElementSibling;
        var settings = cartItem.getElementsByClassName('.cart__item__content__settings');
        var deleteP = settings.getElementsByClassName('.deleteItem');

        var id = cartItem.getAttribute('data-id');
        var color = cartItem.getAttribute('data-color');
        var quantity = input.getAttribute('value');
        var quantity0 = parseInt(quantity);
        var quantityUpToDate =input.getAttribute('value');
        var quantityUpToDate0 =parseInt(quantityUpToDate);
        var name = descriptionTitle.textContent;
        var idName = name.substring(6);
        var price = descriptionSecondP.textContent;
        var price0 = price0GlobCalculator(price +  ' €');

        input.addEventListener('change', function(e){
            quantityUpToDate = e.target.value;
            localStorage.setItem(idName+','+color, [id,color,quantityUpToDate])
        });

        deleteP.addEventListener('click', function(e){
            localStorage.removeItem(idName+''+color);
            cartItems.removeChild(cartItemList[i]);
            quantityUpToDate0 = 0;
        })
        
        totalQuantityHTML.addEventListener('change', function(e){
            totalQuantity0 = totalQuantity0 + quantityUpToDate0 - quantity0;
            totalQuantity = totalQuantity0.toString;
            totalQuantityHTML.textContent = totalQuantity0;
        })

        totalPriceHTML.addEventListener('change', function(e){
            totalPrice0 = totalPrice0 + quantityUpToDate0*price0 - quantity0*price0;
            totalPrice=priceGlobCalculator(totalPrice0);
        })
    }
}
main();

