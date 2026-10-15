import { useEffect, useState } from 'react'
import './App.css'
import PostList from './PostList.jsx'
import bannerImage from './assets/chiikawa-banner.png'

function App() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)

  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('전체')

  const [showWriteForm, setShowWriteForm] = useState(false)

  const [newTitle, setNewTitle] = useState('')
  const [newBody, setNewBody] = useState('')
  const [newCategory, setNewCategory] = useState('치이카와')
  const [newImage, setNewImage] = useState('')

  const [customPosts, setCustomPosts] = useState(() => {
    const savedPosts =
      localStorage.getItem('chiikawaCustomPosts')

    if (savedPosts) {
      try {
        return JSON.parse(savedPosts)
      } catch {
        return []
      }
    }

    return []
  })


  // 내가 쓴 글 저장
  useEffect(() => {
    localStorage.setItem(
      'chiikawaCustomPosts',
      JSON.stringify(customPosts)
    )
  }, [customPosts])


  // 기본 게시글 불러오기
  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then((response) => response.json())
      .then((data) => {
        const chiikawaPosts = [
          {
            category: '치이카와',
            title: '치이카와의 평화로운 하루',
            body: '맛있는 간식을 먹고 친구들과 함께 소소한 시간을 보내는 치이카와의 하루를 소개합니다.'
          },
          {
            category: '하치와레',
            title: '하치와레의 긍정 에너지',
            body: '언제나 밝고 다정한 하치와레의 매력과 친구들을 챙기는 모습을 이야기합니다.'
          },
          {
            category: '우사기',
            title: '우사기의 예측 불가능한 매력',
            body: '자유롭고 엉뚱한 행동으로 분위기를 바꾸는 우사기의 매력을 정리해봤습니다.'
          },
          {
            category: '치이카와',
            title: '치이카와 친구들의 우정',
            body: '서로 다른 성격을 가진 치이카와와 친구들이 함께 지내는 모습이 큰 매력입니다.'
          },
          {
            category: '하치와레',
            title: '하치와레와 함께하는 일상',
            body: '밝고 다정한 하치와레가 친구들과 보내는 소소하고 따뜻한 일상입니다.'
          },
          {
            category: '우사기',
            title: '우사기가 등장하면 생기는 일',
            body: '우사기는 등장할 때마다 예상하기 어려운 행동으로 재미있는 분위기를 만들어냅니다.'
          },
          {
            category: '치이카와',
            title: '치이카와를 좋아하는 이유',
            body: '귀여운 디자인과 소소한 일상, 친구 사이의 관계를 보는 재미가 있습니다.'
          },
          {
            category: '하치와레',
            title: '하치와레의 다정한 순간들',
            body: '친구들을 생각하는 하치와레의 따뜻하고 긍정적인 모습을 모아봤습니다.'
          },
          {
            category: '우사기',
            title: '오늘도 자유로운 우사기',
            body: '무슨 생각을 하는지 알 수 없지만 그래서 더욱 매력적인 우사기의 하루입니다.'
          }
        ]

        const changedPosts =
          data
            .slice(0, chiikawaPosts.length)
            .map((post, index) => ({
              ...post,
              title: chiikawaPosts[index].title,
              body: chiikawaPosts[index].body,
              category: chiikawaPosts[index].category,
              image: '',
              isCustom: false
            }))

        setPosts(changedPosts)
        setLoading(false)
      })
      .catch((error) => {
        console.error(error)
        setLoading(false)
      })
  }, [])


  // 이미지 선택
  const handleImageChange = (e) => {
    const file = e.target.files[0]

    if (!file) {
      return
    }

    const reader = new FileReader()

    reader.onloadend = () => {
      setNewImage(reader.result)
    }

    reader.readAsDataURL(file)
  }


  // 새 글 작성
  const handleAddPost = (e) => {
    e.preventDefault()

    if (
      newTitle.trim() === '' ||
      newBody.trim() === ''
    ) {
      alert('제목과 내용을 모두 입력해주세요.')
      return
    }

    const newPost = {
      id: Date.now(),
      title: newTitle.trim(),
      body: newBody.trim(),
      category: newCategory,
      image: newImage,
      isCustom: true
    }

    setCustomPosts((prevPosts) => [
      newPost,
      ...prevPosts
    ])

    setNewTitle('')
    setNewBody('')
    setNewCategory('치이카와')
    setNewImage('')
    setShowWriteForm(false)
  }


  // 내가 쓴 글 삭제
  const handleDeletePost = (id) => {
    const isConfirm =
      window.confirm('이 게시글을 삭제하시겠습니까?')

    if (!isConfirm) {
      return
    }

    setCustomPosts((prevPosts) =>
      prevPosts.filter(
        (post) => post.id !== id
      )
    )
  }


  const allPosts = [
    ...customPosts,
    ...posts
  ]


  const filteredPosts =
    allPosts.filter((post) => {
      const keyword =
        search.toLowerCase()

      const matchesSearch =
        post.title
          .toLowerCase()
          .includes(keyword) ||
        post.body
          .toLowerCase()
          .includes(keyword)

      const matchesCategory =
        category === '전체' ||
        post.category === category

      return (
        matchesSearch &&
        matchesCategory
      )
    })


  if (loading) {
    return (
      <main className="page">
        <div className="loading-box">
          게시글을 불러오는 중...
        </div>
      </main>
    )
  }


  return (
    <main className="page">

      {/* =====================
          배너 + 소개
      ====================== */}

      <section className="hero-card">

        <div className="banner-area">
          <img
            src={bannerImage}
            alt="치이카와 배너"
            className="banner-image"
          />
        </div>


        <div className="board-intro">

          <p className="board-label">
            CHIIKAWA COMMUNITY
          </p>

          <h1>
            치이카와 게시판
          </h1>

          <p className="board-description">
            치이카와와 친구들의 소소한 이야기를
            자유롭게 기록하고 공유해보세요.
          </p>


          <div className="board-stats">

            <div className="stat-item">
              <span>전체 게시글</span>
              <strong>{allPosts.length}</strong>
            </div>

            <div className="stat-item my-stat">
              <span>내가 쓴 글</span>
              <strong>{customPosts.length}</strong>
            </div>

          </div>

        </div>

      </section>


      {/* =====================
          검색 / 필터 영역
      ====================== */}

      <section className="control-panel">

        <div className="category-area">

          {[
            '전체',
            '치이카와',
            '하치와레',
            '우사기'
          ].map((item) => (

            <button
              key={item}
              className={
                category === item
                  ? 'category-button active'
                  : 'category-button'
              }
              onClick={() =>
                setCategory(item)
              }
            >
              {item}
            </button>

          ))}

        </div>


        <div className="board-tool-row">

          <div className="search-area">

            <span className="search-icon">
              ⌕
            </span>

            <input
              type="text"
              placeholder="게시글 제목이나 내용을 검색해보세요"
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
            />

          </div>


          <button
            className="write-button"
            onClick={() =>
              setShowWriteForm(
                !showWriteForm
              )
            }
          >
            {showWriteForm
              ? '글쓰기 닫기'
              : '+ 글쓰기'}
          </button>

        </div>


        {showWriteForm && (

          <div className="write-card">

            <div className="write-header">

              <p>
                NEW POST
              </p>

              <h2>
                새 이야기 작성
              </h2>

            </div>


            <form onSubmit={handleAddPost}>

              <div className="write-form">

                <label>
                  캐릭터
                </label>

                <select
                  value={newCategory}
                  onChange={(e) =>
                    setNewCategory(
                      e.target.value
                    )
                  }
                >
                  <option value="치이카와">
                    치이카와
                  </option>

                  <option value="하치와레">
                    하치와레
                  </option>

                  <option value="우사기">
                    우사기
                  </option>
                </select>

              </div>


              <div className="write-form">

                <label>
                  제목
                </label>

                <input
                  type="text"
                  placeholder="게시글 제목을 입력하세요"
                  value={newTitle}
                  onChange={(e) =>
                    setNewTitle(
                      e.target.value
                    )
                  }
                />

              </div>


              <div className="write-form">

                <label>
                  내용
                </label>

                <textarea
                  placeholder="이야기를 자유롭게 작성해주세요"
                  value={newBody}
                  onChange={(e) =>
                    setNewBody(
                      e.target.value
                    )
                  }
                />

              </div>


              <div className="write-form">

                <label>
                  사진 첨부
                </label>

                <input
                  className="image-input"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />

              </div>


              {newImage && (

                <div className="image-preview">

                  <img
                    src={newImage}
                    alt="미리보기"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setNewImage('')
                    }
                  >
                    사진 삭제
                  </button>

                </div>

              )}


              <button
                className="submit-post-button"
                type="submit"
              >
                게시글 등록
              </button>

            </form>

          </div>

        )}


        <div className="result-area">

          <p>
            <strong>
              {filteredPosts.length}
            </strong>
            개의 이야기를 찾았어요.
          </p>

          {category !== '전체' && (

            <span className="selected-category">
              {category}
            </span>

          )}

        </div>

      </section>


      {/* =====================
          게시글
      ====================== */}

      <section className="post-section">

        {filteredPosts.length > 0 ? (

          <PostList
            posts={filteredPosts}
            onDelete={handleDeletePost}
          />

        ) : (

          <div className="no-result">

            <strong>
              검색 결과가 없어요.
            </strong>

            <p>
              다른 검색어나 캐릭터를 선택해보세요.
            </p>

          </div>

        )}

      </section>


      <footer className="board-footer">
        Chiikawa Board · React Practice
      </footer>

    </main>
  )
}

export default App