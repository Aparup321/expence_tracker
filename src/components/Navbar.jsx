import { CircleDollarSign, Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState(() => typeof window !== 'undefined' && window.location.hash ? window.location.hash.slice(1) : 'dashboard')

  const navigateTo = (section) => {
    setActiveSection(section)
    setMenuOpen(false)
  }

  useEffect(() => {
    if (typeof window === 'undefined') return undefined
    const handleHashChange = () => setActiveSection(window.location.hash.slice(1) || 'dashboard')
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  return (
    <header className="topbar">
      <div className="topbar-inner">
        <a href="#dashboard" className="brand" aria-label="SpendWise dashboard">
          <span className="brand-mark"><CircleDollarSign size={20} strokeWidth={2.2} /></span>
          <span>SpendWise</span>
        </a>
        <nav className="desktop-nav" aria-label="Primary navigation">
          <a className={`nav-link ${activeSection === 'dashboard' ? 'nav-link-active' : ''}`} aria-current={activeSection === 'dashboard' ? 'page' : undefined} onClick={() => navigateTo('dashboard')} href="#dashboard">Dashboard</a>
          <a className={`nav-link ${activeSection === 'transactions' ? 'nav-link-active' : ''}`} aria-current={activeSection === 'transactions' ? 'page' : undefined} onClick={() => navigateTo('transactions')} href="#transactions">Transactions</a>
          <a className={`nav-link ${activeSection === 'reports' ? 'nav-link-active' : ''}`} aria-current={activeSection === 'reports' ? 'page' : undefined} onClick={() => navigateTo('reports')} href="#reports">Reports</a>
        </nav>
        <div className="profile-tools">
          <div className="avatar" aria-label="Aparup profile">AP</div>
          <button type="button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)} className="icon-button menu-button">{menuOpen ? <X size={20} /> : <Menu size={20} />}</button>
        </div>
      </div>
      {menuOpen && <nav className="mobile-nav" aria-label="Mobile navigation"><a onClick={() => navigateTo('dashboard')} className={`nav-link ${activeSection === 'dashboard' ? 'nav-link-active' : ''}`} aria-current={activeSection === 'dashboard' ? 'page' : undefined} href="#dashboard">Dashboard</a><a onClick={() => navigateTo('transactions')} className={`nav-link ${activeSection === 'transactions' ? 'nav-link-active' : ''}`} aria-current={activeSection === 'transactions' ? 'page' : undefined} href="#transactions">Transactions</a><a onClick={() => navigateTo('reports')} className={`nav-link ${activeSection === 'reports' ? 'nav-link-active' : ''}`} aria-current={activeSection === 'reports' ? 'page' : undefined} href="#reports">Reports</a></nav>}
    </header>
  )
}
