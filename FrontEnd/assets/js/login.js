const authForm = document.querySelector('.auth-form')
const connectResult = document.querySelector('#connect-result')
if (localStorage.getItem('token')) {
  location.href = './index.html'
}
authForm.addEventListener('submit', async (event) => {
  event.preventDefault()
  const authFormValue = { email: authForm.email.value, password: authForm.password.value }
  try {
    const response = await fetch('http://localhost:5678/api/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(authFormValue),
    })

    if (response.ok) {
      connectResult.classList.remove('red-error')
      connectResult.classList.add('green-login')
      connectResult.textContent = "Vous voilà connecté ! Vous allez être redirigé vers l'accueil"
      const answer = await response.json()
      const token = answer.token
      setTimeout(() => {
        location.href = './index.html'
      }, 3000)
      localStorage.setItem('token', token)
      loginLink.innerHTML = `<p class="log-out">logout</p>`
    } else {
      connectResult.classList.add('red-error')
      connectResult.textContent = 'Email ou mot de passe erronés, veuillez réessayer'
    }
  } catch (error) {
    connectResult.classList.add('red-error')
    connectResult.textContent = 'Serveur injoignable'
    console.log(error)
  }
})
