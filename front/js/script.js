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

  const calculateIndex = async(item) =>{
  const itemsData = await retrieveItemsData (item)
    let index=1;

      for(let i = 0 ; i <itemsData.length; i++) {
      index++;}

      return index;
    }

  const createItemLink = async(item) =>{
  const idx= await calculateIndex (item)
  const productLink = document.createElement('a')
  productLink.setAttribute('href','./product.html'/**?id='+idx**/)

  return productLink}

  const createItemArticle = async(item) =>{
    const itemsData = await retrieveItemsData(item)
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
  const idx = calculateIndex()
  const link = createItemLink()
  const article = createItemArticle()


  
 for (let i = (idx-1); i < itemsData.length + (idx-1); i++) {
      if (itemsData[i]) {
          items.appendChild(article)
          items.appendChild(link)
      }
  }
}

main()


