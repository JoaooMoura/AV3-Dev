import { NavLink } from 'react-router-dom';
import '../styles/Sidebar.css';

const Sidebar = ({ onLogout }) => {
return (
<div className="sidebar">
<h2>Aerocode</h2>
<nav>
<ul>
<li>
<NavLink to="/dashboard" className={({ isActive }) => (isActive ? 'active' : '')}>
Dashboard
</NavLink>
</li>
<li>
<NavLink to="/aeronaves" className={({ isActive }) => (isActive ? 'active' : '')}>
Aeronaves
</NavLink>
</li>
<li>
<NavLink to="/funcionarios" className={({ isActive }) => (isActive ? 'active' : '')}>
Funcionários
</NavLink>
</li>
</ul>
</nav>
<div className="sidebar-footer">
<button className="logout-button" onClick={onLogout}>
Sair
</button>
</div>
</div>
);
};

export default Sidebar;