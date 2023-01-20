import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useRef } from "react"
import { createPost } from "./api/postsApi"
import { Post } from "./Post"

export const CreatePost = ({setCurrentPage}) => {
	const titleRef = useRef()
	const bodyRef = useRef()
	const queryClient = useQueryClient()

	const addPostMutation = useMutation({
		mutationFn: createPost,
		onSuccess: data => {
			queryClient.setQueryData(['posts', data.id], data)
			queryClient.invalidateQueries(['posts'], {
				exact: true
			})
			setCurrentPage(<Post id={data.id}/>)
		}
	})

	const handleSubmit = e => {
		e.preventDefault()
		addPostMutation.mutate({
			title: titleRef.current.value,
			body: bodyRef.current.value
		})
	}

	return (
		<div>
			{addPostMutation.isError && JSON.stringify(addPostMutation.error)}
			
			<h1>Create Post</h1>
			
			<form onSubmit={handleSubmit}>
				<div>
          <label htmlFor="title">Title</label>
          <input id="title" ref={titleRef} />
        </div>
        <div>
          <label htmlFor="body">Body</label>
          <input id="body" ref={bodyRef} />
        </div>
        <button disabled={addPostMutation.isLoading}>
          {addPostMutation.isLoading ? "Loading..." : "Create"}
        </button>
			</form>
		</div>
	)
};
