import axios from 'axios'

export const getPosts = () => {
	return axios.get('http://localhost:3500/posts', {
		params: {_sort: 'title'}
	}).then(res => res.data)
}

export const getPostsPaginated = page => {
	return axios.get('http://localhost:3500/posts', {
		params: {
			_sort: "title",
			_page: page,
			_limit: 5
		}
	}).then(res => {
		const hasNext = page * 2 <= parseInt(res.headers['x-total-count'])
		
		return ({
			nextPage: hasNext ? page + 1: undefined,
			prevPage: page > 1 ? page - 1 : undefined,
			posts: res.data 
		}) 
	})
}

export const getPost = id => {
	return axios.get(`http://localhost:3500/posts/${id}`).then(res => res.data)
}

export const createPost = ({title, body}) => {
	return axios.post('http://localhost:3500/posts', {
		title,
		body,
		userId: 1, 
		id: crypto.randomUUID()
	}).then(res => res.data)
}