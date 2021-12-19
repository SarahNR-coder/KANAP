const items= document.getElementById('items')

const retrieveItemsData = () =>fetch("http://localhost:3000/api/products")
  .then(res =>{
    if (res.ok){
      return res.json();
    }
  })
  .then (data => {
    console.log(data);
    return data;})
  .catch (err => console.log('erreur suivante:'+ err))

  const calculateIndex = async(item) => { 
    const itemsData = await retrieveItemsData()
    
    let index=1;
    
    for (let i = 0; i <itemsData.length; i++) {
      index++;}
    
    return index;
    }

  const createItemLink = item =>{
    const idx = calculateIndex ()
  
  const productLink =document.createElement('a')
  productLink.setAttribute('href','./product.html?id='+ idx +'')

  return productLink}

  const createItemArticle = item =>{
    const productMain = document.createElement('article')

    const productImage = document.createElement('img')
    productImage.setAttribute('src',item.imageUrl)
    productImage.setAttribute('alt',item.altTxt)

    const productName = document.createElement('h3')
    productName.classList.add('productName')
    productName.textContent = item.name

    const productDescription = document.createElement('p')
    productDescription.classList.add('productDescription')
    productDescription.textContent= item.description

    productMain.appendChild(productImage)
    productMain.appendChild(productName)
    productMain.appendChild(productDescription)

    return productMain

  }


const main = async () => {

  const itemsData = await retrieveItemsData()
  
 for (let i = 0; i < itemsData.length; i++) {
      if (itemsData[i]) {
          items.appendChild(createItemArticle(itemsData[i]))
          items.appendChild(createItemLink(itemsData[i]))
      }
  }
}

main()


