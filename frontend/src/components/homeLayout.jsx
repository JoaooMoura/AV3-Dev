import { Outlet } from 'react-router-dom'
import Sidebar from './sidebar'
import '../styles/HomeLayout.css'

const HomeLayout = ({ onLogout }) => {
return (
<div className="home-layout">
<Sidebar onLogout={onLogout} />
<div className="main-content">
<Outlet />
</div>
</div>
)
}

export default HomeLayout