import { Outlet } from 'react-router-dom'
import { Sidebar } from '@/shared/components/Sidebar'

export function AppLayout() {
  return (
    <div
      style={{
        display: 'flex',
        minHeight: '100vh',
        background: '#020617',
        color: 'white',
      }}
    >
      <Sidebar />

      <main
        style={{
          flex: 1,
          padding: 24,
        }}
      >
        <Outlet />
      </main>
    </div>
  )
}