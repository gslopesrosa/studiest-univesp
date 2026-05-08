import { useAuth } from '@/features/auth/presentation/contexts/AuthContext'
import { NavLink, useNavigate } from 'react-router-dom'

export function Sidebar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/')
  }

  return (
    <aside
      style={{
        width: 240,
        height: '100vh',
        background: '#020617',
        borderRight: '1px solid #1e293b',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: 20,
      }}
    >
      <div>
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                marginBottom: 24,
            }}
            >
            <img
                src="/icon_studyrats.png"
                alt="StudyRats"
                style={{
                width: 36,
                height: 36,
                objectFit: 'contain',
                }}
            />

            <span style={{ fontWeight: 'bold' }}>
                StudyRats
            </span>
        </div>
        <nav style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <NavLink to="/dashboard" style={linkStyle}>
            🏠 Dashboard
          </NavLink>

          <NavLink to="/subjects" style={linkStyle}>
            📚 Disciplinas
          </NavLink>

          <NavLink to="/sessions/new" style={ctaStyle}>
            ➕ Nova Sessão
          </NavLink>
        </nav>
      </div>
      <div>
         <button
          onClick={handleLogout}
          style={{
            width: '100%',
            padding: '10px 12px',
            borderRadius: 8,
            border: '1px solid #1e293b',
            background: 'transparent',
            color: '#94a3b8',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            transition: '0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = '#1e293b'
            e.currentTarget.style.color = 'white'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent'
            e.currentTarget.style.color = '#94a3b8'
          }}
        >
          Sair
      </button>
      </div>
    </aside>
  )
}

const linkStyle = ({ isActive }: { isActive: boolean }) => ({
  color: isActive ? '#f97316' : '#94a3b8',
  textDecoration: 'none',
  padding: '8px 10px',
  borderRadius: 6,
  background: isActive ? '#1e293b' : 'transparent',
})

const ctaStyle = ({ isActive }: { isActive: boolean }) => ({
  background: isActive ? '#ea580c' : '#f97316',
  color: 'white',
  padding: '8px 10px',
  borderRadius: 6,
  textDecoration: 'none',
  marginTop: 10,
})
  
const logoutStyle = {
  background: 'transparent',
  border: '1px solid #1e293b',
  color: '#94a3b8',
  padding: '6px 10px',
  borderRadius: 6,
  cursor: 'pointer',
}