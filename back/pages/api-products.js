/**fetch("http://localhost:3000/api/products")
  .then(function(res) {
    if (res.ok) {
      return res.json();
    }
  })
  .then(function(data) {
    console.log(data);
  })
  .catch(function(err) {
    // Une erreur est survenue
  });
  **/
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

const main = async () => {
  const ItemsData = await retrieveItemsData()
  
  createPagination(ItemsData.length)
  
  const offset = calculateOffset()

  for (let i = offset; i < ITEMS_PER_PAGE + offset; i++) {
      if (ItemsData[i]) {
          items.appendChild(createSensorCard(sensorsData[i]))
      }
  }
}

main()


