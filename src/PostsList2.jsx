import { useQuery } from "@tanstack/react-query"
import { getPosts } from "./api/postsApi"

export const PostsList2 = () => {
	const postsQuery = useQuery({
		queryKey: ['posts'],
		queryFn: getPosts
	})

	const {error, status} = postsQuery

	if(status === 'loading')
		return <h1>Loading...</h1>
	else if(status === 'error')
		return <h1>{JSON.stringify(error)}</h1>
	else
		return (
			<div>
				<h1>Post List 2</h1>
				<ol>
					{postsQuery.data.map(post => (
						<li key={post.id}>{post.title}</li>
					))}
				</ol>
			</div>
		)
}