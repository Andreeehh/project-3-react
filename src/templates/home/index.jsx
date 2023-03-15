import { useEffect, useState, useCallback } from "react";

// import { Component } from "react";
import "./styles.css";

import { loadPosts } from "../../utils/load-post";
import { Posts } from "../../components/Posts";
import { Button } from "../../components/Button";
import { TextInput } from "../../components/TextInput";

// export class Home extends Component {
//   state = {
//     counter: 0,
//   };

//   handleClick = () => {
//     this.setState(
//       (prevState, prevProps) => {
//         return { counter: prevState.counter + 1 };
//       },
//       () => {
//         console.log(this.state.counter);
//       }
//     );
//     // console.log(this.state.counter)//como o setState é assíncrono, fica diferente os valores, para resolver passar como função de callback
//   };

//   render() {
//     return (
//       <div className="container">
//         <h1>{this.state.counter}</h1>
//         <button onClick={this.handleClick}>Increment</button>
//       </div>
//     );
//   }
// }

export const Home = () => {
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [postsPerPage] = useState(10);
  const [searchValue, setSearchValue] = useState("");

  const filteredPosts = !!searchValue
    ? allPosts.filter((post) => {
        return post.title.toLowerCase().includes(searchValue.toLowerCase());
      })
    : posts;

  const noMorePosts = page + postsPerPage >= allPosts.length;

  const handleLoadPosts = useCallback(async (page, postsPerPage) => {
    const postsAndPhotos = await loadPosts();
    setPosts(postsAndPhotos.slice(page, postsPerPage));
    setAllPosts(postsAndPhotos);
  }, []);

  useEffect(() => {
    handleLoadPosts(0, postsPerPage);
  }, [handleLoadPosts, postsPerPage]);

  const loadMorePosts = () => {
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);
    setPosts(posts);
    setPage(nextPage);
  };

  const handleChange = (e) => {
    const { value } = e.target;
    setSearchValue(value);
  };

  return (
    <section className="container">
      <div className="search-container">
        {!!searchValue && (
          <>
            <h1>Seach value: {searchValue}</h1>
          </>
        )}
        <TextInput searchValue={searchValue} handleChange={handleChange} />
      </div>
      {filteredPosts.length > 0 && <Posts posts={filteredPosts} />}
      {filteredPosts.length === 0 && <p>Não existem posts</p>}

      <div className="button-container">
        {!searchValue && ( //se nao tiver busca, exibe o botão
          <Button
            text="Load more posts"
            onClick={loadMorePosts}
            disabled={noMorePosts}
          />
        )}
      </div>
    </section>
  );
};

// export class Home2 extends Component {
//   state = {
//     posts: [],
//     allPosts: [],
//     page: 0,
//     postPerPage: 10,
//     searchValue: "",
//   };

//   async componentDidMount() {
//     await loadPosts();
//   }

//   loadPosts = async () => {
//     const { page, postPerPage } = this.state;
//     const postsAndPhotos = await loadPosts();
//     this.setState({
//       posts: postsAndPhotos.slice(page, postPerPage),
//       allPosts: postsAndPhotos,
//     });
//   };

//   loadMorePosts = () => {
//     const { page, postPerPage, allPosts, posts } = this.state;
//     const nextPage = page + postPerPage;
//     const nextPosts = allPosts.slice(nextPage, nextPage + postPerPage);
//     posts.push(...nextPosts);
//     this.setState({ posts, page: nextPage });
//   };

//   handleChange = (e) => {
//     const { value } = e.target;
//     this.setState({ searchValue: value });
//   };

//   render() {
//     const { posts, page, postsPerPage, allPosts, searchValue } = this.state;
//     const noMorePosts = page + postsPerPage >= allPosts.length;

//     const filteredPosts = !!searchValue
//       ? allPosts.filter((post) => {
//           return post.title.toLowerCase().includes(searchValue.toLowerCase());
//         })
//       : posts;

//     return (
//       <section className="container">
//         <div className="search-container">
//           {!!searchValue && ( //!! transforma searchValue em um booleano, se tiver busca, faça o que estiver dps do &&
//             <>
//               <h1>Seach value: {searchValue}</h1>
//             </>
//           )}
//           <TextInput
//             searchValue={searchValue}
//             handleChange={this.handleChange}
//           />
//         </div>
//         {filteredPosts.length > 0 && <Posts posts={filteredPosts} />}
//         {filteredPosts.length === 0 && <p>Não existem posts</p>}

//         <div className="button-container">
//           {!searchValue && ( //se nao tiver busca, exibe o botão
//             <Button
//               text="Load more posts"
//               onClick={this.loadMorePosts}
//               disabled={noMorePosts}
//             />
//           )}
//         </div>
//       </section>
//     );
//   }
// }
