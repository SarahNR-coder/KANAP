

const main =async()=>{
    var LineValue0 = localStorage.getItem(localStorage.key(0));
    var storage0 =Object.values(LineValue0);
    var finalStorageArr=new Array();
    var finalStorageArr0 = [storage0];
    finalStorageArr=finalStorageArr0;  
    var setPurchase=()=> {             
        for(let i=1; i<localStorage.length; i++){
            var LineValue= localStorage.getItem(localStorage.key(i));            
            /**/console.log('local var LineValue de setPurchase ='+ LineValue + ' de typeof = '+ typeof LineValue);

            var storage =Object.values(LineValue);
            /**/console.log('local var storage = '+storage+' de typeof = '+ typeof storage);

            finalStorageArr[i]=storage;
            /**/console.log('local var finalStorageArr = '+finalStorageArr+' de typeof = '+ typeof finalStorageArr);
        }
        return finalStorageArr;
    }

    finalStorageArr = setPurchase();
    /**/console.log('#19)   var finalStorageArr[0,1]  = ' +finalStorageArr[0,1]+ '  de typeof'+ typeof finalStorageArr );

    const createarrCart=(finalStorageArr)=>{

        var arrCart=[""];
        var arr=[""];
        for(let i=0; i<finalStorageArr.length; i++){          
            var LineValue ="";
            LineValue = finalStorageArr[i];
            /**/console.log('local var LineValue = '+LineValue+' de typeof = '+ typeof LineValue);

            const regex = /[,]/g;

            var index1 =LineValue.search(regex);
            var substring1 = LineValue.substring(0,index1);
            var substringNot1 = LineValue.substring(index1);
            var index2 = substringNot1.search(regex);
            var substring2= substringNot1.substring(0,index2);

            var substring3= substringNot1.substring(index2);

            arr= [substring1,substring2,substring3]; 
            /**/console.log('local var arr[0] = '+arr[0]+' de typeof = '+ typeof arr[0]);

            arrCart[i] = arr;
        }
        console.log('local var arrCart ='+arrCart+'de typeof = '+ typeof arrCart);
        return arrCart;
    }
    console.log('lclSt length = '+localStorage.length);

    var arrCart = createarrCart(finalStorageArr);
    console.log('var arrCart[0,1] = ' +arrCart[0,1]+ 'de typeof  '+ typeof arrCart[0,1]);

    /*const itemsToPurchase = await retrieveItemsToPurchase(arrCart);

    const cartItem =createCartItem(itemsToPurchase, arrCart);
    cartItems.appendChild(cartItem);*/
}

main();
