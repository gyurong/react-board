import { useEffect, useState } from 'react'
import './App.css'
import PostList from './PostList.jsx'

function App() {

  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')


  useEffect(() => {

    fetch('https://jsonplaceholder.typicode.com/posts')

      .then((response) =>
        response.json()
      )

      .then((data) => {

        const chiikawaPosts = [
          {
            title: '치이카와의 평화로운 하루',
            body: '맛있는 간식을 먹고 친구들과 함께 소소한 시간을 보내는 치이카와의 하루를 소개합니다.'
          },
          {
            title: '하치와레의 긍정 에너지',
            body: '언제나 밝고 다정한 하치와레의 매력과 친구들을 챙기는 모습을 이야기합니다.'
          },
          {
            title: '우사기의 예측 불가능한 매력',
            body: '자유롭고 엉뚱한 행동으로 분위기를 바꾸는 우사기의 매력을 정리해봤습니다.'
          },
          {
            title: '치이카와 친구들의 우정',
            body: '서로 다른 성격을 가진 치이카와, 하치와레, 우사기가 함께 지내는 모습이 큰 매력입니다.'
          },
          {
            title: '내가 좋아하는 치이카와 캐릭터',
            body: '귀여운 외모뿐만 아니라 각 캐릭터의 성격과 행동이 뚜렷해서 보는 재미가 있습니다.'
          },
          {
            title: '치이카와 세계관의 매력',
            body: '귀여운 분위기 속에서도 예상하지 못한 상황이 등장해 독특한 분위기를 만들어냅니다.'
          },
          {
            title: '하치와레와 함께하는 일상',
            body: '하치와레의 밝은 성격과 따뜻한 말투가 일상적인 장면에서도 특별한 매력을 보여줍니다.'
          },
          {
            title: '우사기가 등장하면 생기는 일',
            body: '우사기는 등장할 때마다 예상하기 어려운 행동으로 재미있는 분위기를 만들어냅니다.'
          },
          {
            title: '치이카와를 좋아하는 이유',
            body: '작고 귀여운 캐릭터 디자인과 소소한 일상, 친구 사이의 관계를 보는 재미가 있습니다.'
          },
          {
            title: '치이카와 캐릭터별 성격 비교',
            body: '조심스러운 치이카와, 긍정적인 하치와레, 자유로운 우사기의 성격을 비교해봅니다.'
          },
          {
            title: '오늘의 치이카와 추천 캐릭터',
            body: '오늘은 밝고 친절한 성격이 매력적인 하치와레를 추천합니다.'
          },
          {
            title: '치이카와 게시판에 오신 것을 환영합니다',
            body: '치이카와와 친구들에 대한 이야기와 좋아하는 캐릭터를 자유롭게 공유하는 게시판입니다.'
          }
        ]


        // API에서 받은 게시글의 id는 사용하면서
        // 제목과 내용을 치이카와 테마로 변경
        const changedPosts =
          data
            .slice(0, chiikawaPosts.length)
            .map((post, index) => ({
              ...post,
              title: chiikawaPosts[index].title,
              body: chiikawaPosts[index].body
            }))


        setPosts(changedPosts)
        setLoading(false)

      })

  }, [])


  if (loading) {

    return (
      <main className="page">
        <p>불러오는 중...</p>
      </main>
    )

  }


  const filteredPosts =
    posts.filter((post) =>
      post.title
        .toLowerCase()
        .includes(search.toLowerCase())
    )


  return (
    <main className="page">

      <h1>
        치이카와 게시판
      </h1>


      <div className="search-area">

        <input
          type="text"
          placeholder="치이카와 게시글 검색"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />

      </div>


      <p className="search-count">
        검색 결과 : {filteredPosts.length}개
      </p>


      {filteredPosts.length > 0 ? (

        <PostList
          posts={filteredPosts}
        />

      ) : (

        <p className="no-result">
          검색 결과가 없습니다.
        </p>

      )}

    </main>
  )
}

export default App