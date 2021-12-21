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

  const createItemArticle = (item) =>{
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
 

  const createItemLink = async(item) =>{

    const article= createItemArticle(item)
  
    const productLink = document.createElement('a')
    productLink.setAttribute('href','./product.html?id='+item._id)

    productLink.appendChild(article)
  
    return productLink
  }


const main = async (item) => {
  const itemsData = await retrieveItemsData(item)
  
 for (item of itemsData) {
        const link = await createItemLink(item)
        items.appendChild(link)
      }
}
main()


