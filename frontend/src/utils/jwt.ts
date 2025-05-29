export interface User {
    username: string
    email: string
  }
  
  export function decodeUserFromToken(token: string): User | null {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]))
      return {
        username: payload.username,
        email: payload.email
      }
    } catch {
      return null
    }
  }
  