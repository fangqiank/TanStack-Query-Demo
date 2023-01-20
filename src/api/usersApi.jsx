import axios from 'axios'

export const getUser = id => axios.get(`http://localhost:3500/users/${id}`)
	.then(res => res.data)