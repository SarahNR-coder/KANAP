// Fichier de gestion de la page product

/**
 * @returns {string}
 * Récupération de l'identifiant produit dans l'url 
 */
 const urlIdValue =()=>{
    var str = window.location.href;
    var url = new URL(str);
    var search_params = new URLSearchParams(url.search);
    if (search_params.has("id")) {
        var id = search_params.get("id");
        console.log("id : '"+id+"'");
        return id;
    }
}

const idUrl= urlIdValue();

/**
 * @returns {any}
 *  Récupérer les données produit par id
 */
const retrieveItemData = () =>fetch("http://localhost:3000/api/products")
    .then(res =>{
        if (res.ok) {
            return res.json();
        }
    })
    .then(data => {
       console.log("JSON.stringify(data) : \n\n"+JSON.stringify(data)+"\n\n l' API findOneProduct n'est pas utilsée")
        return data;
    })
    .then(retrieveItem =(data) =>{        

        for(let i=0; i<data.length; i++) {
            var item= data[i];
            var values = Object.values(item);
        
            for(let j=0;j<values.length; j++) {
                let value = values[j];
                if (value === idUrl){
                    console.log("JSON.stringify(item) : \n\n"+JSON.stringify(item)+"\n\n l' API findOneProduct n'est pas utilsée");
                    return item;
                }
            }
        }
    })
    .catch(err =>{ 
        console.log("erreur suivante:" + err)
    })

const productImage = document.createElement("img");

/**
 * @param {any} item
 * attribuer les caractéristiques produit à l'image 
 */
const setImageAttributes =(item)=>{
  
    productImage.setAttribute("src", item.imageUrl);
    productImage.setAttribute("alt", item.altTxt);

};

/**
 * @param {any} item 
 * @returns {Element}
 * Incorper l'image dans un bloc div
 */
const fillImageDiv =(item)=>{

    setImageAttributes(item);
    const productDivImage = document.querySelector('div.item__img');

    productDivImage.appendChild(productImage);

    return productDivImage;
};

/**
 * Constitution de la section de titre
 * @param {any} item 
 * @returns {HTMLElement}
 */
const showTitle = (item) => {
    const productTitle = document.getElementById('title');
    productTitle.textContent = item.name;

    return productTitle;
};

/**
 * Constitution de la section de prix
 * @param {any} item 
 * @returns {HTMLElement}
 */
const showPrice = (item) => {

    const productPrice = document.getElementById(
    'price');
    productPrice.textContent = item.price;

    return productPrice;
};

/**
 * Constitution de la section de description
 * @param {any} item 
 * @returns {HTMLElement}
 */
const showDescription =(item)=>{

    const productDescription = document.getElementById('description');
    productDescription.textContent = item.description

    return productDescription;
};



/**
 * Constitution du menu déroulant des couleurs
 * @param {any} item 
 * @returns {HTMLSelectElement}
 * note : une option de couleur indéfinie étant déjà présente  par défaut dans le HTML, les options comportent ce choix de couleur indéfinie en plus des couleurs du produit
 */
const showColors = (item) =>{
    const productColors = document.querySelector('select');
    var colorChoice = new Array(); 
    colorChoice = item.colors;
    var options = productColors.querySelectorAll('option');

    for(let i=0; i<colorChoice.length; i++){

        let color = colorChoice[i];

        var option = options[i+1];

        option = document.createElement('option');
        option.setAttribute('value', color);

        option.textContent = color;

        productColors.appendChild(option);
    }
    return productColors
}

const quantityElement = document.querySelector('input');


/**
 * Fonction principale
 * Gestion des événements de modification
 * Envoi des articles au panier
 */
const main = async () => {

    const item = await retrieveItemData();

    setImageAttributes(item);
    fillImageDiv(item);
    showTitle(item);
    showPrice(item);
    showDescription(item);
    const productColors = showColors(item);    
    const name = item.name;
    const idName= name.substring(6);
    var color="";
    var quantity="";

    productColors.addEventListener('change',function colorChangeHandler(event){
        color = event.target.value;
        console.log(' color change = ' +color)
    });
    
    quantityElement.addEventListener('change', function quantityChangeHandler(event){
        quantity = event.target.value;
        console.log(' quantity change = ' + quantity)
    });
    
    const button= document.querySelector('button'); 
    
    button.addEventListener('click', function(_e){
        console.log('color = '+color);
        console.log('quantity ='+quantity);
        if(color!="" && quantity!=""){      
            localStorage.setItem(idName+','+color, [idUrl, color, quantity]);
            if(quantity > 1){
                alert(quantity+" articles ajoutés au panier")
            }else{
                alert("Article ajouté au panier")
            }
        }
    })
}

main();
