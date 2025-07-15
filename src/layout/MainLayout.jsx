import React ,{useState} from 'react';
import Footer from '../page/Footer/Footer';
import Header from '../page/Header/header';
import styles from './style/MainLayout.module.css'
import { Outlet } from 'react-router-dom';
import Sidebar from '../component/Sidebar/Sidebar';
import Chatbot from '../component/AgenteChat/Chatbot';
const MainLayout = () => {
  const [sidebarExpanded, setSidebarExpanded] = useState(false);

 return (
    <div className={styles.layout}>
      <Header toggleSidebar={() => setSidebarExpanded(prev => !prev)} />
      <Sidebar expanded={sidebarExpanded} />
      <div className={styles.contentWrapper}>
        <main className={`${styles['main-content']} ${sidebarExpanded ? styles['main-expanded'] : ''}`}>
          <Outlet />
          <Chatbot />  
        </main>
        
        <Footer />
      </div>
    </div>
  );
};

export default MainLayout;