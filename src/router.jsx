import { createBrowserRouter } from 'react-router-dom'
import HomePage from './pages/HomePage'
import Contact from './pages/Contact'
import About from './pages/About'
// Services pages
import ITSupport from './pages/ITSupport'
import ComputerRepair from './pages/ComputerRepair'
import PhoneTabletRepair from './pages/PhoneTabletRepair'
import Cybersecurity from './pages/Cybersecurity'
import MedicalDentalOffices from './pages/MedicalDentalOffices'
// Cybersecurity industry pages
import AccountingLegal from './pages/AccountingLegal'
import Education from './pages/Education'
import Business from './pages/Business'
import CarDealerships from './pages/CarDealerships'

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
    // Services
    {
        path: '/it-support',
        element: <ITSupport />,
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
])
