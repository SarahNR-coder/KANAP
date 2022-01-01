var priceKanapCalc =(priceKanap0)=>{
    var priceKanap ="";
    var priceKanap1 ="";
    priceKanap1= priceKanap0.toString();
    var length = priceKanap1.length;
            
    var priceNoA="";
    if(length <4){
        priceKanap = priceKanap1 +',00 €'
    }else{
                    
        var lastCharPlace = length -1;
        var NbTrios = Math.floor(length/3);
        var priceNoA ="";
        var n = 0;
        do{ 
            n += 3;
        }while(n <= NbTrios && lastCharPlace>2);
        console.log('n = '+n);

        var nZ = length - n;
        console.log('nZ = '+nZ);

        priceNoA =priceKanap1.substring(0, nZ);
        var priceNoZ = priceKanap1.substring(lastCharPlace-3,lastCharPlace);

        priceKanap = priceNoA;

        for(let i=0;nZ+i+3<lastCharPlace; i+=3 ){
            var subPriceI = priceKanap1.substring(nZ+i,nZ+i+3);
            var subPriceNoBY = ' '+ subPriceI;
            priceKanap += subPriceNoBY;

        }
        console.log('priceNoA = '+priceNoA);
        console.log('lastCharPlace = '+lastCharPlace);
        console.log('NbTrios  ='+NbTrios);

    } 
    priceKanap +=' '+priceNoZ+',00 €';
    

    console.log('length nombre chiffres dans le string de priceKanap0 (un item) = ' +length);
    console.log('priceKanap mis en forme ='+priceKanap)

    return priceKanap;
}


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


const setPurchase=(LineValue0)=> {
    var finalStorageArr = new Array([""]);
    finalStorageArr[0] = LineValue0;      
    for(let i=1; i<localStorage.length; i++){ 
        var LineValue= localStorage.getItem(localStorage.key(i));            
        finalStorageArr[i]=LineValue;
    }
    return finalStorageArr;
}

const createArticle=(data)=>{
    const itemsCart = document.getElementById('cart__items');
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
        const itemCart = document.createElement('article');
        itemCart.classList.add('cart__item');
        itemCart.setAttribute('data-id',id);
        itemCart.setAttribute('data-color',color); 
    
    //*Boucle for : à chaque ligne du LocalStorage (panier) on extrait l'id, la couleur et la quantité;
    //**recherche de l'élement du panier dans le catalogue (data) grâce à l'id
    //***pour chaque produit-panier que l'on ajoute on augmente la quantité globale de la quantité d'occurences de ce produit-panier 
    //je crée une vignette itemCart 'article.cart__item' pour chaque produit-panier correspondant chacunes à une ligne du tableau-panier (localStorage)

    totalQuantity0 += quantity0;
    //***                
    
        var j=0;
        do{//**
            if(data[j]._id == id){
                var idKanap = "";
                priceKanap0 = data[j].price;
                totalPrice0 += quantity0*priceKanap0;//*
                
                priceKanap = priceKanapCalc(priceKanap0);
                idKanap = data[j]._id;
                nameKanap = data[j].name;        imageUrlKanap = data[j].imageUrl;
                altTxtKanap = data[j].altTxt;

                console.log('priceKanap0  =' + priceKanap0);
                console.log('priceKanap  =' + priceKanap);
                console.log('totalQuantity0 incrémenté (recherche catalogue) = '+totalQuantity0);
                console.log('totalPrice0 incrémenté (recherche catalogue) = '+ totalPrice0);
                
                var itemImage = document.createElement('div');
                itemImage =addImageToItemCart(itemImage, imageUrlKanap, altTxtKanap);
                itemImage.classList.add('cart__item__img');
                
                var itemContent = document.createElement('div');
                itemContent =addContentToItemCart(itemContent,color, quantity, nameKanap, priceKanap);
                itemContent.classList.add('cart__item__content');
                
                itemCart.appendChild(itemImage);
                //**
                itemCart.appendChild(itemContent);
                //***

                //*pour chaque produit-panier que l'on ajoute le prix global augmente du prix correspondant à ce seul produit panier: la quantité d'occurences de ce produit panier (quantité de ce même produit)*le prix unitaire de ce produit-panier;
                //**à un id donné correspond une section image donnée
                //***à un id donné correspond une section content donnée
            }
            j++;    
        }while(j<data.length); 

        itemsCart.appendChild(itemCart);
        //à chaque ligne de tableau-panier (localStorage), correspondant à un Kanapé donné avec une couleur donnée, correspond une vignette produit itemCart 'article.item__cart', sous la 'section.items__cart' nommée itemsCart;
        //on renvoie la section remplie par les vignettes produit

        return itemsCart;
    }

    totalQuantity= totalQuantity0.toString();
    const totalQuantityHTML= document.getElementById('totalQuantity');
    totalQuantityHTML.textContent= totalQuantity;

    totalPrice = totalPriceCalc(totalPrice0);
    const totalPriceHTML = document.getElementById('totalPrice');
    totalPriceHTML.textContent= totalPrice;
}
// la fonction createArticle à partir de la constante data (attendue) et de la constante finalStorageArr, en utilisant la fonction itemCart, ajoute en tant qu'éléments enfants des variables  HTMLElements <articles> nommées cart à la constante HTMLElement itemsCart;

//Rôle de la fonction itemCart qui renvoie une variable:

//ses paramètres sont les variables idKanap, color, quantity, nameKanap, priceKanap, imageUrlKanap et altTxtKanap;
// on les appellent ici variablesKanap;

// on prend les constantes data(après attente) et finalStorageArr;
//dans la fonctions on en retire des variablesKanap
//on fait passer ces variablesKanap dans la fonction itemCart
//on en retire la variable HTMElement <article> cart

const addImageToItemCart =(itemImage, imageUrlKanap, altTxtKanap)=>
{

    const itemImageShown = document.createElement('img');
    itemImageShown.setAttribute('src', imageUrlKanap);
    itemImageShown.setAttribute('alt', altTxtKanap);

    //#1.1
    itemImage.appendChild(itemImageShown);

    return itemImage;
}

const addContentToItemCart =(itemContent, color, quantity, nameKanap, priceKanap) =>
{
    //#1.2.1
    const contentDescription =document.createElement('div');
    contentDescription.classList.add('cart__item__content__description');
    //#1.2.2
    const contentSettings =document.createElement('div');
    contentSettings.classList.add('cart__item__content__settings');

    //#1.2
    itemContent.appendChild(contentDescription);//#1.2.1
    itemContent.appendChild(contentSettings);//#1.2.2

    //#1.2.1.1
    const DescriptionTitle = document.createElement('h2');
    DescriptionTitle.textContent = nameKanap;
    //#1.2.1.2 
    const DescriptionFirstP = document.createElement('p');
    DescriptionFirstP.textContent = color;
    //#1.2.1.3
    const DescriptionSecondP = document.createElement('p');
    DescriptionSecondP.textContent = priceKanap;

    //#1.2.1
    contentDescription.appendChild(DescriptionTitle)//   #1.2.1.1
    contentDescription.appendChild(DescriptionFirstP);//#1.2.1.2
    contentDescription.appendChild(DescriptionSecondP);// //#1.2.1.3

    //#1.2.2.1
    const settingsQuantity = document.createElement('div');
    settingsQuantity.classList.add('cart__item__content__settings__quantity');
    //#1.2.2.2
    const settingsDelete = document.createElement('div');
    settingsDelete.classList.add('cart__item__content__settings__delete');

    //#1.2.2
    contentSettings.appendChild(settingsQuantity);//#1.2.2.1
    contentSettings.appendChild(settingsDelete);//#1.2.2.2

    //#1.2.2.1.1
    const QuantityP = document.createElement('p');
    QuantityP.textContent ='Qté :';
    //#1.2.2.1.2
    const QuantityInput = document.createElement('input');
    QuantityInput.setAttribute('type','number');
    QuantityInput.setAttribute('name', 'ItemQuantity');
    QuantityInput.setAttribute('min', '1');
    QuantityInput.setAttribute('max','100');
    QuantityInput.setAttribute('value', quantity);

    //#1.2.2.1
    settingsQuantity.appendChild(QuantityP);//#1.2.2.1.1
    settingsQuantity.appendChild(QuantityInput);//#1.2.2.1.2

    //#1.2.2.2.1
    const DeleteP = document.createElement('p');
    DeleteP.classList.add('deleteItem');
    DeleteP.textContent='Supprimer';

    //#1.2.2.2
    settingsDelete.appendChild(DeleteP);//#1.2.2.2.1

    return itemContent;
}
var totalPrice0Calc =(totalPrice)=>{
      
    var tPlength = totalPrice.length;
    var totalPriceToComa = totalPrice.substring(0, tPlength -1 -3);
    var tPTCLessSpaces = totalPriceToComa.replace(/[]/, '');
    var totalPrice0 = parseInt(tPTCLessSpaces);
    return totalPrice0;
}

var totalPriceCalc = (totalPrice0)=>{
    var totalPrice1 ="";
    totalPrice1=totalPrice0.toString();
    var totalPrice ="";
    var tPlength= totalPrice1.length;
    if(tPlength<=3){
        totalPrice = totalPrice1 +',00'
    }else{      
        var NbTriosTP = Math.floor(tPlength/3);
        var subTotNoA="";
        var n=0;

        do{ n+=3;}while(n<=NbTriosTP && tPlength>3);

        var nZ = tPlength - n;
        subTotNoA = totalPrice1.substring(0,nZ);
        var subTotNoZ = totalPrice1.substring(tPlength-1 -3,tPlength -1);
        totalPrice = subTotNoA;
        for(let j=0; nZ+i<tPlength-1-3; i+=3)
        {
            var subTotJ = totalPrice1.substring(nZ+i, nZ+3+i);
            var subTotNoBY =' '+subTotJ;
            totalPrice += subTotNoBY;
        }
        totalPrice += ' '+ subTotNoZ + ',00';
    }
    return totalPrice;    
}

var priceKanapX0Calc =(priceKanapX)=>{
    var priceKanapX0 = 0;
    var pKXlength = priceKanapX.length;
    var pKXToComa = priceKanapX.substring(0, pKXlength -1 -5);
    var pKXTCLessSpaces = pKXToComa.replace(/[]/,'');
    priceKanapX0 = parseInt(pKXTCLessSpaces);
    return priceKanapX0;
}

const main =async()=>{

    const data = await retrieveData();

    createArticle(data);

    var totalQuantityHTML = document.getElementById('totalQuantity');
    var totalPriceHTML =document.getElementById('totalPrice');

    var totalQuantity = "";
    var totalQuantity0 = 0;
    var quantityXLS ="";
    var quantiyX0LS = 0;
    var totalPrice = "";
    var totalPrice0 = 0;

    const itemCart = document.getElementsByTagName('article');
    i=0
    do{
        var quantityInputX = quantityInputs[i];
        var quantityX=quantityInputX.getAttribute('value');
        var quantityX0 = parseInt(quantityX);

        var itemCart = document.getElementsByTagName('article');

        var itemCartX = itemCart[i];
        
        var contentDescriptionX = document.getElementsByClassName('.cart__item__content__description')[i];
        var descriptionCollectionHTML = contentDescriptionX.children;
        var descriptionTitleX = descriptionCollectionHTML[0];
        var nameKanapX= descriptionTitleX.textContent;

        var idNameX = nameKanapX.substring(6);
        var descriptionFirstPX = descriptionCollectionHTML[1];

        var colorX = descriptionFirstPX.textContent;

        var idX = itemCartX.getAttribute('data-id');

        var descriptionSecondPX = descriptionCollectionHTML[2];
        var priceKanapX = descriptionSecondPX.textContent;

        var priceKanapX0 =priceKanapX0Calc(priceKanapX);
        
        var quantityX ="";
        var quantityX0 =0;

        quantityInputX.addEventListener('change', function(e){
            var quantityXC = "";
            quantityXC = e.target.value;
            var quantityX0C = 0;
            quantityX0C = parseInt(quantityX);
            var totalQuantity0C= 0;
            totalQuantity0C = totalQuantity0 - quantityX0 + quantityX0C;

            var totalPrice0C = "";
            totalPrice0C = totalPrice0 + (-quantityX0 + quantityX0C)*priceKanapX0;

            localStorage.setItem(idNameX+','+colorX,idX+','+colorX+','+quantityXChanged);

            
        })

        totalQuantityHTML.addEventListener('change',function(e){
        
            totalQuantity = totalQuantityHTML.textContent
            var totalQuantityC= "";
            totalQuantityC = e.target.value;

            totalQuantity0 = parseInt(totalQuantity);
        })

        totalPriceHTML.addEventListener('change', function(e){
            totalPrice = e.target.value;
            totalPriceHTML.textContent =totalPrice;
            totalPrice0 = totalPrice0Calc(totalPrice);
        });

        const settingsDeleteX = document.getElementsByClassName('cart__item__content__settings__delete')[i];
        const deletePX = settingsDeleteX.children[0];

        deletePX.addEventListener('click', function(_e){
            totalQuantity0 =totalQuantity0 - quantityX0;
            totalPrice0 = totalPrice0 - quantityX0*priceKanapX0;

            itemCartX.remove();
            localStorage.removeItem(idNameX+','+colorX);

            totalQuantity = totalQuantity0.toString();

            totalPrice = totalPriceCalc(totalPrice0);
        })
        i++;
    }while(i<quantityInputs.length);
    
}

main();

