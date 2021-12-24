//Récupérer les caractéristiques du produit à partir de la valeur id="" dans l'url de la page

const urlIdValue =()=>{
    var str = window.location.href;
    var url = new URL(str);
    var search_params = new URLSearchParams(url.search);
    if (search_params.has("id")) {
        var id = search_params.get("id");
        //console.log(id)
        return id;
    }
}

const idUrl= urlIdValue();

const retrieveItemData = () =>
    
    fetch("http://localhost:3000/api/products")
    .then(res => {
      if (res.ok) {
        return res.json();
      }
    })
    .then(data => {
      //console.log(data);
      return data;
    })
    .then(retrieveItem =(data) =>{        

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
    .catch(err =>{ 
        console.log("erreur suivante:" + err)
    })


//Adapter la page au produit
const showImage = (item) => {

    
    const productImage = document.createElement("img");
    productImage.setAttribute("src", item.imageUrl);
    productImage.setAttribute("alt", item.altTxt);

    

    return productImage;
};

const fillImageDiv =(item)=>{

    const ImageItem = showImage(item);

    const productDivImage = document.getElementsByClassName('item__img')[0];

    productDivImage.appendChild(ImageItem);

    return productDivImage;
};

const showTitle = (item) => {
    const productTitle = document.getElementById('title');
    productTitle.textContent = item.name;

    return productTitle;
};

const showPrice = (item) => {

    const productPrice = document.getElementById(
        'price');
    productPrice.textContent = item.price;

    return productPrice;
};

const showDescription = (item) => {

    const productDescription = document.getElementById('description')
    productDescription.textContent = item.description

    return productDescription
};


const productColors = document.getElementById('colors');

const showColors = (item) =>{

    let colorChoice = item.colors

    for(let i=0; i<colorChoice.length; i++){

        let color = colorChoice[i]

        var productColorOption = document.createElement('option');

        
        productColorOption.setAttribute('value', color);

        productColorOption.textContent = color;

        productColors.appendChild(productColorOption)
    }
    return productColors

}

const main = async () => {

    const item = await retrieveItemData()

    fillImageDiv(item);
    showTitle(item);
    showPrice(item);
    showColors(item);
    showDescription(item);
}

main();
//CREATION DU TABLEAU CORRESPONDANT AU PANIER, arrCartEntry

var arrCartEntry=new Array(3);
arrCartEntry[0]=idUrl;
console.log('mon tableau au départ,il ne comporte que la case id:'+arrCartEntry)
/*donne 415b7cacb65d43b2b5c1ff70f3393ad1,,

donc noter que rien après la première et deuxième virgules, pas de 2ème ni 3eme élément: ni couleur, ni quantité
*/

var clr='SVP choisissez une couleur';
console.log("couleur de départ: "+ clr)
//donne: couleur de départ: SVP choisissez une couleur

arrCartEntry[1]=clr;
console.log('mon tableau au départ,il ne comporte que les cases id et couleur:'+arrCartEntry)
/*donne : 
415b7cacb65d43b2b5c1ff70f3393ad1,SVP choisissez une couleur,

(donc noter que rien après la deuxième virgule, pas de 3eme élément quantité)
*/

var qt=0;
console.log("quantité de départ:"+qt)
//donne quantité de départ:0
arrCartEntry[2]=qt;
console.log('mon tableau avec la couleur mise à jour et quantité = 0(initial)):'+arrCartEntry);
//donne 415b7cacb65d43b2b5c1ff70f3393ad1,SVP choisissez une couleur,0

productColors.addEventListener('click', function(){
    for (var i = 0; i < productColors.children.length; i++) {
        let productColorOption = productColors.children[i]

        if (productColorOption.selected){
        this.value = productColorOption.getAttribute('value');
        }
    }
    clr= this.value;
    console.log("la couleur sélectionnée est:" +clr)
    //je choisi la couleur Black/Yellow dans produit.html=> donne la couleur sélectionnée est:Black/Yellow
    
    arrCartEntry[1]=clr;
    console.log('mon tableau avec la couleur mise à jour (quantité = 0):'+arrCartEntry)
    //je choisi Black/Yellow => donne : 415b7cacb65d43b2b5c1ff70f3393ad1,Black/Yellow,0
});

const quantityElement  = document.getElementById('quantity') //quantityElement de type <input>

quantityElement.addEventListener('change', function(){
    quantityElement.value =this.value;
    qt= this.value;
    console.log("la quantité sélectionnée est:" +qt)
    //je monte le curseur à 1 => donne :la quantité sélectionnée est:1

    arrCartEntry[2]=qt;
    console.log('mon tableau avec la couleur mise à jour et la quantité mise à jour):'+arrCartEntry);
    //je monte le curseur à 1 => 415b7cacb65d43b2b5c1ff70f3393ad1,SVP choisissez une couleur,1
});

Button.addEventListener('click', function(){
        localStorage.setItem('id', arrCartEntry[0]);
        localStorage.setItem('color', arrCartEntry[1] );
        localStorage.setItem('quantity', arrCartEntry[2]);
});
//à chaque click sur le bouton met les valeurs du tableau de panier dans le storage 

function setPurchase() {
    var currentId = localStorage.getItem('id');
    var currentColor = localStorage.getItem('color');
    var currentQuantity = localStorage.getItem('quantity');

    arrCartEntry = [currentId, currentColor, currentQuantity];
}

if(localStorage.getItem('id')) {
    setPurchase();
}

if(localStorage.getItem('color')) {
    setPurchase();
}

if(localStorage.getItem('quantity')) {
    setPurchase();
}

//retire valeurs du storage => je crée un nouveau tableau (j'actualise le tableau) => ex dans le panier je change la quantité et la couleur d'un produit=> le tableau de panier est différent
