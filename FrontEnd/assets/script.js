const categoriesContainer = document.querySelector('.categories')
const galleryContainer = document.querySelector('.gallery')
let works = []
async function getWorks() {
  const response = await fetch('http://localhost:5678/api/works')
  const answer = await response.json()
  return answer
}

async function getCategories() {
  const response = await fetch('http://localhost:5678/api/categories')
  const answer = await response.json()
  return answer
}
function filterWorksByCategory(categoryId) {
  if (categoryId === 'all') {
    displayWorks(works)
    return
  }
  categoryId = Number(categoryId)
  const worksFiltered = works.filter((work) => {
    return work.categoryId === categoryId
  })

  displayWorks(worksFiltered)
}

async function initCategories() {
  let categories = await getCategories()
  categoriesContainer.innerHTML += categories
    .map((category) => {
      return `<button data-category="${category.id}">${category.name}</button>`
    })
    .join('')
  const filterButtons = document.querySelectorAll('.categories button')

  filterButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      filterButtons.forEach((filterButton) => {
        filterButton.classList.remove('active')
      })
      event.currentTarget.classList.add('active')

      filterWorksByCategory(event.currentTarget.dataset.category)
    })
  })
}
initCategories()

function displayWorks(array) {
  const galleryHtml = array.map((work) => {
    return `
    <figure>
      <img src="${work.imageUrl}" alt="${work.title}"/>
      <figcaption>${work.title}</figcaption>
    </figure>`
  })
  galleryContainer.innerHTML = galleryHtml.join('')
}

async function init() {
  works = await getWorks()

  displayWorks(works)
}

init()
