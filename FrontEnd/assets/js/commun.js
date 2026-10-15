const loginLink = document.querySelector('#login')

if (localStorage.getItem('token')) {
  loginLink.innerHTML = `<a href="./index.html" class="log-out">logout</a>`
  loginLink.addEventListener('click', () => {
    localStorage.removeItem('token')
  })
}
