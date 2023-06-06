
import "./home.css";
import {CategoryCard} from '../components/categorycard'
import { ScrollButton } from "../components/scrollbutton";

import banner1 from '../images/banner/banner1.png'
import banner2 from '../images/banner/banner2.png'
import banner3 from '../images/banner/banner3.png'
import banner4 from '../images/banner/banner4.png'

import linkedin from '../images/linkedin.png'
import twitter from '../images/twitter.png'
import instagram from '../images/instagram.png'

export const Home = () => {
  return (
    <>
    <div className='home'>

      <div className='heading'>
          <h1>* Welcome to ShopVerse *</h1>
          <div className='scroll-button'>
          <ScrollButton />
        </div>
      </div>


      <div className='wrapper'>
        <img src={banner1} alt="" />
        <img src={banner2} alt="" />
        <img src={banner3} alt="" />
        <img src={banner4} alt="" />
      </div>

      <h2 id="target-section">☼ Shop By Category ☼</h2>
      <CategoryCard />
      
      <footer>
        <ul>
          <li>
            <a href = 'https://www.linkedin.com/in/vaibhavbasantani' target='_blank' rel="noreferrer"><img className='resize' src={linkedin} alt="" /></a>
          </li>

          <li>
            <a href = 'https://twitter.com/0xbasantani' target='_blank' rel="noreferrer"><img className='resize' src={twitter} alt="" /></a>
          </li>

          <li>
            <a href = 'https://www.instagram.com/vaibhav_basantani' target='_blank' rel="noreferrer"><img className='resize' src={instagram} alt="" /></a>
          </li>
        </ul>
      </footer>
    </div>
    </>
  );
};