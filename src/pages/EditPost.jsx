import React from 'react'
import PostForm from '../components/PostForm'
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchPost, updatePost } from '../api/posts';

function EditPost() {

    const navigate = useNavigate();
    const queryClient = useQueryClient();

   const { id } = useParams();
   const {
     isLoading,
     isError,
     data: post,
     error,
   } = useQuery({
     queryKey: ["posts", id],
     queryFn: () => fetchPost(id),
   });

   const updatePostMutation = useMutation({
     mutationFn: updatePost,
     onSuccess: () => {
       queryClient.invalidateQueries({ queryKey: ["posts"] });
       navigate("/")
       console.log("Edit succes bro!");
     },
   });

   if (isLoading) return <h1>Loading...</h1>;
   if (isError) return `Error: ${error.message}`;
   
   console.log(post);
 
   const handleSubmit = (updatedPost)=>{
    updatePostMutation.mutate({id, ...updatedPost})
   }

  return (
    <div>
      <PostForm onSubmit={handleSubmit} initialValue={post}/>
    </div>
  )
}

export default EditPost