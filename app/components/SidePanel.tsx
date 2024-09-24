'use client'

import { useState } from 'react';
import './SidePanel.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faX } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';
import { AppDispatch, RootState } from '../../lib/store';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { deletePage, fetchPages, setCurrentPage } from '../../lib/pageSlice';
import { Page } from '../types';

const SidePanel = () => {
  const pages = useSelector((state: RootState) => state.page.pages)
  const dispatch = useDispatch<AppDispatch>()

  const [isOpen, setOpen] = useState(false);

  // useEffect(() => {
  if (isOpen) {
    dispatch(fetchPages())
  }
  // }, [isOpen]);

  const handlePageSelect = (pageId: Page['id']) => {
    dispatch(setCurrentPage(pageId))
    setOpen(false)
  }

  const handlePageDelete = (pageId: Page['id']) => {
    dispatch(deletePage({ id: pageId }))
  }

  return (
    <div
      className={clsx('panel', {
        'panel-open': isOpen,
        'panel-closed': !isOpen,
      })}
    >
      <div className="icon-bars">
        <FontAwesomeIcon
          onClick={() => setOpen(!isOpen)}
          icon={faBars}
          className="fa-2xl"
        />
      </div>
      <div className={isOpen ? 'panel-open-text' : 'panel-closed-text'}>
        {pages.map(({ id, title }) => <div
          key={id}
          className='panel-list-item'

        >
          <span onClick={() => handlePageSelect(id)}>
            {title}
          </span>
          <span className='icon-x'>
            <FontAwesomeIcon
              onClick={() => handlePageDelete(id)}
              icon={faX}
              className="fa-xs"
            />
          </span>
        </div>)}
      </div>
    </div>
  );
};

export default SidePanel;
