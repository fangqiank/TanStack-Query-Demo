import { useInfiniteQuery } from "@tanstack/react-query"
import { getPostsPaginated } from "./api/postsApi"

export const InfinitePostList = () => {
	const {data, status, error, isFetchingNextPage, hasNextPage, fetchNextPage} = useInfiniteQuery({
		queryKey: ['posts', 'infinite'],
		getNextPageParam: prev => {
			// console.log(prev)	
			return prev.nextPage
		},
		queryFn: (props) => {
			// console.log(props)
			const {pageParam = 1} = props
			return getPostsPaginated(pageParam)
		}
	})

	// console.log(data)
	
	if(status === 'loading')
		return <h1>Loading...</h1>
	else if(status === 'error')
		return <h1>{JSON.stringify(error)}</h1>
	else
		return (
			<>
				<h1>Post List Infinite</h1>

				{data.pages.flatMap(d => d.posts).map(p => (
					<div key={p.id}>{p.title}</div>
				))}

				{hasNextPage && (
					<button onClick={() => fetchNextPage()}>
						{isFetchingNextPage ? 'Loading...' : 'Load More'}
					</button>
				)}

			</>
		)
};
