import { memo } from "react";
import { Collapse } from "antd";
import { Post } from "types/Post.dto";
import "./PostCard.css";


interface PostCardProps {
  post: Post;
}

const PostCard: React.FC<PostCardProps> = memo(({ post }) => {
  return (
    <div className='custom-post-card'>
      <Collapse
        collapsible='header'
        items={[
          {
            key: "1",
            label: <h3>{post.title}</h3>,
            children: <p>{post.body}</p>,
          },
        ]}
      />
    </div>
  );
});

export default PostCard;
