import React from 'react'
 import Posts from '../posts/Posts'
 import ProfileCard from '../profileCard/ProfileCard'
 import Rightside from '../rightside/Rightside'
 import SuggestedUsers from '../suggestedUsers/SuggestedUsers'
import classes from './home.module.css'

const Home = () => {
  return (
    <div className={classes.container}>
      <div className={classes.left}>
        <ProfileCard />
        <SuggestedUsers />
      </div>
      <div  className={classes.ww}>
        <h2 className={classes.cc}>Your Posts</h2>
      <Posts />
      </div>
      <Rightside />
    </div>
    
  )
}

export default Home