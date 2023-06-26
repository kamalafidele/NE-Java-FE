import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Pagination from '../components/Pagination';

function TestPagination(props) {
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const postsPerPage = 5;


    const fetchPosts = async () => {
        try {
            const { data } = await axios.get('https://jsonplaceholder.typicode.com/posts');
            setPosts(data);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        fetchPosts();
    }, []);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    const handlePagination = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <Container>
            <h2>Testing Pagination</h2>
            { currentPosts.map((post) => (
                <Post key={post.id}>
                    <h3>{post.title}</h3>
                    <p>{post.body}</p>
                </Post>
            ))}
            <Pagination itemsPerPage={postsPerPage} totalItems={posts.length} paginate={handlePagination}/>
        </Container>
    );
}

const Container = styled.div`
h2 {
    text-align: center;
}
`
const Post = styled.div`
background-color: gray;
margin: 10px 0px 10px 0px;
width: 50%;
padding: 10px;
border-radius: 10px;
color: white;

/* FOR RESPONSIVENESS */
/* Extra small devices (phones, 600px and down) */
@media only screen and (max-width: 600px) {}

/* Small devices (portrait tablets and large phones, 600px and up) */
@media only screen and (min-width: 600px) {}

/* Medium devices (landscape tablets, 768px and up) */
@media only screen and (min-width: 768px) {}

/* Large devices (laptops/desktops, 992px and up) */
@media only screen and (min-width: 992px) {}

/* Extra large devices (large laptops and desktops, 1200px and up) */
@media only screen and (min-width: 1200px) {}

`
export default TestPagination;