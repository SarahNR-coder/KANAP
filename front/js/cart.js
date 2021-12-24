//récupération du block à remplir par les fiches des produits dans le panier
const cartItems = document.getElementById('cart__items');

var idEntry ='';
var colorEntry='';
var quantityEntry= 0;
var numberOfEntryToCart=0;
var currentArray = new Array();

if (numberOfEntryToCart > 0){
    var arrCart = new Array(numberOfEntryToCart);
    var itemsToPurchase = new Array(numberOfEntryToCart);
}

class Entry{
    constructor(id, color, quantity){
        this.id=id;
        this.color= color;
        this.quantity=quantity;
    }
};
var entry= new Entry();

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

    console.log('setPurchase marche');

    currentArray = [currentId, currentColor, currentQuantity]

    return currentArray
}

function createTab(){

    if(idEntry!=currentArray[0]){
        idEntry = currentArray[0];

        numberOfEntryToCart++;

        if (idEntry!= '' && colorEntry!='' && quantityEntry!= 0){
            entry.id = idEntry;
            entry.color = colorEntry;
            entry.quantity = quantityEntry;
            entry = arrCart[numberOfEntryToCart - 1];
        }

//création d'une nouvelle entrée au panier seulement si l'id change => l'entrée prend un nouvel id

//ajoute l'entrée au panier (tableau arrCart)

        if(colorEntry!=currentArray[1] || quantityEntry!=currentArray[2]){
            colorEntry = currentArray[1];
            quantityEntry = currentArray[2];
        }
    }
//l'entrée ne change que si la couleur ou la quantité change
//dans le cas où l'id change c'est une nouvelle entrée (création d'un nouvel objet de classe Entry)
    console.log('createTab marche');
    return arrCart;
}

arrCart = createTab();

const retrieveItems = () =>fetch("http://localhost:3000/api/products")
    .then(res =>{
        if (res.ok){
            return res.json();
        }
    })
    .then (data => {
        console.log(data);
        return data;})
    .then(data=>{        

        for(let i=0; i<data.length; i++) {

            let item= data[i];

            if(arrCart){

                for(let j=0; j<numberOfEntryToCart; j++){
                    var purchase = new Entry();
                    purchase = arrCart[j];
                    var identifier = purchase.id;

                    if(item._id === identifier){
                        item = itemsToPurchase[j];
                    }
                }
            }
            console.log('retrieveItems peut donner un tableau itemsToPurchase')
            return itemsToPurchase;
        }
    })
    .catch (err => console.log('erreur suivante:'+ err))

const createCartItem = ()=>{

    if(itemsToPurchase != null){

        for(let i=0; i<itemsToPurchase.length; i++){

            const cartItem = document.createElement('article');
            cartItem.classList.add('cart__item');
            cartItem.setAttribute('data-id', arrCart[i].id);
            cartItem.setAttribute('data-color', arrCart[i].color);

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
            DescriptionFirstP.contentText = arrCart[i].color;
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
            QuantityInput.setAttribute('value', arrCart[i].quantity);

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
    const arrCart = createTab(arrCurrent);
    const itemsToPurchase = retrieveItems(arrCart);

    createCartItem(itemsToPurchase);
    console.log('main marche')
}

main();