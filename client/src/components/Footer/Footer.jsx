import React from 'react'
import './Footer.scss'
import {BsDot} from 'react-icons/bs'

function Footer() {
  return (
    <footer className='footer'>
      <div className='footer-container'>
        <p>
          DEV Community — A constructive and inclusive social network for
          software developers. With you every step of your journey.
        </p>
        <ul>
          <li>
            <a href=''>Home</a>
            <BsDot size={20} />
          </li>
          <li>
            <a href=''>Listing</a>
            <BsDot size={20} />
          </li>
          <li>
            <a href=''>Podcasts</a>
            <BsDot size={20} />
          </li>
          <li>
            <a href=''>Videos</a>
            <BsDot size={20} />
          </li>
          <li>
            <a href=''>Tags</a>
            <BsDot size={20} />
          </li>
          <li>
            <a href=''>FAQ</a>
            <BsDot size={20} />
          </li>
          <li>
            <a href=''>Forems Shop</a>
            <BsDot size={20} />
          </li>
          <li>
            <a href=''>Sponsors</a>
            <BsDot size={20} />
          </li>
          <li>
            <a href=''>About</a>
            <BsDot size={20} />
          </li>
          <li>
            <a href=''>Contact</a>
            <BsDot size={20} />
          </li>
          <li>
            <a href=''>Software comparisons</a>
            <BsDot size={20} />
          </li>
          <li>
            <a href=''>Code of Conduct</a>
            <BsDot size={20} />
          </li>
          <li>
            <a href=''>Privacy Policy</a>
            <BsDot size={20} />
          </li>
          <li>
            <a href=''>Terms of use</a>
          </li>         
        </ul>
      </div>
    </footer>
  );
}

export default Footer