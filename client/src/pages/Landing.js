import { Logo } from '../components'; 
import main from "../assets/images/main.svg";
import Wrapper from '../assets/wrappers/LandingPage';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';

const Landing = () => {
  return (
    <Wrapper>
      <nav>
          <Logo />
      </nav>
      <div className='container page'>
          <div className='info'>
              <h1>
                job <span> tracking </span> app
              </h1>
              <p>
                JS is a dynamic and flexible language where we can do all kinds of crazy things, the code is interpreted by the browser. 
                But if your code is broken, you can not catch it until runtime. 
              </p>
              <Link to='/register' className='btn btn-hero'>Login/Register</Link>
          </div>
          <img src={main} alt='job hunt' className="img main-img" />
      </div>
    </Wrapper>
  )
}

export default Landing