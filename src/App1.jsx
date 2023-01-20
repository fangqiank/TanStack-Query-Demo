import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query"

const POSTS = [
  {id: 1, title:'Post 1'},
  {id: 2, title:'Post 2'}
]
const wait = duration => new Promise(resolve => setTimeout(resolve, duration))

function App() {
  // console.log(POSTS)
  const queryClient = useQueryClient()

  const postsQuery = useQuery({
    queryKey: ['posts'],
    queryFn: obj => wait(1000)
      .then(() => {
        console.log(obj)
        return [...POSTS]
      })
  })

  const addPostMutation = useMutation({
    mutationFn: newPostTitle => wait(1000).then(() => POSTS.push(
      {
        id: crypto.randomUUID(), 
        title: newPostTitle
      }
    )),

    onSuccess: () => queryClient.invalidateQueries(['posts']) 
  })

  const {data, isLoading, error, isError, status} = postsQuery

  if(isLoading)
    return <p>Loading...</p>
  else if(isError)
    return <p>{error.message}</p>
  else
    return (
      <div>
        {data.map(x => (<div key={x.id}>{x.title}</div>))}
        <button
          disabled={isLoading} 
          onClick={() => addPostMutation.mutate("New Post")}
        >
          Add New
        </button>
      </div>
    )


  return (
    <>
      <h1>TanStack Query</h1>
    </>
  )
}

export default App
