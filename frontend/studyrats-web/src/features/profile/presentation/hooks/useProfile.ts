import { useEffect, useState } from 'react'
import { ProfileApi } from '../../infrastructure/api/ProfileApi'
import { Profile } from '../../domain/types/Profile'

const api = new ProfileApi()

export function useProfile() {
  const [profile, setProfile] =
    useState<Profile | null>(null)

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadProfile()
  }, [])

  async function loadProfile() {
    try {
      const data = await api.getMe()

      setProfile(data)
    } finally {
      setLoading(false)
    }
  }

  async function updateProfile(data: {
    name: string
    email: string
  }) {
    const updated = await api.updateMe(data)

    setProfile((prev) => ({
      ...prev!,
      ...updated,
    }))
  }

  async function uploadAvatar(file: File) {
    const updated = await api.uploadAvatar(file)

    setProfile((prev) => ({
      ...prev!,
      avatarUrl: updated.avatarUrl,
    }))
  }

  return {
    profile,
    loading,
    updateProfile,
    uploadAvatar,
  }
}