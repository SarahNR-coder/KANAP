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
var finalStorageArr = setPurchase();
//fonctions de calcul de prix string à partir de prix nombres et l'inverse

var priceGlobCalculator =(priceNPQ0)=>{
    var priceNPQ1 ="";
    priceNPQ1= priceNPQ0.toString();
    var NPQLength = priceNPQ1.length;

    if(NPQLength <4){
        priceNPQ = priceNPQ1 +',00'
    }else{
                    
        var lastCharPlace = NPQLength -1;
        var NbTrios = Math.floor(NPQLength/3);
        var priceNPQNoA ="";
        var n = 0;
        do{ 
            n += 3;
        }while(n <= NbTrios && lastCharPlace>2);
        console.log('n = '+n);

        var nZ = NPQLength - n;
        console.log('nZ = '+nZ);

        priceNPQNoA =priceNPQ1.substring(0, nZ);
        var priceNPQNoZ = priceNPQ1.substring(lastCharPlace-3,lastCharPlace);

        var priceNPQ = priceNPQNoA;

        for(let i=0;nZ+i+3<lastCharPlace; i+=3 ){
            var subPriceNPQI = priceNPQ1.substring(nZ+i,nZ+i+3);
            var subPriceNPQNoBY = ' '+ subPriceNPQI;
            priceNPQ += subPriceNPQNoBY;

        }
        console.log('priceNPQNoA = '+priceNPQNoA);
        console.log('lastCharPlace = '+lastCharPlace);
        console.log('NbTrios  ='+NbTrios);

        priceNPQ +=' '+priceNPQNoZ+',00';
    } 
    return priceNPQ;
}


var price0GlobCalculator =(priceNPQ)=>{
    var priceNPQ = "";
    var NPQLength = priceNPQ.length;
    var pNPQToComa = priceNPQ.substring(0, NPQLength -1 -5);
    var pNPQTCLessSpaces = pNPQToComa.replace(/[]/,'');
    var priceNPQ0 = parseInt(pNPQTCLessSpaces);
    return priceNPQ0;
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
    descriptionThePrice.textContent = priceKanap;

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

//création d'une section d'items comportant une fiche/article par produit commandé
var createArticlesAndAppendToSection=(data)=>{
    var totalQuantity0 =0;
    var totalPrice0 =0;
    var totalQuantity ="";
    var totalPrice ="";
    const totalQuantityHTML = document.getElementById('totalQuantity');
    const totalPriceHTML = document.getElementById('totalPrice');
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
        return cartItems;
    }
    totalQuantity = totalQuantity0.toString();
    totalQuantityHTML.textContent= totalQuantity;
    totalPrice = priceGlobCalculator(totalPrice0);
    totalPriceHTML.textContent= totalPrice;
}
//à chaque ligne de tableau-panier (localStorage), correspondant à un Kanapé donné avec une couleur donnée, correspond une vignette produit cartItem 'article.item__cart', que l'on ajoute (appendChild())sous la 'section.items__cart' nommée cartItems;
//on renvoie la section remplie par les vignettes produit qui est une variable car une fois établie elle peut changer puisque l'on peut supprimer des vignettes cartItem;


const main =async()=>{
    const data = await retrieveData();
    const cartItems = createArticlesAndAppendToSection(data);
    const totalQuantityHTML = getElementById('totalQuantity');
    const totalPriceHTML = getElementById('totalPrice');
    var count = cartItems.childElementCount;

    for(let i=0; i<count; i++)
    {
        var totalQuantity0 =0;
        var totalPrice0 = 0;
        var item_i = cartItems.getElementsByTagName('article')[i];
        var input_i = item_i.getElementsByTagName('input')[0];
        var suppr_i = item_i.getElementsByTagName('p')[3];
        var descriptionTheName_i = item_i.getElementsByTagName('h2')[0];
        var descriptionThePrice_i = item_i.getElementsByTagName('p')[1];

        var id_i = item_i.dataset.id;
        var color_i = item_i.dataset.color;
        var name_i = descriptionTheName_i.textContent;
        var idName_i = name_i.substring(6);
        var price_i = descriptionThePrice_i.textContent;
        var price0_i = price0GlobCalculator(price_i);
        
        var quantity_i = input_i.getAttribute('value');
        var quantity0_i = parseInt(quantity_i);

        totalQuantity0 += quantity0_i;
        totalPrice0 += quantity0_i*price0_i;

        var totalQuantity = "";
        var totalPrice ="";

        var quantityUpToDate_i =input_i.getAttribute('value');   
        var quantityUpToDate0_i=0; 
        input_i.addEventListener('change', function(e){
            quantityUpToDate_i = e.target.value;
            quantityUpToDate0_i =parseInt(quantityUpToDate_i);

            totalQuantity0 = totalQuantity0 - quantity0_i + quantityUpToDate0_i;
            totalQuantity = totalQuantity0.toString();
            totalQuantityHTML.textContent = totalQuantity;

            totalPrice0 = totalPrice0 - quantity0_i*price0_i + quantityUpToDate0_i*price0_i;
            totalPrice = priceGlobCalculator(totalPrice0);
            totalPriceHTML.textContent = totalPrice;

            localStorage.setItem(idName_i+','+color_i, [id_i,color_i,quantityUpToDate_i])
        });

        suppr_i.addEventListener('click', function(e){
            cartItems.removeChild(item_i);

            totalQuantity0 = totalQuantity0 - quantity0_i;
            totalQuantity = totalQuantity0.toString();
            totalQuantityHTML.textContent = totalQuantity;

            totalPrice0 = totalPrice0 - quantity0_i*price0_i
            totalPrice = priceGlobCalculator(totalPrice0);
            totalPriceHTML.textContent = totalPrice;

            quantityUpToDate0_i = 0;
            localStorage.removeItem(idName_i+''+color_i);            
        })
    }
}

main();

