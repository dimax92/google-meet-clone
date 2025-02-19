import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatPathname = (path: string) => {
  const segments = path.toLowerCase().split("/").filter(Boolean)

  return segments.map(segment => {
    return segment.split("-").map(word => {
      return word.charAt(0).toUpperCase() + word.slice(1)
    }).join(" ")
  })
}

export function generateRoomId(): string {
  return `${randomString(3)}-${randomString(4)}-${randomString(3)}`
}

export function randomString(length: number): string {
  let result = ""
  const characters = "abcdefghijklmnopqrstuvwxyz0123456789"
  const charactersLength = characters.length
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}