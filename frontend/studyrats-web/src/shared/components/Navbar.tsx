import { useAuth } from '@/features/auth/presentation/contexts/AuthContext'
import { NavLink, useNavigate } from 'react-router-dom'

export function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/')
  }

  return (
    <header
      style={{
        height: 64,
        background: '#020617',
        borderBottom: '1px solid #1e293b',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          fontWeight: 'bold',
        }}
      >
        <span style={{ fontSize: 20 }}>🐭</span>
        <span>StudyRats</span>
      </div>
      <nav style={{ display: 'flex', gap: 20 }}>
        <NavLink to="/dashboard" style={linkStyle}>
          Dashboard
        </NavLink>

        <NavLink to="/subjects" style={linkStyle}>
          Disciplinas
        </NavLink>

        <NavLink to="/sessions/new" style={ctaStyle}>
          + Nova Sessão
        </NavLink>
      </nav>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ color: '#94a3b8', fontSize: 14 }}>
          {user?.name}
        </span>

        <button onClick={handleLogout} style={logoutStyle}>
          Sair
        </button>
      </div>
    </header>
  )
}

const linkStyle = ({ isActive }: { isActive: boolean }) => ({
  color: isActive ? '#f97316' : '#94a3b8',
  textDecoration: 'none',
  fontSize: 14,
  transition: '0.2s',
})

const ctaStyle = ({ isActive }: { isActive: boolean }) => ({
  background: isActive ? '#ea580c' : '#f97316',
  color: 'white',
  padding: '6px 12px',
  borderRadius: 6,
  textDecoration: 'none',
  fontSize: 14,
  fontWeight: 500,
})

const logoutStyle = {
  background: 'transparent',
  border: '1px solid #1e293b',
  color: '#94a3b8',
  padding: '4px 10px',
  borderRadius: 6,
  cursor: 'pointer',
}