import { useQuery } from "@tanstack/react-query"
import { getPosts } from "./api/postsApi"

export const PostsList1 = () => {
	const PostsQuery = useQuery({
		queryKey: ['posts'],
		queryFn: getPosts,
		// staleTime: 1000
		// refetchInterval: 1000
	})

	// PostsQuery.fetchStatus 

	const {status, error} = PostsQuery

	if(status === 'loading')
		return <h1>Loading...</h1>
	else if(status === 'error')
		return <h1>{JSON.stringify(error)}</h1>
	else
		return (
			<div>
				<h1>Posts List 1</h1>
				<ol>
					{PostsQuery.data.map(post => (
						<li key={post.id}>{post.title}</li>
					))}
				</ol>
			</div>
		)

}