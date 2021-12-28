//récupération du block à remplir par les fiches des produits dans le panier
const cartItems = document.getElementById('cart__items');
//********************************************************
function populateStorage(){

    if(idEntry !='' && colorEntry !='' && quantityEntry !=0){
            localStorage.setItem('id', idEntry);
            localStorage.setItem('color', colorEntry);
            localStorage.setItem('quantity', quantityEntry);

            console.log('populateStorage marche!')

            setPurchase();
    }
}

function setPurchase() {
    var currentId = localStorage.getItem('id');
    var currentColor = localStorage.getItem('color');
    var currentQuantity = localStorage.getItem('quantity');

    if(currentId !=undefined && currentColor != undefined && currentQuantity != NaN){
        var arr = [currentId, currentColor, currentQuantity];
        return arr
    }
}
//********************************************************

var createArr=()=>{

    var arr = setPurchase();
    var cartArrTot= new Array();
    var entry={id,color,quantity};
    var idEntry=entry.id;

    var arr=setPurchase();

    if(idEntry!= arr[0]){
        
        if (arr[0]!= "" && arr[1]!="" && arr[2]!= ""){
            entry.id = arr[0];
            entry.color = arr[1];
            entry.quantity = arr[2];
            cartArrTot.push(entry);
        }
        numberOfEntryToCart++;
    }
    console.log('createArr() marche');
    return cartArrTot;
}

var cartArrTot = createArr();

console.log('cartArrTot = ' +cartArrTot);

const retrieveItemsToPurchase = () =>fetch("http://localhost:3000/api/products")
    .then(res =>{
        if (res.ok){
            return res.json();
        }
    })
    .then (data => {
        console.log(data);
        return data;})
    .then(data=>{ 
        var itemsToPurchase = new Array(cartArrTot.length);
        for(i=0; i<cartArrTot.length; i++){
            var entry={id,color,quantity}
            entry= cartArrTot[i];
            var id =entry.id;

            for(let i=0; i<data.length; i++) {
                var item= data[i];
                var values = Object.values(item);

                for(let j=0;j<values.length; j++) {
                    let value = values[j];
                    if (value === id){
                        itemsToPurchase.push(item);
                    }
                }
            }    
        }
        return itemsToPurchase;
    })
    .catch (err => console.log('erreur suivante:'+ err))

const createCartItem = ()=>{

    if(itemsToPurchase != null){

        for(let i=0; i<itemsToPurchase.length; i++){

            const cartItem = document.createElement('article');
            cartItem.classList.add('cart__item');
            cartItem.setAttribute('data-id', cartArrTot[i].id);
            cartItem.setAttribute('data-color', cartArrTot[i].color);

            const itemImage = document.createElement('div');
            itemImage.classList.add('cart__item__img');

            const itemImageShown = document.createElement('img');
            itemImageShown.setAttribute('src', itemsToPurchase[i].imageUrl);
            itemImageShown.setAttribute('alt', itemsToPurchase[i].altTxt);

            const itemContent = document.createElement('div');
            itemContent.classList.add('cart__item__content');

            const contentDescription =document.createElement('div');
            contentDescription.classList.add('cart__item__content__description');

            const DescriptionTitle = document.createElement('h2');
            DescriptionTitle.contentText = itemsToPurchase[i].name; 
            const DescriptionFirstP = document.createElement('p');
            DescriptionFirstP.contentText = cartArrTot[i].color;
            const DescriptionSecondP = document.createElement('p');
            DescriptionSecondP.contentText = itemsToPurchase[i].price;

            const contentSettings =document.createElement('div');
            contentSettings.classList.add('cart__item__content__settings');

            const settingsQuantity = document.createElement('div');
            settingsQuantity.classList.add('cart__item__content__settings__quantity');

            const QuantityP = document.createElement('p');
            QuantityP.contentText ='Qté :';
            const QuantityInput = document.createElement('input');
            QuantityInput.setAttribute('type','number');
            QuantityInput.setAttribute('name', 'ItemQuantity');
            QuantityInput.setAttribute('min', '1');
            QuantityInput.setAttribute('max','100');
            QuantityInput.setAttribute('value', cartArrTot[i].quantity);

            const settingsDelete = document.createElement('div');
            settingsDelete.classList.add('cart__item__content__settings__delete');
            const DeleteP = document.createElement('p');
            DeleteP.classList.add('deleteItem');

            settingsDelete.appendChild(DeleteP);

            settingsQuantity.appendChild(QuantityP);
            settingsQuantity.appendChild(QuantityInput);

            
            contentDescription.appendChild(DescriptionTitle);
            contentDescription.appendChild(DescriptionFirstP);
            contentDescription.appendChild(DescriptionSecondP);

            contentSettings.appendChild(settingsQuantity);
            contentSettings.appendChild(settingsDelete);

            itemImage.appendChild(itemImageShown);

            itemContent.appendChild(contentDescription);
            itemContent.appendChild(contentSettings);

            cartItem.appendChild(itemImage);
            cartItem.appendChild(itemContent);

            cartItems.appendChild(cartItem);

            console.log('createCartItem retourne élément HTML cartItems');
            return cartItems;
        }
    }
}
const main =async()=>{

    const arrCurrent = setPurchase();
    const cartArrTot = createArr(arrCurrent);
    const itemsToPurchase = retrieveItems(cartArrTot);

    createCartItem(itemsToPurchase);
    console.log('main marche');
}

main();


//com#if(idEntry.. création d'une nouvelle entrée au panier seulement si l'id change => l'entrée prend un nouvel id
//ajoute l'entrée au panier (tableau cartArrTot)