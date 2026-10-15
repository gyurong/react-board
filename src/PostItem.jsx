function PostItem({
  post,
  onDelete
}) {

  const categoryClass = {

    '치이카와': 'chiikawa',

    '하치와레': 'hachiware',

    '우사기': 'usagi'

  }[post.category]


  return (
    <article className="post-card">


      {/* 사진 */}
      {post.image && (

        <div className="post-image">

          <img
            src={post.image}
            alt={post.title}
          />

        </div>

      )}


      <div className="post-content">

        <div className="post-top">

          <span className="post-number">

            {post.isCustom
              ? 'MY POST'
              : `#${String(post.id).padStart(2, '0')}`}

          </span>


          <div className="post-top-right">

            <span
              className={
                `post-category ${categoryClass}`
              }
            >
              {post.category}
            </span>


            {post.isCustom && (

              <button
                className="delete-post-button"

                onClick={() =>
                  onDelete(post.id)
                }
              >
                삭제
              </button>

            )}

          </div>

        </div>


        <h2>
          {post.title}
        </h2>


        <p>
          {post.body}
        </p>

      </div>

    </article>
  )
}

export default PostItem