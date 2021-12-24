const cartItems = document.getElementById('cart__items');

var id ='';
function reload() {
    window.location.reload();
    id=this.id;
    console.log(id);
    return id;
};

const retrieveItemsData = () =>fetch("http://localhost:3000/api/products")
.then(res =>{
  if (res.ok){
    return res.json();
  }
})
.then (data => {
  console.log(data);
  return data;})
  .then(retrieveItemstoPurchase =(data) =>{        

    for(let i=0; i<data.length; i++) {

        let item= data[i];
        let values = Object.values(item);
        //console.log(values);
    
        for(let j=0;j<values.length; j++) {
            let value = values[j];
            if (value === idUrl){
                //console.log(item);
                return item;
            }

        }

    } 
})
.catch (err => console.log('erreur suivante:'+ err))


var arrCartEntry = new Array(3);
var arrCart = new Array();
arrCartEntry[0] = '';
arrCartEntry[1] = '';
arrCartEntry[2] = 0;



function setPurchase() {
    var currentId = localStorage.getItem('id');
    var currentColor = localStorage.getItem('color');
    var currentQuantity = localStorage.getItem('quantity');

    arrCartEntry = [currentId, currentColor, currentQuantity];
}



const main = async()=>{

    const itemsData = await retrieveItemsData();


    for(let i=0; i<itemsData.length; i++){

        let item = itemsData[i]

        idArray = [currentId];

        for(currentId of idArray){

            if(item._id === idArray){

                const cartItem = document.createElement('article');
                cartItem.classList.add('cart__item');
                cartItem.setAttribute('data-id', currentId);
                cartItem.setAttribute('data-color', currentColor);

                const itemImage = document.createElement('div');
                itemImage.classList.add('cart__item__img');

                const itemImageShown = document.createElement('img');
                itemImageShown.setAttribute('src', item.imageUrl);
                itemImageShown.setAttribute('alt', item.altTxt);

                const itemContent = document.createElement('div');
                itemContent.classList.add('cart__item__content');

                const contentDescription =document.createElement('div');
                contentDescription.classList.add('cart__item__content__description');

                const DescriptionTitle = document.createElement('h2');
                DescriptionTitle.contentText = item.name; 
                const DescriptionFirstP = document.createElement('p');
                DescriptionFirstP.contentText = currentColor;
                const DescriptionSecondP = document.createElement('p');
                DescriptionSecondP.contentText = item.price;

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
                QuantityInput.setAttribute('value', currentQuantity);

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
            }
        }
    }
    return cartItems;
}

retrieveCartValues();