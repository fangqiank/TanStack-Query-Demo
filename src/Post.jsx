import { useQuery } from "@tanstack/react-query"
import { getPost } from "./api/postsApi"
import {getUser} from './api/usersApi'

export const Post = ({id}) => {
	const postQuery = useQuery({
		queryKey: ['posts', id],
		queryFn: () => getPost(id)
	})

	const userQuery = useQuery({
		queryKey: ['users', postQuery?.data?.userId],
		enabled: postQuery?.data?.userId != null,
		queryFn: () => getUser(postQuery.data.userId)
	})

	const {status, error, data: posts} = postQuery
	const {data: users, isLoading: usersIsLoading, isError: usersIsError} = userQuery

	if(status === 'loading')
		return <h1>Loading...</h1>
	else if(status === 'error')
		return <h1>{JSON.stringify(error)}</h1>
	else 
		return (
			<>
				<h1>{postQuery.data.title}</h1>
        
				<strong>
          {
						usersIsLoading
            ? "Loading User..."
            : usersIsError
            ? "Error Loading User"
            : users.name
					}
        </strong>

				<p>{posts.body}</p>
			</>
		)
};
