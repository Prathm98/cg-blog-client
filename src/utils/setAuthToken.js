import axios from 'axios'

// Sets the token for default, so every request will not have to manually add token
const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['authorization'] = token
  } else {
    delete axios.defaults.headers.common['authorization']
  }
}

export default setAuthToken