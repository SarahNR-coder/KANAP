
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
// await=> data

const setPurchase=(LineValue0)=> {
    var finalStorageArr = new Array([""]);
    finalStorageArr[0] = LineValue0;      
    for(let i=1; i<localStorage.length; i++){ 
        var LineValue= localStorage.getItem(localStorage.key(i));            
        finalStorageArr[i]=LineValue;
    }
    return finalStorageArr;
}
// => finalStorageArr
//                   //+ function itemCart()
function createArticle(data){
    const itemsCart = document.getElementById('cart__items');
    const LineValue0 = localStorage.getItem(localStorage.key(0));
    const finalStorageArr = setPurchase(LineValue0);

    var totalQuantity="";
    var totalQuantity0 = 0;
    var totalPrice0 = 0;
    var totalPrice = "";

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
        var quantity0 = parseInt(quantity);
        console.log('quantity0 = '+ quantity0);
    
        var idKanap = "";
        var nameKanap="";
        var priceKanap0 = 0;
        var priceKanap = "";
        var priceKanap1 ="";
        var imageUrlKanap = "";
        var altTxtKanap = "";

        //recherche de l'élement du panier dans le catalogue        
        const itemCart = document.createElement('article');
        itemCart.classList.add('cart__item');
        itemsCart.appendChild(itemCart);
        itemCart.setAttribute('data-id',id);
        itemCart.setAttribute('data-color',color); 
                    
        var j=0;
        do{
            if(data[j]._id == id){
                idKanap = data[j]._id;
                nameKanap = data[j].name;        imageUrlKanap = data[j].imageUrl;
                altTxtKanap = data[j].altTxt;

                //----------------------------------
                //------- Calcul priceKanap---------

                priceKanap0 = data[j].price;
                console.log('priceKanap0  =' + priceKanap0);

                priceKanap1= priceKanap0.toString();
                console.log('priceKanap1 =' +priceKanap1);
                
                totalQuantity0 += quantity0;
                console.log('totalQuantity0 incrémenté (recherche catalogue) = '+totalQuantity0);

                totalPrice0 += quantity0*priceKanap0;
                console.log('totalPrice0 incrémenté (recherche catalogue) = '+ totalPrice0);

                var length = priceKanap1.length;
                console.log('length nombre chiffres dans le string de priceKanap0 (un item) = ' +length);
                      
                var priceNoA="";
                if(length <4){
                    priceKanap = priceKanap1 +',00 €'
                }else{
                                
                    var lastCharPlace = length -1;
                    console.log('lastCharPlace = '+lastCharPlace);
                    var NbTrios = Math.floor(length/3);
                    console.log('NbTrios  ='+NbTrios);

                    var priceNoA ="";
                    var n = 0;
                    do{ 
                        n += 3;
                    }while(n <= NbTrios && lastCharPlace>2);
                    console.log('n = '+n);

                    var nZ = length - n;
                    console.log('nZ = '+nZ);

                    priceNoA =priceKanap1.substring(0, nZ);
                    console.log('priceNoA = '+priceNoA);
                    var priceNoZ = priceKanap1.substring(lastCharPlace-3,lastCharPlace);

                    priceKanap = priceNoA;

                    for(let i=0;nZ+i+3<lastCharPlace; i+=3 ){
                        var subPriceI = priceKanap1.substring(nZ+i,nZ+i+3);
                        var subPriceNoBY = ' '+ subPriceI;
                        priceKanap += subPriceNoBY;

                    }            
                } 
                priceKanap +=' '+priceNoZ+',00 €';
                console.log('priceKanap mis en forme ='+priceKanap)
                //----------------------------------
                //----------------------------------

                var itemImage = document.createElement('div');
                itemImage =addImageToItemCart(itemImage, imageUrlKanap, altTxtKanap);
                itemImage.classList.add('cart__item__img');
                
                var itemContent = document.createElement('div');
                itemContent =addContentToItemCart(itemContent,color, quantity, nameKanap, priceKanap);
                itemContent.classList.add('cart__item__content');
                
                itemCart.appendChild(itemImage);
                itemCart.appendChild(itemContent);
            }
            j++;    
        }while(j<data.length);

        itemsCart.appendChild(itemCart);
    }

    totalQuantity= totalQuantity0.toString();

    //----------------------------------------------
    //------------Calcule totalPrice----------------
    var lengthTot = totalPrice0.toString().length;
    console.log('lengthTot nombre chiffres dans le string de totalPrice0 (un item) = ' +lengthTot);

    var totalPrice1 = totalPrice0.toString();

    if(length<=3){
        totalPrice = totalPrice1 +',00'
    }else{
        var BlastCharPlace = lengthTot -1;
        console.log('BlastCharPlace = '+BlastCharPlace);
        var BNbTrios = Math.floor(lengthTot/3);
        console.log('BNbTrios  ='+BNbTrios);

        var subTotNoA = "";  
        var n=0;
        do{ 
            n+=3                               
        }while (n <= BNbTrios && BlastCharPlace >2);
        console.log('n   nb de trios (boucles) x3, donc le nombre total de chiffres de trio  =  ' +n );
        var nZ = lengthTot -n
        console.log('nZ la place à partir de laquelle commencent les trios de chiffres =' +nZ);

        subTotNoA = totalPrice1.substring(0,nZ);
        console.log('subTotNoA = '+subTotNoA);

        var subTotNoZ = totalPrice1.substring(BlastCharPlace-3,BlastCharPlace);
        totalPrice = subTotNoA;

        for(let i=0; nZ+i+3<BlastCharPlace; i+=3){
            var subTotI = totalPrice1.substring(nZ+i,nZ+i+3);
            
            var subTotNoBY = ' '+ subTotI;
            totalPrice += subTotNoBY;
        }            
        totalPrice +=' '+subTotNoZ+',00';
        console.log('totalPrice ='+totalPrice);   
    }
    //----------------------------------------------
    //----------------------------------------------
    
    const totalQuantityHTML= document.getElementById('totalQuantity');
    totalQuantityHTML.textContent= totalQuantity;

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
    var totalPrice ="";
    var totalPrice1=totalPrice0.toString();
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
    
    document.addEventListener("DOMContentLoaded", function(_e){

        var totalQuantityHTML = document.getElementById('totalQuantity');
        var totalQuantity = "";
        var totalQuantity0 = 0;

        totalQuantityHTML.addEventListener('change',function(e){
            totalQuantity = e.target.value;
            totalQuantityHTML.textContent = Quantity;
            console.log('e.target.value Qtt= '+e.target.value);
            totalQuantity0 = parseInt(totalQuantity);
        })
        var totalPriceHTML =document.getElementById('totalPrice');
        var totalPrice = "";
        var totalPrice0 = 0;

        totalPriceHTML.addEventListener('change', function(e){
            totalPrice = e.target.value;
            totalPriceHTML.textContent =totalPrice;
            totalPrice0 = totalPrice0Calc(totalPrice);
        })

        const quantityInputs = document.getElementsByTagName('input');
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
                quantityX = e.target.value;
                var quantityX0 = parseInt(quantityX);
                var totalQuantity0= 

                var totalPrice0Changed = totalPrice0 +(quantityX0Changed - quantityX0)*priceKanapX0;

                localStorage.setItem(idNameX+','+colorX,idX+','+colorX+','+quantityXChanged);


            })

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
    })
}

main();

