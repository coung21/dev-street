import React, {useCallback} from 'react';
import { Link } from 'react-router-dom';
import '../Nav.scss';
import { BiBell } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { UIActions } from '../../../store/slices/UiSlice';

function LoggedNavLink({ user }) {
  const dispatch = useDispatch();
  const {dropdown} = useSelector((state) => state.Ui);
  const handleToggleDropdown = useCallback(() => {
    dispatch(UIActions.toggleDropdown(!dropdown));
  }, [dispatch, dropdown]);
  return (
    <>
      <Link>
        <button className='btn create-post btn--primary'>Create Post</button>
      </Link>
      <Link>
        <button className='btn--notification'>
          <BiBell size={25} />
        </button>
      </Link>
      <button
        className='btn--profile'
        onClick={handleToggleDropdown
        }
      >
        <img id='profileRef' src={user.avatar} alt='' />
      </button>
    </>
  );
}

export default LoggedNavLink;
