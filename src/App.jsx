import {useState} from "react"
import { PostsList1 } from "./PostsList1"
import {PostsList2} from './PostsList2'
import { Post } from "./Post"
import { CreatePost } from "./CreatePost"
import { PaginatedPost } from "./PaginatedPost"
import { InfinitePostList } from "./InfinitePostList"
import { useQueryClient } from "@tanstack/react-query"
import { getPost } from "./api/postsApi"

const App = () => {
	const [currentPage, setCurrentPage] = useState(<PostsList1 />)

	const queryClient  = useQueryClient()

	const mouseEnterHandle = () => {
		queryClient.prefetchQuery({
			queryKey: ['posts', 1],
			queryFn: () => getPost(1)
		})
	} 

	return(
		<div>
			<button onClick={() => setCurrentPage(<PostsList1 />)}>
				Posts List 1
			</button>

			<button onClick={() => setCurrentPage(<PostsList2 />)}>
				Posts List 2
			</button>

			<button
        onMouseEnter={mouseEnterHandle}
        onClick={() => setCurrentPage(<Post id={1} />)}
      >
        First Post
      </button>

			<button
        onClick={() =>
          setCurrentPage(<CreatePost setCurrentPage={setCurrentPage} />)
        }
      >
        New Post
      </button>

			<button onClick={() => setCurrentPage(<PaginatedPost />)}>
        Paginated Post List
      </button>

			<button onClick={() => setCurrentPage(<InfinitePostList />)}>
        Post List Infinite
      </button>

			<br />
			{currentPage}	
		</div>
	)
};

export default App
