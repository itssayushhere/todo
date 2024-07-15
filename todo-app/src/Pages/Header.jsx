import { NavLink } from 'react-router-dom';

export const Header = () => {
  const links = [
    { label: 'Home', link: '/' },
    { label: 'About', link: '/about' },
    // Add more links as needed
    
  ];

  return (
    <div className=''>
    <div className='fixed top-5  flex items-center w-full  justify-center  '>
      <nav className='bg-black rounded-3xl overflow-hidden'>
        <ul className='flex items-center justify-evenly  border  rounded-3xl p-1'>
          {links.map((item, index) => (
            
            <NavLink to={item.link} activeClassName="active" key={index}> 
                <li key={index} className='p-5 rounded-3xl hover:bg-gray-700 px-14 hover:border-neutral-200 transition duration-500'>
                {item.label}
              </li>
              </NavLink>
          ))}
        </ul>
      </nav>
    </div>
    </div>
  );
};

