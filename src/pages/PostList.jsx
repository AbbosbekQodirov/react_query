import React from "react";
import AddPost from "../components/AddPost";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deletePost, fetchPosts } from "../api/posts";
import { useNavigate } from "react-router-dom";

function PostList() {

  const queryClient = useQueryClient();
  const navigate=useNavigate();

  const {
    isLoading,
    isError,
    data: posts,
    error,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  const deletePostMutation = useMutation({
    mutationFn: deletePost,
    onSuccess: ()=>{
      queryClient.invalidateQueries({ queryKey: ["posts"] });
      console.log("Delete succes bro!");
    }
  });

  const handleDelete = (id)=>{
    deletePostMutation.mutate(id)
  }


  if (isLoading) return <h1>Loading...</h1>;
  if (isError) return `Error: ${error.message}`;

  return (
    <div>
      <AddPost />
      {posts?.map(post =>{
        return (
          <div key={post.id} style={{ background: "#777", padding: "10px", margin:"10px", borderRadius: "10px" }}>
            <h2
              style={{ cursor: "pointer" }}
              onClick={() => navigate(`/post/${post.id}`)}
            >
              {post.title}
            </h2>
            <button onClick={() => navigate(`/post/${post.id}/edit`)}>
              EDIT
            </button>
             
            <button onClick={()=>{handleDelete(post.id);}}>DELETE</button>
          </div>
        );
      })}
    </div>
  );
}

export default PostList;
