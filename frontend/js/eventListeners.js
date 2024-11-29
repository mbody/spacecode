const joinButton = document.querySelector('#joinButton')
const usernameForm = document.querySelector('#usernameForm')

joinButton.addEventListener('click', () => {
  usernameForm.style.display = 'flex'
  joinButton.style.visibility = 'hidden'
  document.querySelector('#usernameInput').focus()
})

usernameForm.addEventListener('submit', (event) => {
  event.preventDefault()
  usernameForm.style.display = 'none'
  socket.emit('newPlayer', {
    username: document.querySelector('#usernameInput').value
  })
})
