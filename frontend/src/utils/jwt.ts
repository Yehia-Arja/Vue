export interface User {
    email: string
  }
  
  export function decodeUserFromToken(token: string): User | null {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]))
      return {
        email: payload.email
      }
    } catch {
      return null
    }
  }
  