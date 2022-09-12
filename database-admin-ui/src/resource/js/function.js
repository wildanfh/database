const pesan = document.querySelector('.pesan');

const regEvent = (e) => {
  const username = document.querySelector('.username').value;
  const password = document.querySelector('.password').value;
  e.preventDefault();
  const data = {
    username: username,
    password: password,
  }

  fetch("http://localhost:5000/users", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      pesan.innerHTML = data.message;
      if (data.status === 'success') {
        pesan2.innerHTML = '';
        alert(data.message);
        document.location.href = 'login.html';
      }
    })
    .catch(err => console.error(err));
}

const logEvent = (e) => {
  e.preventDefault();
  const username = document.querySelector('.username').value;
  const password = document.querySelector('.password').value;
  const data = {
    username: username,
    password: password,
  }

  fetch(`http://localhost:5000/users/${username}/${password}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data)
  })
    .then((response) => response.json())
    .then((data) => {
      pesan.innerHTML = data.message;
      if (data.status === 'success') {
        pesan.innerHTML = '';
        document.location.href = '/database/database-admin-ui';
      }
    })
    .catch(err => {
      console.error(err);
    });
}