import PostItem from './PostItem.jsx'

function PostList({
  posts,
  onDelete
}) {

  return (
    <div>

      {posts.map((post) => (

        <PostItem
          key={post.id}
          post={post}
          onDelete={onDelete}
        />

      ))}

    </div>
  )
}

export default PostList