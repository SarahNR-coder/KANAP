const items= document.getElementsByClassName('items')

const ITEMS_PER_PAGE = 8

const retrieveItemsData = () =>fetch("http://localhost:3000/api/products")
  .then(res =>{
    if (res.ok){
      return res.json();
    }
  })
  .then (data => console.log(data))
  .catch (err => console.log('erreur suivante:'+ err));

  const createItemLink = item =>{
  const productLink =document.createElement('a')
  productLink.setAttribute('href','./product.html?id=${itemsData.indexOf(item)+1}')

  return productLink}

  const createItemArticle = item =>{
    const productMain = document.createElement('article')

    const productImage = document.createElement('img')
    productImage.setAttribute('src','${item.imageUrl}')
    productImage.setAttribute('alt','${item.altText')

    const productName = document.createElement('h3')
    productName.classList.add('productName')

    const productDescription = document.createElement('p')
    productDescription.classList.add('productDescription')

    productMain.appendChild(productImage)
    productMain.appendChild(productName)
    productMain.appendChild(productDescription)

    return productMain

  }

  const calculateOffset = () => {
    const params = new URLSearchParams(window.location.search)
    const pageParams = params.get('page')

    if (!pageParams || Number(pageParams) === 1) {
        return 0
    }

    return (Number(pageParams) - 1) * ITEMS_PER_PAGE
}

const main = async () => {
  const itemsData = await retrieveItemsData()
 
  const offset = calculateOffset()

  for (let i = offset; i < ITEMS_PER_PAGE + offset; i++) {
      if (itemsData[i]) {
          items.appendChild(createItemArticle(itemsData[i]))
          items.appendChild(createItemLink(itemsData[i]))
      }
  }
}

main()


