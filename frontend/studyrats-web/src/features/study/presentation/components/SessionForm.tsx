import { useState } from 'react'
import { Subject } from '@/features/subjects/domain/types/Subject'

interface Props {
  subjects: Subject[]
  onSubmit: (data: {
    subjectId: string
    studyDate: string
    durationMinutes: number
    description: string
    didExercises: boolean
    exerciseCount: number
  }) => void
}

export function SessionForm({ subjects, onSubmit }: Props) {
  const [subjectId, setSubjectId] = useState('')

  const [studyDate, setStudyDate] = useState(
    new Date().toISOString().split('T')[0]
  )

  const [durationMinutes, setDurationMinutes] = useState(0)

  const [description, setDescription] = useState('')

  const [didExercises, setDidExercises] = useState(false)

  const [exerciseCount, setExerciseCount] = useState(0)

  return (
    <div
      style={{
        width: '100%',
        padding: '40px 32px',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: 900,
          margin: '0 auto',
          background: 'rgba(15, 23, 42, 0.92)',
          backdropFilter: 'blur(8px)',
          border: '1px solid #1e293b',
          borderRadius: 24,
          padding: 32,
          boxShadow: '0 10px 30px rgba(0,0,0,0.35)',
        }}
      >
        <div style={{ marginBottom: 32 }}>
          <h1
            style={{
              color: 'white',
              fontSize: 36,
              margin: 0,
              marginBottom: 8,
              display: 'flex',
              alignItems: 'center',
              gap: 12,
            }}
          >
            📚 Nova Sessão
          </h1>

          <p
            style={{
              color: '#94a3b8',
              fontSize: 15,
              margin: 0,
            }}
          >
            Registre seus estudos e acompanhe sua evolução.
          </p>
        </div>
        <div
          style={{
            display: 'grid',
            gap: 24,
          }}
        >
          <div>
            <label style={labelStyle}>
              Disciplina
            </label>

            <select
              value={subjectId}
              onChange={(e) => setSubjectId(e.target.value)}
              style={inputStyle}
            >
              <option value="">
                Selecione uma disciplina
              </option>

              {subjects.map((subject) => (
                <option
                  key={subject.id}
                  value={subject.id}
                >
                  {subject.name}
                </option>
              ))}
            </select>
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: 20,
            }}
          >
            <div>
              <label style={labelStyle}>
                Duração (minutos)
              </label>

              <input
                type="number"
                placeholder="60"
                value={durationMinutes}
                onChange={(e) =>
                  setDurationMinutes(
                    Number(e.target.value)
                  )
                }
                style={inputStyle}
              />
            </div>
            <div>
              <label style={labelStyle}>
                Data
              </label>

              <input
                type="date"
                value={studyDate}
                onChange={(e) =>
                  setStudyDate(e.target.value)
                }
                style={inputStyle}
              />
            </div>
          </div>
          <div>
            <label style={labelStyle}>
              Descrição
            </label>

            <textarea
              placeholder="Ex: Estudei álgebra linear e resolução de exercícios"
              value={description}
              onChange={(e) =>
                setDescription(e.target.value)
              }
              style={{
                ...inputStyle,
                minHeight: 140,
                paddingTop: 14,
                resize: 'none',
              }}
            />
          </div>
          <div
            style={{
              background: '#020617',
              border: '1px solid #1e293b',
              borderRadius: 16,
              padding: 20,
            }}
          >
            <label
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                color: 'white',
                fontWeight: 500,
                marginBottom: didExercises
                  ? 18
                  : 0,
              }}
            >
              <input
                type="checkbox"
                checked={didExercises}
                onChange={(e) =>
                  setDidExercises(
                    e.target.checked
                  )
                }
              />

              Fiz exercícios
            </label>

            {didExercises && (
              <input
                type="number"
                placeholder="Quantidade de exercícios"
                value={exerciseCount}
                onChange={(e) =>
                  setExerciseCount(
                    Number(e.target.value)
                  )
                }
                style={inputStyle}
              />
            )}
          </div>
          <button
            onClick={() =>
              onSubmit({
                subjectId,
                studyDate,
                durationMinutes,
                description,
                didExercises,
                exerciseCount,
              })
            }
            style={{
              height: 54,
              background: '#f97316',
              border: 'none',
              borderRadius: 14,
              color: 'white',
              fontSize: 16,
              fontWeight: 700,
              cursor: 'pointer',
              transition: '0.2s',
            }}
          >
            Salvar sessão
          </button>
        </div>
      </div>
    </div>
  )
}

const labelStyle = {
  display: 'block',
  color: '#cbd5e1',
  fontSize: 14,
  marginBottom: 10,
}

const inputStyle = {
  width: '100%',
  height: 50,
  background: '#020617',
  border: '1px solid #1e293b',
  borderRadius: 12,
  padding: '0 14px',
  color: 'white',
  outline: 'none',
  fontSize: 14,
  boxSizing: 'border-box' as const,
}