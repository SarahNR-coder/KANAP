//récupération du block à remplir par les fiches des produits dans le panier
const cartItems = document.getElementById('cart__items');
//********************************************************
function populateStorage(arrCart){
    
    for(let i=0; i<arrCart.length; i++){
        var entry= arrCart[i];
        localStorage.setItem('id', entry.id);
        localStorage.setItem('color', entry.color);
        localStorage.setItem('quantity', entry.quantity);
    }
}


function setPurchase() {
    var arrAllStorage = new Array(localStorage.length);
    for(let i=0; i<localStorage.length; i++){
        var arrStorageLine = localStorage.getItem(localStorage.key(i));
        console.log('arrStorageLine de setPurchase ='+ arrStorageLine + ' de typeof = '+ typeof arrStorageLine);
        arrAllStorage[i]= arrStorageLine;
    }
    console.log('arrAllStorage = '+arrAllStorage);
    return arrAllStorage;
}

//********************************************************

const createarrCart=(arrAllStorage)=>{
    
    var id="";
    var color="";
    var quantity="";
    var entry={id,color,quantity};

    var idE=entry.id;

    for(let i=0; i<arrAllStorage.length; i++){
        var arrStorageLine= arrAllStorage[i];
        var arrCartEntry;
        if(idE!= arrStorageLine[0]){
        
            entry.id = arrStorageLine[0];
            entry.color = arrStorageLine[1];
            entry.quantity = arrStorageLine[2];
            
        }
    }
    console.log('entry ='+entry);
    return entry;
}

const id =arrCart[0][0];
var itemsToPurchase = new Array();
const retrieveItemsToPurchase = (arrCart) =>fetch("http://localhost:3000/api/products")
    .then(res =>{
        if (res.ok){
            return res.json();
        }
    })
    .then (data => {
        console.log(data);
        return data;})
    .then(data=>{ 
        for(i=0; i<arrCart.length; i++){
            for(let i=0; i<data.length; i++) {
                var item= data[i];
                var values = Object.values(item);
                for(let j=0;j<values.length; j++) {
                    let value = values[j];
                    if (value === id){
                        item._id= value;
                    }
                }
                item = itemsToPurchase[i];
                console.log('itemsToPurchase ='+itemsToPurchase);
                return itemsToPurchase;
            }
        }    
    })
    .catch (err => console.log('erreur suivante:'+ err))

const createArticle =(entry)=>{
    const cartItem = document.createElement('article');
    cartItem.classList.add('cart__item');
    cartItem.setAttribute('data-id', entry.id);
    cartItem.setAttribute('data-color',entry.color);

    return cartItem;
}

const createImage =(item)=>{
    const itemImage = document.createElement('div');
    itemImage.classList.add('cart__item__img');

    const itemImageShown = document.createElement('img');
    itemImageShown.setAttribute('src', item.imageUrl);
    itemImageShown.setAttribute('alt', item.altTxt);

    return itemImage;
}

const createInput =(entry)=>{
    const QuantityP = document.createElement('p');
    QuantityP.contentText ='Qté :';
    const QuantityInput = document.createElement('input');
    QuantityInput.setAttribute('type','number');
    QuantityInput.setAttribute('name', 'ItemQuantity');
    QuantityInput.setAttribute('min', '1');
    QuantityInput.setAttribute('max','100');
    QuantityInput.setAttribute('value', entry.quantity);

    return QuantityP, QuantityInput;
}

const createContent =(item)=>{

    const itemContent = document.createElement('div');
    itemContent.classList.add('cart__item__content');

    const contentDescription =document.createElement('div');
    contentDescription.classList.add('cart__item__content__description');

    const DescriptionTitle = document.createElement('h2');
    DescriptionTitle.contentText = item.name; 
    const DescriptionFirstP = document.createElement('p');
    DescriptionFirstP.contentText = entry.color;
    const DescriptionSecondP = document.createElement('p');
    DescriptionSecondP.contentText = item.price;

    const contentSettings =document.createElement('div');
    contentSettings.classList.add('cart__item__content__settings');

    const settingsQuantity = document.createElement('div');
    settingsQuantity.classList.add('cart__item__content__settings__quantity');
//

//
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
}

const createCartItem = (itemsToPurchase, arrCart)=>{

    for(let i=0; i<itemsToPurchase.length; i++){
        var item =itemsToPurchase[i];
        var entry = arrCart[i];


        cartItem.appendChild(itemImage);
        cartItem.appendChild(itemContent);

        cartItems.appendChild(cartItem);

        console.log('createCartItem retourne élément HTML cartItems');
        return cartItems;
    }
}
const main =async()=>{

    console.log('lclSt length = '+localStorage.length);
    const arrAllStorage = setPurchase();
    console.log('arrAllStorage de setPurchase   = ' +arrAllStorage+' de type (typeof) ='+ typeof arrAllStorage);

    const arrCart = createarrCart(arrAllStorage);
    console.log('arrCart = ' +arrCart);

    const itemsToPurchase = await retrieveItemsToPurchase(arrCart);

    const cartItem =createCartItem(itemsToPurchase, arrCart);
    cartItems.appendChild(cartItem);
}

main();
