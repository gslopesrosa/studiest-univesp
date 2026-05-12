import { ChangeEvent, useState } from 'react'
import { useProfile } from '../hooks/useProfile'

export function ProfilePage() {
  const {
    profile,
    loading,
    updateProfile,
    uploadAvatar,
  } = useProfile()

  const [editing, setEditing] = useState(false)

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  if (loading) {
    return (
      <p
        style={{
          color: 'white',
          padding: 24,
        }}
      >
        Carregando...
      </p>
    )
  }

  if (!profile) {
    return (
      <p
        style={{
          color: 'white',
          padding: 24,
        }}
      >
        Perfil não encontrado
      </p>
    )
  }

  async function handleSave() {
    await updateProfile({
      name,
      email,
    })

    setEditing(false)
  }

  async function handleAvatarChange(
    e: ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0]

    if (!file) return

    await uploadAvatar(file)
  }

  return (
    <div
      style={{
        padding: 24,
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 900,
          display: 'flex',
          flexDirection: 'column',
          gap: 24,
        }}
      >
        {/* Header */}
        <div
          style={{
            background: '#0f172a',
            border: '1px solid #1e293b',
            borderRadius: 24,
            padding: 32,
            display: 'flex',
            flexWrap: 'wrap',
            gap: 24,
            alignItems: 'center',
          }}
        >
          {/* Avatar */}
          <div
            style={{
              position: 'relative',
            }}
          >
            {profile.avatarUrl ? (
              <img
                src={profile.avatarUrl}
                alt="Avatar"
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '4px solid #f97316',
                }}
              />
            ) : (
              <div
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: '50%',
                  background: '#f97316',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: 42,
                  fontWeight: 'bold',
                }}
              >
                {profile.name.charAt(0).toUpperCase()}
              </div>
            )}

            <label
              htmlFor="avatar"
              style={{
                position: 'absolute',
                bottom: 0,
                right: 0,
                background: '#f97316',
                width: 36,
                height: 36,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                border: '2px solid #020617',
              }}
            >
              📷
            </label>

            <input
              id="avatar"
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              onChange={handleAvatarChange}
            />
          </div>

          {/* Infos */}
          <div
            style={{
              flex: 1,
              minWidth: 240,
            }}
          >
            {editing ? (
              <>
                <input
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                  placeholder="Nome"
                  style={{
                    width: '100%',
                    padding: 12,
                    marginBottom: 12,
                    borderRadius: 12,
                    border: '1px solid #334155',
                    background: '#020617',
                    color: 'white',
                    fontSize: 16,
                  }}
                />

                <input
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  placeholder="Email"
                  style={{
                    width: '100%',
                    padding: 12,
                    marginBottom: 12,
                    borderRadius: 12,
                    border: '1px solid #334155',
                    background: '#020617',
                    color: 'white',
                    fontSize: 16,
                  }}
                />

                <div
                  style={{
                    display: 'flex',
                    gap: 12,
                  }}
                >
                  <button
                    onClick={handleSave}
                    style={{
                      background: '#f97316',
                      color: 'white',
                      border: 'none',
                      borderRadius: 12,
                      padding: '10px 18px',
                      cursor: 'pointer',
                    }}
                  >
                    Salvar
                  </button>

                  <button
                    onClick={() =>
                      setEditing(false)
                    }
                    style={{
                      background: '#1e293b',
                      color: 'white',
                      border: 'none',
                      borderRadius: 12,
                      padding: '10px 18px',
                      cursor: 'pointer',
                    }}
                  >
                    Cancelar
                  </button>
                </div>
              </>
            ) : (
              <>
                <h1
                  style={{
                    color: 'white',
                    margin: 0,
                    fontSize: 32,
                  }}
                >
                  {profile.name}
                </h1>

                <p
                  style={{
                    color: '#94a3b8',
                    marginTop: 8,
                    marginBottom: 16,
                  }}
                >
                  {profile.email}
                </p>

                <button
                  onClick={() => {
                    setEditing(true)

                    setName(profile.name)
                    setEmail(profile.email)
                  }}
                  style={{
                    background: '#f97316',
                    color: 'white',
                    border: 'none',
                    borderRadius: 12,
                    padding: '10px 18px',
                    cursor: 'pointer',
                  }}
                >
                  ✏️ Editar perfil
                </button>
              </>
            )}
          </div>
        </div>

        {/* Stats */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns:
              'repeat(auto-fit, minmax(220px, 1fr))',
            gap: 20,
          }}
        >
          <div
            style={{
              background: '#0f172a',
              border: '1px solid #1e293b',
              borderRadius: 20,
              padding: 24,
            }}
          >
            <p
              style={{
                color: '#94a3b8',
                marginBottom: 8,
              }}
            >
              ⏱ Tempo estudado
            </p>

            <h2
              style={{
                color: 'white',
                margin: 0,
                fontSize: 32,
              }}
            >
              {profile.stats.totalStudyMinutes} min
            </h2>
          </div>

          <div
            style={{
              background: '#0f172a',
              border: '1px solid #1e293b',
              borderRadius: 20,
              padding: 24,
            }}
          >
            <p
              style={{
                color: '#94a3b8',
                marginBottom: 8,
              }}
            >
              📚 Sessões
            </p>

            <h2
              style={{
                color: 'white',
                margin: 0,
                fontSize: 32,
              }}
            >
              {profile.stats.totalSessions}
            </h2>
          </div>

          <div
            style={{
              background: '#0f172a',
              border: '1px solid #1e293b',
              borderRadius: 20,
              padding: 24,
            }}
          >
            <p
              style={{
                color: '#94a3b8',
                marginBottom: 8,
              }}
            >
              📘 Disciplinas
            </p>

            <h2
              style={{
                color: 'white',
                margin: 0,
                fontSize: 32,
              }}
            >
              {profile.stats.subjectsCount}
            </h2>
          </div>
        </div>
      </div>
    </div>
  )
}