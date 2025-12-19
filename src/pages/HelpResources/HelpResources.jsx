import React from 'react';
import { HELP_RESOURCES } from '@/config/constants';
import styles from './HelpResources.module.css';

// Icon Components
const LightbulbIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M9 21H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M12 3C8.68629 3 6 5.68629 6 9C6 11.22 7.21 13.157 9 14.197V17C9 17.5523 9.44772 18 10 18H14C14.5523 18 15 17.5523 15 17V14.197C16.79 13.157 18 11.22 18 9C18 5.68629 15.3137 3 12 3Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const DocumentIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14 2V8H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 13H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 17H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10 9H9H8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const QuestionIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
    <path d="M9.09 9C9.3251 8.33167 9.78915 7.76811 10.4 7.40913C11.0108 7.05016 11.7289 6.91894 12.4272 7.03871C13.1255 7.15849 13.7588 7.52152 14.2151 8.06353C14.6713 8.60553 14.9211 9.29152 14.92 10C14.92 12 11.92 13 11.92 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="12" cy="17" r="1" fill="currentColor"/>
  </svg>
);

const SupportIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 18V12C3 9.61305 3.94821 7.32387 5.63604 5.63604C7.32387 3.94821 9.61305 3 12 3C14.3869 3 16.6761 3.94821 18.364 5.63604C20.0518 7.32387 21 9.61305 21 12V18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M21 19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H18C17.4696 21 16.9609 20.7893 16.5858 20.4142C16.2107 20.0391 16 19.5304 16 19V16C16 15.4696 16.2107 14.9609 16.5858 14.5858C16.9609 14.2107 17.4696 14 18 14H21V19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M3 19C3 19.5304 3.21071 20.0391 3.58579 20.4142C3.96086 20.7893 4.46957 21 5 21H6C6.53043 21 7.03914 20.7893 7.41421 20.4142C7.78929 20.0391 8 19.5304 8 19V16C8 15.4696 7.78929 14.9609 7.41421 14.5858C7.03914 14.2107 6.53043 14 6 14H3V19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Icon Mapping
const ICON_MAP = {
  lightbulb: LightbulbIcon,
  document: DocumentIcon,
  question: QuestionIcon,
  support: SupportIcon
};

// Resource Card Component
const ResourceCard = ({ title, description, buttonText, iconType, variant }) => {
  const IconComponent = ICON_MAP[iconType] || LightbulbIcon;
  const iconClass = variant === 'primary' ? styles.iconPrimary : styles.iconSecondary;
  
  const handleLearnMore = () => {
    console.log(`Learn more clicked for: ${title}`);
  };

  return (
    <div className={styles.card}>
      <div className={`${styles.iconWrapper} ${iconClass}`}>
        <IconComponent />
      </div>
      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>{title}</h3>
        <p className={styles.cardDescription}>{description}</p>
        <button 
          className={styles.learnMoreButton}
          onClick={handleLearnMore}
          type="button"
        >
          {buttonText}
        </button>
      </div>
    </div>
  );
};

const HelpResources = () => {
  const { CARDS } = HELP_RESOURCES;

  const resourceCards = [
    { ...CARDS.HOW_IT_WORKS, variant: 'primary' },
    { ...CARDS.UNDERSTANDING_REPORT, variant: 'secondary' },
    { ...CARDS.FAQS, variant: 'secondary' },
    { ...CARDS.CONTACT_SUPPORT, variant: 'primary' }
  ];

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 className={styles.title}>{HELP_RESOURCES.TITLE}</h1>
        <p className={styles.subtitle}>{HELP_RESOURCES.SUBTITLE}</p>
      </header>

      <div className={styles.cardsGrid}>
        {resourceCards.map((card, index) => (
          <ResourceCard
            key={index}
            title={card.TITLE}
            description={card.DESCRIPTION}
            buttonText={card.BUTTON_TEXT}
            iconType={card.ICON_TYPE}
            variant={card.variant}
          />
        ))}
      </div>
    </div>
  );
};

export default HelpResources;
