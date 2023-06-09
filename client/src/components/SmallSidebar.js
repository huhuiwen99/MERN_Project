import Wrapper from '../assets/wrappers/SmallSidebar';
import { FaTimes } from 'react-icons/fa';
import { useAppContext } from '../context/appContext';
import links from '../utils/links';
import { NavLink } from 'react-router-dom';
import NavLinks from './NavLinks'
import Logo from './Logo';

export const SmallSidebar = () => {
  const { showSidebar, toggleSidebar } = useAppContext();
  // return (
  //   <div className='nav-links'>
  //     {links.map((link) => {
  //       const { text, path, id, icon } = link;

  //       return (
  //         <NavLink
  //           to={path}
  //           className={({ isActive }) =>
  //             isActive ? 'nav-link active' : 'nav-link'
  //           }
  //           key={id}
  //           onClick={toggleSidebar}
  //         >
  //           <span className='icon'>{icon}</span>
  //           {text}
  //         </NavLink>
  //       );
  //     })}
  //   </div>
  // );

  return (
    <Wrapper>
      <div 
        className= {
          showSidebar ? 'sidebar-container show-sidebar' : 'sidebar-container'
          }
        >
        <div className='content'>
          <button className='close-btn' onClick={toggleSidebar}>
            <FaTimes />
          </button>
          <header>
            <Logo />
          </header>
          <NavLinks toggleSidebar={toggleSidebar} />
        </div>
      </div>
    </Wrapper>
  );
};

export default SmallSidebar;