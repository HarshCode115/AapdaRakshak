import React from 'react'
import {AiFillInstagram,AiFillYoutube,AiFillGithub} from "react-icons/ai"
import '../../styles/footer.scss'

const Footer = () => {
  return (
    <footer>
       <div>
       <h2>Dev_Elite</h2>
        {/* <p>We are trying to give you the best taste possible.</p> */}
        <br/>
        <p>We give attention to genuine feedback.</p>
        <strong>All right received @Dev_elite</strong>
       </div>
       <aside>
        <h4>Follow Us</h4>
        <a href="https://youtube.com">
            <AiFillYoutube/>Youtube
        </a>
        <a href="https://youtube.com">
            <AiFillInstagram/> Instagram
        </a>
        <a href="https://youtube.com">
            <AiFillGithub/> Github
        </a>
       </aside>
    </footer>
  )
}

export default Footer