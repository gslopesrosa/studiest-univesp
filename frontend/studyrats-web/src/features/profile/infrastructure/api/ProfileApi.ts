import { tokenStorage } from '@/shared/infrastructure/storage/tokenStorage'

export class ProfileApi {
  private baseUrl = 'http://localhost:3333'

  private getHeaders() {
    const token = tokenStorage.get()

    return {
      Authorization: `Bearer ${token}`,
    }
  }

  async getMe() {
    const response = await fetch(
      `${this.baseUrl}/auth/me`,
      {
        headers: this.getHeaders(),
      }
    )

    return response.json()
  }

  async updateMe(data: {
    name: string
    email: string
  }) {
    const response = await fetch(
      `${this.baseUrl}/auth/me`,
      {
        method: 'PUT',
        headers: {
          ...this.getHeaders(),
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    )

    return response.json()
  }

  async uploadAvatar(file: File) {
    const formData = new FormData()

    formData.append('avatar', file)

    const response = await fetch(
      `${this.baseUrl}/auth/avatar`,
      {
        method: 'POST',
        headers: this.getHeaders(),
        body: formData,
      }
    )

    return response.json()
  }
}