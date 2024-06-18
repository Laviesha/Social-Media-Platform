import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import postdemoimg from '../../assets/people2.jpg'
import classes from './postPhoto.module.css'

const PostPhoto = ({ post }) => {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link
     className={classes.post}
     onMouseEnter={() => setIsHovered(true)}
     onMouseLeave={() => setIsHovered(false)}
     to={`/postDetails/${post._id}`}
    >
      {/* <img src={postdemoimg}/> */}
      <img className={classes.postImg} src={post?.photo ? `http://localhost:5000/images/${post?.photo}` : postdemoimg} />
      {isHovered && <div className={classes.likes}>{post?.likes?.length} likes</div>}
    </Link>
  )
}

export default PostPhoto