import NextAuth from "next-auth"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google,
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // In a real app, query Prisma and bcrypt verify
        if (credentials?.email === "user@example.com" && credentials?.password === "password") {
          return { id: "1", name: "Demo User", email: "user@example.com" }
        }
        return null
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
})
