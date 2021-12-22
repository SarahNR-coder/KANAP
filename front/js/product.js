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
    /**
    .then(itemFromId => {
        let indexItem = data.indexOf(itemFromId)
        return indexItem
    })
    **/
    .then(data =>{
        for(let i=0; i<data.lenght; i++){
            let itemInData = data[i]
            return itemInData
        }
    })
    .then(idValue => {
        let id = idValue
        let itemFromId = {_id : id, ...}

        if(id === urlId)
        {
            return itemFromId
        }
    })
    .then (itemFromId =>
            let id
        { let itemFromId._id= 
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


/****
 CODEPEN

const items =
[{"colors":["Blue","White","Black"],"_id":"107fb5b75607497b96722bda5b504926","name":"Kanap Sinopé","price":1849,"imageUrl":"http://localhost:3000/images/kanap01.jpeg","description":"Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.","altTxt":"Photo d'un canapé bleu, deux places"},{"colors":["Black/Yellow","Black/Red"],"_id":"415b7cacb65d43b2b5c1ff70f3393ad1","name":"Kanap Cyllène","price":4499,"imageUrl":"http://localhost:3000/images/kanap02.jpeg","description":"Morbi nec erat aliquam, sagittis urna non, laoreet justo. Etiam sit amet interdum diam, at accumsan lectus.","altTxt":"Photo d'un canapé jaune et noir, quattre places"},{"colors":["Green","Red","Orange"],"_id":"055743915a544fde83cfdfc904935ee7","name":"Kanap Calycé","price":3199,"imageUrl":"http://localhost:3000/images/kanap03.jpeg","description":"Pellentesque fermentum arcu venenatis ex sagittis accumsan. Vivamus lacinia fermentum tortor.Mauris imperdiet tellus ante.","altTxt":"Photo d'un canapé d'angle, vert, trois places"},{"colors":["Pink","White"],"_id":"a557292fe5814ea2b15c6ef4bd73ed83","name":"Kanap Autonoé","price":1499,"imageUrl":"http://localhost:3000/images/kanap04.jpeg","description":"Donec mattis nisl tortor, nec blandit sapien fermentum at. Proin hendrerit efficitur fringilla. Lorem ipsum dolor sit amet.","altTxt":"Photo d'un canapé rose, une à deux place"},{"colors":["Grey","Purple","Blue"],"_id":"8906dfda133f4c20a9d0e34f18adcf06","name":"Kanap Eurydomé","price":2249,"imageUrl":"http://localhost:3000/images/kanap05.jpeg","description":"Ut laoreet vulputate neque in commodo. Suspendisse maximus quis erat in sagittis. Donec hendrerit purus at congue aliquam.","altTxt":"Photo d'un canapé gris, trois places"},{"colors":["Grey","Navy"],"_id":"77711f0e466b4ddf953f677d30b0efc9","name":"Kanap Hélicé","price":999,"imageUrl":"http://localhost:3000/images/kanap06.jpeg","description":"Curabitur vel augue sit amet arcu aliquet interdum. Integer vel quam mi. Morbi nec vehicula mi, sit amet vestibulum.","altTxt":"Photo d'un canapé gris, deux places"},{"colors":["Red","Silver"],"_id":"034707184e8e4eefb46400b5a3774b5f","name":"Kanap Thyoné","price":1999,"imageUrl":"http://localhost:3000/images/kanap07.jpeg","description":"EMauris imperdiet tellus ante, sit amet pretium turpis molestie eu. Vestibulum et egestas eros. Vestibulum non lacus orci.","altTxt":"Photo d'un canapé rouge, deux places"},{"colors":["Pink","Brown","Yellow","White"],"_id":"a6ec5b49bd164d7fbe10f37b6363f9fb","name":"Kanap orthosie","price":3999,"imageUrl":"http://localhost:3000/images/kanap08.jpeg","description":"Mauris molestie laoreet finibus. Aenean scelerisque convallis lacus at dapibus. Morbi imperdiet enim metus rhoncus.","altTxt":"Photo d'un canapé rose, trois places"}]

let item0 = {"colors":["Blue","White","Black"],"_id":"107fb5b75607497b96722bda5b504926","name":"Kanap Sinopé","price":1849,"imageUrl":"http://localhost:3000/images/kanap01.jpeg","description":"Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.","altTxt":"Photo d'un canapé bleu, deux places"}

const retrieveValuesItem =()=>{
  for(let i=0; i<items.length; i++)
      {
          let item= items[i]
          let values = Object.values(item)
          console.log(values)
  
          for(let j=0;j<values.length; j++)
              {
                  let value = values[j]
                  console.log(value)
                  return value
              }
      }
}

id = "107fb5b75607497b96722bda5b504926";

if(value == id)
  {
    let val = value
    console.log('VALEUR A RETOURNER!!!!!! : '+val)}
}}

 */
