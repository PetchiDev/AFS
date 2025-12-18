import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import { gsap } from 'gsap';
import SearchIcon from '@/assets/icons/Search.svg?react';
import NotificationIcon from '@/assets/icons/Notification.svg?react';
import styles from './Header.module.css';

const Header = ({ userName = 'John Doe', userEmail = 'john@afs.com' }) => {
  const headerRef = useRef(null);
  const iconsRef = useRef([]);
  const profileRef = useRef(null);

  useEffect(() => {
    if (!headerRef.current) return;

    gsap.fromTo(
      headerRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }
    );
  }, []);

  useEffect(() => {
    iconsRef.current.forEach((icon, index) => {
      if (icon) {
        gsap.fromTo(
          icon,
          { scale: 0, opacity: 0 },
          {
            scale: 1,
            opacity: 1,
            duration: 0.3,
            delay: 0.1 * index + 0.2,
            ease: 'back.out(1.7)'
          }
        );
      }
    });
  }, []);

  useEffect(() => {
    if (profileRef.current) {
      gsap.fromTo(
        profileRef.current,
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.4,
          delay: 0.4,
          ease: 'power2.out'
        }
      );
    }
  }, []);

  const handleIconClick = (iconType) => {
    const clickedIcon = iconsRef.current.find(
      (ref) => ref?.dataset?.iconType === iconType
    );

    if (clickedIcon) {
      gsap.to(clickedIcon, {
        scale: 0.9,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: 'power2.inOut'
      });
    }
  };

  const getInitials = (name) => {
    if (!name) return 'JD';
    const parts = name.trim().split(' ');
    if (parts.length >= 2) {
      return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
    <header ref={headerRef} className={styles.header}>
      <div className={styles.rightSection}>
        <div className={styles.iconsContainer}>
          <button
            ref={(el) => {
              if (el) iconsRef.current[0] = el;
            }}
            data-icon-type="search"
            className={styles.iconButton}
            onClick={() => handleIconClick('search')}
            aria-label="Search"
          >
            <SearchIcon className={styles.icon} />
          </button>

          <button
            ref={(el) => {
              if (el) iconsRef.current[1] = el;
            }}
            data-icon-type="notification"
            className={styles.iconButton}
            onClick={() => handleIconClick('notification')}
            aria-label="Notifications"
          >
            <div className={styles.notificationWrapper}>
              <NotificationIcon className={styles.icon} />
            </div>
          </button>
        </div>

        <div className={styles.separator} />

        <div ref={profileRef} className={styles.profileContainer}>
          <div className={styles.avatarCircle}>
            <span className={styles.avatarInitials}>{getInitials(userName)}</span>
          </div>
          <div className={styles.profileInfo}>
            <span className={styles.profileName}>{userName}</span>
            <span className={styles.profileEmail}>{userEmail}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  userName: PropTypes.string,
  userEmail: PropTypes.string
};

export default Header;

