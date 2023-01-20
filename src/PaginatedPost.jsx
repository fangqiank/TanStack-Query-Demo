import { useQuery } from "@tanstack/react-query"
import { useState } from "react"
import { getPostsPaginated } from "./api/postsApi"

export const PaginatedPost = () => {
	const [page, setPage] = useState(1)

	const {status, error, data, isPreviousData} = useQuery({
		queryKey: ['posts', {page}],
		keepPreviousData: true,
		queryFn: () => getPostsPaginated(page)
	})

	if(status === 'loading')
		return <h1>Loading...</h1>
	else if(status === 'error')
		return <h1>{JSON.stringify(error)}</h1>
	else
		return (
			<>
				<h1>
					Post List Paginated
					<small>{isPreviousData && 'Previous Data'}</small>
				</h1>

				{data.posts.map(post => (
					<div key={post.id}>{post.title}</div>
				))}

				{data.prevPage  && (
					<button onClick={() => setPage(data.prevPage)}>Previous</button>
				)}

				{data.nextPage  && (
					<button onClick={() => setPage(data.nextPage)}>Next</button>					
				)}
			</>
		)
};
