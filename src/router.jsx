import { createBrowserRouter } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Contact from './pages/Contact'
import About from './pages/About'
import OurTeam from './pages/OurTeam'
// Services pages
import ITSupport from './pages/ITSupport'
import ITConsulting from './pages/ITConsulting'
import ComputerRepair from './pages/ComputerRepair'
import PhoneTabletRepair from './pages/PhoneTabletRepair'
import Cybersecurity from './pages/Cybersecurity'
import MedicalDentalOffices from './pages/MedicalDentalOffices'
import FiberDataCenter from './pages/FiberDataCenter'
import CloudSOCMonitoring from './pages/CloudSOCMonitoring'
import CyberTraining from './pages/CyberTraining'
import OurTeam from './pages/OurTeam'
// Cybersecurity industry pages
import AccountingLegal from './pages/AccountingLegal'
import Education from './pages/Education'
import Business from './pages/Business'
import CarDealerships from './pages/CarDealerships'
import DealershipServices from './pages/DealershipServices'
// Admin pages (hidden routes - no UI links)
import AdminLogin from './pages/AdminLogin'
import Admin from './pages/Admin'
// Blog pages
import Blog from './pages/Blog'
import BlogDetail from './pages/BlogDetail'

export const router = createBrowserRouter([
    {
        path: '/',
        element: <HomePage />,
    },
    {
        path: '/contact',
        element: <Contact />,
    },
    {
        path: '/about',
        element: <About />,
    },
    {
        path: '/our-team',
        element: <OurTeam />,
    },
    // Services
    {
        path: '/it-support',
        element: <ITSupport />,
    },
    {
        path: '/it-consulting',
        element: <ITConsulting />,
    },
    {
        path: '/computer-repair',
        element: <ComputerRepair />,
    },
    {
        path: '/phone-tablet-repair',
        element: <PhoneTabletRepair />,
    },
    {
        path: '/cybersecurity',
        element: <Cybersecurity />,
    },
    {
        path: '/medical-dental-offices',
        element: <MedicalDentalOffices />,
    },
    {
        path: '/fiber-data-center',
        element: <FiberDataCenter />,
    },
    {
        path: '/cloud-soc-monitoring',
        element: <CloudSOCMonitoring />,
    },
    {
        path: '/cyber-training',
        element: <CyberTraining />,
    },
    // Cybersecurity industries
    {
        path: '/accounting-legal',
        element: <AccountingLegal />,
    },
    {
        path: '/education',
        element: <Education />,
    },
    {
        path: '/business',
        element: <Business />,
    },
    {
        path: '/car-dealerships',
        element: <CarDealerships />,
    },
    {
        path: '/dealership-services',
        element: <DealershipServices />,
    },
    // Blog routes
    {
        path: '/blog',
        element: <Blog />,
    },
    {
        path: '/blog/:slug',
        element: <BlogDetail />,
    },
    // Admin routes (hidden - access via URL only)
    {
        path: '/admin/login',
        element: <AdminLogin />,
    },
    {
        path: '/admin',
        element: <Admin />,
    },
])

