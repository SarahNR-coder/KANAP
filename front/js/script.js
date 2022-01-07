// Fichier de gestion de la page d'accueil

const items= document.getElementById('items')

/**
 * Récupération des données produit
 * @returns {any}
 * 
 */
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

/**
 * Affichage du catalogue
 * @param {any} item 
 * @returns {HTMLElement}
 */
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
 
/**
 * Constitution de chaque liens produit
 * @param {any} item 
 * @returns {HTMLAnchorElement}
 */
  const createItemLink = (item) =>{

    const article= createItemArticle(item);
  
    const productLink = document.createElement('a')
    productLink.setAttribute('href','./product.html?id='+item._id);

    productLink.appendChild(article);
  
    return productLink;
  }

/**
 * Fonction principale, execution des fonctions
 */
const main = async () => {
  const data = await retrieveItemsData();
  
  data.forEach(item => {
      const link = createItemLink(item);
      items.appendChild(link);
  })
}

main()


