import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Link, useRouterState } from '@tanstack/react-router';
import { gsap } from 'gsap';
import { ROUTES, SIDEBAR_CONSTANTS } from '@/config/constants';
import LogoIcon from '@/assets/icons/Logo.svg?react';
import NewAnalysisIcon from '@/assets/icons/NewAnalysis.svg?react';
import KnowledgeHubIcon from '@/assets/icons/KnowledgeHub.svg?react';
import ReportsIcon from '@/assets/icons/Reports.svg?react';
import AttorneyDirectoryIcon from '@/assets/icons/AttorneyDirectory.svg?react';
import EmailDraftsIcon from '@/assets/icons/EmailDrafts.svg?react';
import CustomerDetailsIcon from '@/assets/icons/CustomerDetails.svg?react';
import HelpResourcesIcon from '@/assets/icons/Help&Resources.svg?react';
import SettingsIcon from '@/assets/icons/Settings.svg?react';
import AdminPanelIcon from '@/assets/icons/AdminPanel.svg?react';
import styles from './Sidebar.module.css';

const Sidebar = ({ activeItem = null }) => {
  const sidebarRef = useRef(null);
  const navItemsRef = useRef([]);
  const overlayRef = useRef(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouterState();
  const currentPath = router.location.pathname;

  useEffect(() => {
    if (!sidebarRef.current) return;

    const isMobile = window.innerWidth <= 768;
    if (!isMobile) {
      gsap.fromTo(
        sidebarRef.current,
        { x: -257, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.5, ease: 'power2.out' }
      );
    }
  }, []);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768 && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [isMobileMenuOpen]);

  useEffect(() => {
    if (isMobileMenuOpen && overlayRef.current) {
      gsap.fromTo(
        overlayRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3 }
      );
    } else if (!isMobileMenuOpen && overlayRef.current) {
      gsap.to(overlayRef.current, { opacity: 0, duration: 0.3 });
    }
  }, [isMobileMenuOpen]);

  useEffect(() => {
    navItemsRef.current.forEach((item, index) => {
      if (item) {
        gsap.fromTo(
          item,
          { x: -20, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 0.3,
            delay: 0.1 * index,
            ease: 'power2.out'
          }
        );
      }
    });
  }, []);

  const handleItemClick = (itemId) => {
    const clickedItem = navItemsRef.current.find(
      (ref) => ref?.dataset?.itemId === itemId
    );

    if (clickedItem) {
      gsap.to(clickedItem, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: 'power2.inOut'
      });
    }

    if (window.innerWidth <= 768) {
      setIsMobileMenuOpen(false);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const getActiveItemFromPath = () => {
    if (activeItem) return activeItem;
    if (currentPath === '/' || currentPath === ROUTES.NEW_ANALYSIS) return 'new-analysis';
    if (currentPath === ROUTES.KNOWLEDGE_HUB) return 'knowledge-hub';
    if (currentPath === ROUTES.REPORTS) return 'reports';
    if (currentPath === ROUTES.ATTORNEY_DIRECTORY) return 'attorney-directory';
    if (currentPath === ROUTES.EMAIL_DRAFTS) return 'email-drafts';
    if (currentPath === ROUTES.CUSTOMER_DETAILS) return 'customer-details';
    if (currentPath === ROUTES.HELP_RESOURCES) return 'help-resources';
    if (currentPath === ROUTES.SETTINGS) return 'settings';
    if (currentPath === ROUTES.ADMIN_PANEL) return 'admin-panel';
    return null;
  };

  const navigationItems = [
    {
      id: 'knowledge-hub',
      label: SIDEBAR_CONSTANTS.KNOWLEDGE_HUB,
      icon: KnowledgeHubIcon,
      path: ROUTES.KNOWLEDGE_HUB,
      isPrimary: false
    },
    {
      id: 'reports',
      label: SIDEBAR_CONSTANTS.REPORTS,
      icon: ReportsIcon,
      path: ROUTES.REPORTS,
      isPrimary: false
    },
    {
      id: 'attorney-directory',
      label: SIDEBAR_CONSTANTS.ATTORNEY_DIRECTORY,
      icon: AttorneyDirectoryIcon,
      path: ROUTES.ATTORNEY_DIRECTORY,
      isPrimary: false
    },
    {
      id: 'email-drafts',
      label: SIDEBAR_CONSTANTS.EMAIL_DRAFTS,
      icon: EmailDraftsIcon,
      path: ROUTES.EMAIL_DRAFTS,
      isPrimary: false
    },
    {
      id: 'customer-details',
      label: SIDEBAR_CONSTANTS.CUSTOMER_DETAILS,
      icon: CustomerDetailsIcon,
      path: ROUTES.CUSTOMER_DETAILS,
      isPrimary: false
    }
  ];

  const secondaryItems = [
    {
      id: 'help-resources',
      label: SIDEBAR_CONSTANTS.HELP_RESOURCES,
      icon: HelpResourcesIcon,
      path: ROUTES.HELP_RESOURCES
    },
    {
      id: 'settings',
      label: SIDEBAR_CONSTANTS.SETTINGS,
      icon: SettingsIcon,
      path: ROUTES.SETTINGS
    }
  ];

  const adminItems = [
    {
      id: 'admin-panel',
      label: SIDEBAR_CONSTANTS.ADMIN_PANEL,
      icon: AdminPanelIcon,
      path: ROUTES.ADMIN_PANEL
    }
  ];

  const renderNavItem = (item, index) => {
    const currentActiveItem = getActiveItemFromPath();
    const isActive = currentActiveItem === item.id;
    const IconComponent = item.icon;

    return (
      <Link
        key={item.id}
        to={item.path}
        ref={(el) => {
          if (el) navItemsRef.current[index] = el;
        }}
        data-item-id={item.id}
        className={`${styles.navItem} ${isActive ? styles.active : ''}`}
        onClick={() => handleItemClick(item.id)}
        aria-label={item.label}
      >
        <IconComponent className={styles.navIcon} />
        <span className={styles.navLabel}>{item.label}</span>
      </Link>
    );
  };

  return (
    <>
      <div
        ref={overlayRef}
        className={`${styles.overlay} ${isMobileMenuOpen ? styles.overlayOpen : ''}`}
        onClick={closeMobileMenu}
        aria-hidden="true"
      />
      <button
        className={styles.mobileMenuButton}
        onClick={toggleMobileMenu}
        aria-label="Toggle menu"
        aria-expanded={isMobileMenuOpen}
      >
        <span className={styles.hamburgerIcon}>
          <span className={isMobileMenuOpen ? styles.hamburgerOpen : ''}></span>
          <span className={isMobileMenuOpen ? styles.hamburgerOpen : ''}></span>
          <span className={isMobileMenuOpen ? styles.hamburgerOpen : ''}></span>
        </span>
      </button>
      <aside
        ref={sidebarRef}
        className={`${styles.sidebar} ${isMobileMenuOpen ? styles.sidebarOpen : ''}`}
      >
        <div className={styles.logoContainer}>
          <LogoIcon className={styles.logo} />
        </div>
        <nav className={styles.nav}>
        <div className={styles.navSection}>
          {renderNavItem(
            {
              id: 'new-analysis',
              label: SIDEBAR_CONSTANTS.NEW_ANALYSIS,
              icon: NewAnalysisIcon,
              path: ROUTES.NEW_ANALYSIS
            },
            0
          )}
        </div>

        <div className={styles.navSection}>
          {navigationItems.map((item, index) =>
            renderNavItem(item, index + 1, false)
          )}
        </div>

        <div className={styles.separator} />

        <div className={styles.navSection}>
          {secondaryItems.map((item, index) =>
            renderNavItem(
              item,
              navigationItems.length + index + 2,
              false
            )
          )}
        </div>

        <div className={styles.separator} />

        <div className={styles.navSection}>
          {adminItems.map((item, index) =>
            renderNavItem(
              item,
              navigationItems.length + secondaryItems.length + index + 3,
              false
            )
          )}
        </div>
      </nav>
    </aside>
    </>
  );
};

Sidebar.propTypes = {
  activeItem: PropTypes.string
};

export default Sidebar;

