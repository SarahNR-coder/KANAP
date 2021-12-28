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
var idEntry ="";
var colorEntry="";
var quantityEntry= "";

var numberOfEntryToCart=0;

if (numberOfEntryToCart > 0){
    var itemsToPurchase =new Array(numberOfEntryToCart);
}

class Entry{
    constructor(id, color, quantity){
        this.id=id;
        this.color= color;
        this.quantity=quantity;
    }
};

var entry= new Entry();

entry={id:idEntry,color:colorEntry,quantity:quantityEntry};

var createArr=()=>{
    var arr = setPurchase();

    if(idEntry!= arr[0]){//si l'id dans localStorage n'est pas idEntry => il s'agit d'un nouveau item
        idEntry = arr[0];

//création d'une nouvelle entrée au panier seulement si l'id change => l'entrée prend un nouvel id

//ajoute l'entrée au panier (tableau cartArrTot)
        if (numberOfEntryToCart = 0) {
            
            numberOfEntryToCart++
            var cartArrTot=new Array();
        }

        ;//le panier comporte une nouvelle entrée item
        
        if (idEntry!= "" && colorEntry!="" && quantityEntry!= 0){;
            cartArrTot.keys()=item;
        }

        if(colorEntry!=arr[1] || quantityEntry!=arr[2]){
            entry.color = arr[1];
            entry.quantity = arr[2];
        }
    }
//l'entrée ne change que si la couleur ou la quantité change
//dans le cas où l'id change c'est une nouvelle entrée (création d'un nouvel objet de classe Entry)
    console.log('createArr() marche');
    return cartArrTot;
}

cartArrTot = createArr();

console.log('cartArrTot = ' +cartArrTot);

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

            if(numberOfEntryToCart>0){

                for(let j=0; j<numberOfEntryToCart; j++){
                    var purchase = new Entry();
                    cartArrTot[j] = purchase;
                    var identifier = purchase.id;

                    if(item._id === identifier){
                        itemsToPurchase[j]=item;
                    }
                }

            console.log('retrieveItems peut donner un tableau itemsToPurchase, itemsToPurchase ='+itemsToPurchase)
            return itemsToPurchase; 

            }
        }
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