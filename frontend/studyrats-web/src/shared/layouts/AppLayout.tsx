import { Outlet } from 'react-router-dom'
import { Sidebar } from '@/shared/components/Sidebar'

export function AppLayout() {
  return (
    <div
      style={{
        display: 'flex',
        height: '100vh',
        background: '#020617',
        color: 'white',
        overflow: 'hidden',
      }}
    >
      <Sidebar />

      <main
        style={{
          flex: 1,
          padding: 24,
          overflowY: 'auto',
        }}
      >
        <Outlet />
      </main>
    </div>
  )
}