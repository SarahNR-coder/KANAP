

const main =async()=>{
    const LineValue0 = localStorage.getItem(localStorage.key(0));

    var setPurchase=(LineValue0)=> {
        var finalStorageArr = new Array([""]);
        finalStorageArr[0] = LineValue0;      
        for(let i=1; i<localStorage.length; i++){ 
            var LineValue= localStorage.getItem(localStorage.key(i));            
            finalStorageArr[i]=LineValue;
        }
        return finalStorageArr;
    }

    const finalStorageArr = setPurchase(LineValue0);

    const cartItem =createArticle();

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

    const cartItems = document.getElementById('cart__items');
    cartItems.appendChild(cartItem);

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
    //=>
    DescriptionTitle.contentText = item.name; 

    const DescriptionFirstP = document.createElement('p');
    //=>
    DescriptionFirstP.contentText = entry.color;
    
    const DescriptionSecondP = document.createElement('p');

    //=>
    DescriptionSecondP.contentText = item.price;
    

    const contentSettings =document.createElement('div');
    contentSettings.classList.add('cart__item__content__settings');

    const settingsQuantity = document.createElement('div');
    settingsQuantity.classList.add('cart__item__content__settings__quantity');

//+
    const QuantityP = document.createElement('p');
    QuantityP.contentText ='Qté :';
    const QuantityInput = document.createElement('input');
    QuantityInput.setAttribute('type','number');
    QuantityInput.setAttribute('name', 'ItemQuantity');
    QuantityInput.setAttribute('min', '1');
    QuantityInput.setAttribute('max','100');
    QuantityInput.setAttribute('value', entry.quantity);
//+
    const settingsDelete = document.createElement('div');
    settingsDelete.classList.add('cart__item__content__settings__delete');
    const DeleteP = document.createElement('p');
    DeleteP.classList.add('deleteItem');

 
}

function createArticle (data){ 
    for(let i=0; i<finalStorageArr.length; i++){
    
        var LineValue ="";
        LineValue = finalStorageArr[i];

        const regex = /[,]/g;

        var index1 =LineValue.search(regex);

        var id = LineValue.substring(0,index1);
        console.log('id ='+id);

        var substringNot1 = LineValue.substring(index1+1);

        var index2 = substringNot1.search(regex);

        var color= substringNot1.substring(0,index2);
        console.log('color ='+color)

        var quantity= substringNot1.substring(index2+1);
        console.log('quantity ='+quantity);

        for(let j=0; j<data.length; j++) {
            var item= data[j];
            var values = Object.values(item);
            for(let k=0; k<values.length; k++){
                var value=values[k];
                if (value === id){
                    cartItem.setAttribute('data-color',color);
                    QuantityInput.setAttribute('value', quantity);
                    DescriptionTitle.contentText = item.name;
                    
                }
            }   
        }    
    }
}

    fetch("http://localhost:3000/api/products")
    .then(res =>{
        if (res.ok){
            return res.json();
        }
    })
    .then (data => {
        console.log(data);
        return data;})
    .then (createArticle(data))
    .catch (err => console.log('erreur suivante:'+ err))


    console.log('lclSt length = '+localStorage.length);

    

    /*const itemsToPurchase = await retrieveItemsToPurchase(arrCart);


    cartItems.appendChild(cartItem);*/

}

main();
