const urlIdValue =()=>{
    var str = window.location.href;
    var url = new URL(str);
    var search_params = new URLSearchParams(url.search);
    if (search_params.has("id")) {
        var id = search_params.get("id");
        console.log(id)
        return id;
    }
}
const urlId = urlIdValue('')

const retrieveItemData = () =>
    
    fetch("http://localhost:3000/api/products")
    .then(res => {
      if (res.ok) {
        return res.json();
      }
    })
    .then(data => {
      console.log(data);
      return data;
    })
    .then(idValue => {
        let id = idValue
        let itemFromId = {_id : id}

        if(id === urlId)
        {
            return itemFromId
        }
    })
    .then(itemFromId => {
        let indexItem = data.indexOf(itemFromId)
        return indexItem
    })
    .then (indexItem =>
        {let itemWithAllProperties = data[indexItem]
            return itemWithAllProperties
        }
    )
    .catch(err =>{ 
        console.log("erreur suivante:" + err)
    })


    




/**const findIds =async()=>{
    
    const itemsData = await retrieveItemsData()

    for(let i=0 ;i<itemsData.length;i++){
        return itemsData[i]._id
    }
}**/

/**const findMatchingId = async(strUrl)=>{
    const urlId = urlIdValue(strUrl)
    const possibleIds = await findIds()
    const itemsData = await retrieveItemsData()

    for(let i=0;i<possibleIds.lenght;i++)
    {
        if(possibleIds[i] === urlId){
            console.log(itemsData[i])
            return itemsData[i]
        }
    }

}
**/

const showImage = async() => {

    const item = await retrieveItemData()
    const productDivImage = document.querySelector('.item__image')
    const productImage = document.createElement("img");
    productImage.setAttribute("src", item.imageURL);
    productImage.setAttribute("alt", item.altTxt);

    productDivImage.appendChild(productImage)

    return productDivImage
};

const showTitle = async() => {
    const item = await retrieveItemData()
    const productTitle = document.getElementById('title');
    productTitle.textContent = item.name;

    return productTitle;
};

const showPrice = async() => {
    const item = await retrieveItemData()
    const productPrice = document.getElementById(
        'price');
    productPrice.textContent = item.price;

    return productPrice;
};

const showDescription = async() => {
    const item = await retrieveItemData()
    const productDescription = document.getElementById('description')
    productDescription.textContent = item.description

    return productDescription
};

const showColors =async() =>{
    const item = await retrieveItemData()
    const productColors = document.getElementById('colors')

    for(let i=0; i<item.colors.length; i++){
        const productSelectedColor = document.createElement('option')
        
        productSelectedColor.setAttribute('value', item.colors[i])

        productSelectedColor.item.colors[i]

        productColors.appendChild(productSelectedColor)
    }

    return productColors
}

const main = async () => {

    const item = await retrieveItemData()
    const imageItem = await showImage(item)
    const titleItem = await showTitle(item)
    const priceItem = await showPrice(item)
    const colorsItem = await showColors(item)
    const descriptionItem = await showDescription(item)

    return imageItem, titleItem, priceItem, colorsItem, descriptionItem

}
main()
