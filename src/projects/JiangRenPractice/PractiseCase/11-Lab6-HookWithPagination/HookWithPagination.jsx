import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Container, Box } from "@mui/material";
import "./HookWithPagination.scss";
import Posts from "./Posts";
import Pagination from "./Pagination";
import axios from "axios";

function HookWithPagination() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 10;

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const url = "https://jsonplaceholder.typicode.com/posts";
      const res = await axios.get(url);
      console.log(res.data);
      setPosts(res.data);
      setLoading(false);
    };
    fetchPosts();
  }, []);

  // get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

  return (
    <Container id="hook-with-pagination" maxWidth="lg" sx={{ mt: 4 }}>
      <Box className="hook-pagination-container">
        <h1 className="text-primary">My Blog</h1>

        <Posts currentPosts={currentPosts} loading={loading} />

        <Pagination
          postsPerPage={postsPerPage}
          currentPage={currentPage}
          totalPosts={posts.length}
          paginate={(pageNumber) => setCurrentPage(pageNumber)}
        />
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
        <Button
          component={Link}
          to="/jiangRenPractice"
          variant="contained"
          color="primary"
          sx={{ mr: 2 }}
        >
          Back to Practice Home
        </Button>
      </Box>
    </Container>
  );
}

export default HookWithPagination;
