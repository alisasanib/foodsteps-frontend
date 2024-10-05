import { useCallback, useEffect, useState } from "react";
import { Space, Spin } from "antd";
import { useAppSelector } from "../../store/hooks";
import { userIdSelector } from "../../store/slices/userSlice";
import PostCard from "../../common/PostCard";
import { Post } from "../../types/Post.dto";
import { useFetch } from "../../hooks/useFetch";
import CustomInput from "common/CustomInput";
import "./Posts.css";

const Posts: React.FC = () => {
  const [filteredPosts, setFilteredPosts] = useState<Post[] | null>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const userId = useAppSelector(userIdSelector);
  const {
    data: posts,
    isLoading,
    error,
  } = useFetch<Post[]>(`posts?userId=${userId}`);

  useEffect(() => {
    setFilteredPosts(posts);
  }, [posts]);

  useEffect(() => {
    setSearchTerm("");
  }, [userId]);

  useEffect(() => {
    setFilteredPosts(
      posts ? posts.filter((post) => post.title.includes(searchTerm) || post.body.includes(searchTerm)) : []
    );
  }, [searchTerm, posts]);

  const handleSearchTerm = useCallback((value: string) => {
    setSearchTerm(value);
  }, []);

  if (error) return <div role='alert'>Error: {error}</div>;

  if (isLoading || !posts) return <Spin data-testid='posts-spinner' />;

  return (
    <Space direction='vertical'>
      <CustomInput
        value={searchTerm}
        onChange={handleSearchTerm}
      />
      {filteredPosts?.length === 0 ? (
        <div style={{ width: 500 }}>No posts found.</div>
      ) : (
        filteredPosts?.map((post, index) => (
          <PostCard
            key={post.id}
            post={post}
          />
        ))
      )}
    </Space>
  );
};

export default Posts;
