import React from 'react';
import { motion } from 'framer-motion';
import { Outlet } from 'react-router-dom';
import AdminDashboard from './AdminDashboard';
import AdminListEvent from './AdminListEvent';
import AdminManageEvent from './AdminManageEvent';

const Index = () => {
  return (
    <div>
        <AdminDashboard/>
        <AdminListEvent/>
        <AdminManageEvent/>
    </div>
  );
};

export default Index;