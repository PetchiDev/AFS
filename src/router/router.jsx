import { createRouter, createRoute, createRootRoute, Outlet } from '@tanstack/react-router';
import { ROUTES } from '@/config/constants';
import NewAnalysis from '@/pages/NewAnalysis';
import KnowledgeHub from '@/pages/KnowledgeHub';
import Reports from '@/pages/Reports';
import AttorneyDirectory from '@/pages/AttorneyDirectory';
import EmailDrafts from '@/pages/EmailDrafts';
import CustomerDetails from '@/pages/CustomerDetails';
import HelpResources from '@/pages/HelpResources';
import Settings from '@/pages/Settings';
import AdminPanel from '@/pages/AdminPanel';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import '@/styles/globals.css';
import styles from '../App.module.css';
import AttorneyProfile from '@/pages/AttorneyDirectory/AttorneyProfile';

const rootRoute = createRootRoute({
  component: () => (
    <div className={styles.app}>
      <Sidebar />
      <div className={styles.mainContent}>
        <Header userName="John Doe" userEmail="john@afs.com" />
        <div className={styles.contentArea}>
          <Outlet />
        </div>
      </div>
    </div>
  )
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: ROUTES.HOME,
  component: NewAnalysis
});

const newAnalysisRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: ROUTES.NEW_ANALYSIS,
  component: NewAnalysis
});

const knowledgeHubRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: ROUTES.KNOWLEDGE_HUB,
  component: KnowledgeHub
});

const reportsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: ROUTES.REPORTS,
  component: Reports
});



const attorneyDirectoryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: ROUTES.ATTORNEY_DIRECTORY,
  component: AttorneyDirectory
});

const attorneyProfileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: ROUTES.ATTORNEY_PROFILE,
  component: AttorneyProfile
});

const emailDraftsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: ROUTES.EMAIL_DRAFTS,
  component: EmailDrafts
});

const customerDetailsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: ROUTES.CUSTOMER_DETAILS,
  component: CustomerDetails
});

const helpResourcesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: ROUTES.HELP_RESOURCES,
  component: HelpResources
});

const settingsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: ROUTES.SETTINGS,
  component: Settings
});

const adminPanelRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: ROUTES.ADMIN_PANEL,
  component: AdminPanel
});

const routeTree = rootRoute.addChildren([
  indexRoute,
  newAnalysisRoute,
  knowledgeHubRoute,
  reportsRoute,
  attorneyDirectoryRoute,
  attorneyProfileRoute,
  emailDraftsRoute,
  customerDetailsRoute,
  helpResourcesRoute,
  settingsRoute,
  adminPanelRoute
]);

export const router = createRouter({ routeTree });

