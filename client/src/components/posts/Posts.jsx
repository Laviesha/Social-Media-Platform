import React from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import {useSelector} from 'react-redux'
import Post from '../post/Post'
import classes from './posts.module.css'
// import {useNavigate} from 'react-router-dom'

import { Link, useNavigate } from 'react-router-dom'
import {AiOutlineFileImage} from 'react-icons/ai'

const Posts = () => {
  const [posts, setPosts] = useState([])
  const {token} = useSelector((state) => state.auth)
  const [state, setState] = useState({})
  const [photo, setPhoto] = useState("")
  // const {token} = useSelector((state) => state.auth)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchPosts = async() => {
      try {
        const res = await fetch(`http://localhost:5000/post/timeline/posts`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        const data = await res.json()
        setPosts(data)
      } catch (error) {
        console.error(error)
      }
    }
    fetchPosts()
  }, [])



  const handleState = (e) => {
    setState(prev => {
      return {...prev, [e.target.name]: e.target.value}
    })
  }

  const handleCreatePost = async(e) => {
    e.preventDefault()

    try {
      let filename = null

      if(photo){
        const formData = new FormData()
        filename = crypto.randomUUID() + photo.name
        formData.append("filename", filename)
        formData.append("image", photo)
        
        await fetch(`http://localhost:5000/upload/image`, {
          headers: {
            "Authorization": `Bearer ${token}`
          },
          method: 'POST',
          body: formData
        })
      }

      const res = await fetch(`http://localhost:5000/post`, {
        headers: {
          "Content-Type": 'application/json',
          "Authorization": `Bearer ${token}`
        },
        method: "POST",
        body: JSON.stringify({...state, photo: filename})
      })
      const data = await res.json()
    //   console.log(data)
      navigate('/')
      } catch (error) {
       console.error(error)
    }
  }
  return (
    <div className={classes.container}>
     
        {posts?.length > 0 ? posts.map((post) =>(
          
          <Post key={post._id} post={post} />
        
        )):<span>

<div className={classes.wrapper}>
  
          <h2>Upload Post</h2>

        <form onSubmit={handleCreatePost}>
           <input type="text" name="title" placeholder="Title..." onChange={handleState}/>
           <input type="text" name="desc" placeholder="Description..." onChange={handleState}/>
           <label htmlFor='photo'>Upload photo <AiOutlineFileImage /></label>
           <input type="file" id='photo' style={{display: 'none'}} onChange={(e) => setPhoto(e.target.files[0])}/>
           <input type="text" name="location" placeholder="Location..." onChange={handleState}/>
          
           <button>Post</button>
           </form>
           </div>
           </span>}
      
    </div>

)

}

export default Posts