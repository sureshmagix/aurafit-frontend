import { Menu, Search, ShoppingBag, User, X } from 'lucide-react'
import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { useCart } from '../../contexts/CartContext'
import { NAV_LINKS } from '../../utils/constants'

function Header() {
  const { user, isAuthenticated, logout, isAdmin } = useAuth()
  const { summary } = useCart()
  const [open, setOpen] = useState(false)

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 30, background: 'rgba(255,250,246,0.92)', backdropFilter: 'blur(14px)', borderBottom: '1px solid var(--border)' }}>
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', minHeight: 76, gap: '1rem' }}>
        <Link to="/" style={{ fontSize: '1.4rem', fontWeight: 900, letterSpacing: '0.08em' }}>
          AURA FIT
        </Link>

        <nav className="desktop-nav" style={{ display: 'flex', gap: '1rem' }}>
          {NAV_LINKS.map((link) => (
            <NavLink key={link.path} to={link.path} style={({ isActive }) => ({ fontWeight: isActive ? 700 : 500, color: isActive ? 'var(--text)' : 'var(--muted)' })}>
              {link.label}
            </NavLink>
          ))}
          {isAdmin && <NavLink to="/admin">Admin</NavLink>}
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
          <button className="btn btn-secondary" aria-label="Search">
            <Search size={18} />
          </button>
          <Link className="btn btn-secondary" to="/cart" aria-label="Cart">
            <ShoppingBag size={18} />
            <span>{summary.itemsCount}</span>
          </Link>
          {isAuthenticated ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
              <Link className="btn btn-secondary" to="/profile">
                <User size={18} />
                <span>{user?.name?.split(' ')[0] || 'Account'}</span>
              </Link>
              <button className="btn btn-primary" onClick={logout}>Logout</button>
            </div>
          ) : (
            <Link className="btn btn-primary" to="/login">Login</Link>
          )}
          <button className="btn btn-secondary mobile-toggle" onClick={() => setOpen((prev) => !prev)}>
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="container" style={{ paddingBottom: '1rem', display: 'grid', gap: '0.8rem' }}>
          {NAV_LINKS.map((link) => (
            <NavLink key={link.path} to={link.path} onClick={() => setOpen(false)}>
              {link.label}
            </NavLink>
          ))}
          {isAdmin && (
            <NavLink to="/admin" onClick={() => setOpen(false)}>
              Admin
            </NavLink>
          )}
        </div>
      )}
    </header>
  )
}

export default Header
