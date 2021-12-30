    
    const plier = async(LineValue0)=> {
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
        
        const data = await retrieveData();

        const setPurchase=(LineValue0)=> {
            var finalStorageArr = new Array([""]);
            finalStorageArr[0] = LineValue0;      
            for(let i=1; i<localStorage.length; i++){ 
                var LineValue= localStorage.getItem(localStorage.key(i));            
                finalStorageArr[i]=LineValue;
            }
            return finalStorageArr;
        }

        const finalStorageArr= setPurchase(LineValue0);
            
        var itemCart =(idKanap, color, quantity, nameKanap, priceKanap, imageUrlKanap, altTxtKanap)=>{
            //#1
            const cartItem = document.createElement('article');
            cartItem.classList.add('cart__item');
            cartItem.setAttribute('data-id',idKanap);
            cartItem.setAttribute('data-color',color);

            //#1.1    
            const itemImage = document.createElement('div');
            itemImage.classList.add('cart__item__img');
            //#1.2
            const itemContent = document.createElement('div');
            itemContent.classList.add('cart__item__content');

            //#1
            cartItem.appendChild(itemImage);//#1.1
            cartItem.appendChild(itemContent);//#1.2

            //#1.1.1
            const itemImageShown = document.createElement('img');
            itemImageShown.setAttribute('src', imageUrlKanap);
            itemImageShown.setAttribute('alt', altTxtKanap);

            //#1.1
            itemImage.appendChild(itemImageShown);//#1.1.1

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

            //#1.2.2.2
            settingsDelete.appendChild(DeleteP);//#1.2.2.2.1

            return cartItem;
        }

        const createArticle=(data, finalStorageArr)=>{  
            const itemsCart = document.getElementById('cart__items');
            //parcours Storage (panier)
            for(let i=0; i<finalStorageArr.length; i++){
            
                var LineValue ="";
                LineValue = finalStorageArr[i];

                const regex = /[,]/;

                var index1 =LineValue.search(regex);

                var id = LineValue.substring(0,index1);
                console.log('id ='+id);

                var substringNot1 = LineValue.substring(index1+1);

                var index2 = substringNot1.search(regex);

                var color= substringNot1.substring(0,index2);
                console.log('color ='+color)

                var quantity= substringNot1.substring(index2+1);
                console.log('quantity ='+quantity);

                //recherche de l'élement du panier dans le catalogue
                var j=0;
                var idKanap = "";
                var nameKanap="";
                var priceKanap = 0;
                var imageUrlKanap = "";
                var altTxtKanap = "";

                do{
                    if(data[j]._id == id){
                        idKanap = data[j]._id;
                        nameKanap = data[j].name;
                        priceKanap = data[j].price;
                        imageUrlKanap = data[j].imageUrl;
                        altTxtKanap = data[j].altTxt;
                    }
                    j++;
                }while(j<data.length);

                var cart = itemCart(idKanap, color, quantity, nameKanap, priceKanap, imageUrlKanap, altTxtKanap);

                itemsCart.appendChild(cart);

            }
        }
                        
    createArticle(data, finalStorageArr);

    }    
        const main =async()=>{
            const LineValue0 = localStorage.getItem(localStorage.key(0));

            plier(LineValue0);
        }

        main();

    
