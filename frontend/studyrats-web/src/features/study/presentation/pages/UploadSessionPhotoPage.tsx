import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { StudySessionApi } from '../../infrastructure/api/StudySessionApi'

const api = new StudySessionApi()

export function UploadSessionPhotoPage() {
  const { id } = useParams()

  const navigate = useNavigate()

  const [photo, setPhoto] = useState<File | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleUpload() {
    if (!photo || !id) return

    try {
      setLoading(true)

      await api.uploadPhoto(id, photo)

      alert('Foto enviada com sucesso!')

      navigate('/dashboard')
    } catch {
      alert('Erro ao enviar foto')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 500,
          background: '#0f172a',
          border: '1px solid #1e293b',
          borderRadius: 16,
          padding: 24,
        }}
      >
        <h1
          style={{
            color: 'white',
            marginBottom: 12,
          }}
        >
          📸 Upload da sessão
        </h1>

        <p
          style={{
            color: '#94a3b8',
            marginBottom: 24,
          }}
        >
          Adicione uma foto do seu estudo.
        </p>

        <input
          type="file"
          accept="image/*"
          onChange={(e) => {
            const file = e.target.files?.[0]

            if (file) {
              setPhoto(file)
            }
          }}
          style={{
            marginBottom: 24,
            color: 'white',
          }}
        />

        <div
          style={{
            display: 'flex',
            gap: 12,
          }}
        >
          <button
            onClick={handleUpload}
            disabled={!photo || loading}
            style={{
              flex: 1,
              padding: 12,
              borderRadius: 8,
              border: 0,
              background: '#f97316',
              color: 'white',
              cursor: 'pointer',
            }}
          >
            {loading ? 'Enviando...' : 'Enviar foto'}
          </button>

          <button
            onClick={() => navigate('/dashboard')}
            style={{
              flex: 1,
              padding: 12,
              borderRadius: 8,
              border: '1px solid #334155',
              background: 'transparent',
              color: '#94a3b8',
              cursor: 'pointer',
            }}
          >
            Pular
          </button>
        </div>
      </div>
    </div>
  )
}