import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import clientPromise from "../../../lib/mongodb"
import { MongoClient } from "mongodb"
import bcrypt from "bcryptjs" 

const authOptions = {
	providers: [
		CredentialsProvider({
			name: "Credentials",
			credentials: {
				email: { label: "Email", type: "email", placeholder: "jsmith@example.com" },
				password: { label: "Password", type: "password" },
			},
			async authorize(credentials) {
				const client: MongoClient = await clientPromise
				const db = client.db("GFIT")
				const user = await db.collection("users").findOne({ email: credentials?.email })
				if (!user) {
					throw new Error("No user found with the provided email")
				}
				
				const isValid = await bcrypt.compare(credentials?.password || "", user.password)
				if (!isValid) {
					throw new Error("Incorrect password. Please try again.")
				}
				return {
					id: user._id,
					email: user.email,
					fullName: user.fullName,
					weight: user.weight,
					fitnessLevel: user.fitnessLevel,
				}
			},
		}),
	],
	session: { strategy: "jwt" },
	secret: process.env.NEXTAUTH_SECRET,
	callbacks: {
		async jwt({ token, user }) {
			if (user) {
				token.id = user.id
				token.email = user.email
				token.fullName = user.fullName
				token.weight = user.weight
				token.fitnessLevel = user.fitnessLevel
			}
			return token
		},
		async session({ session, token }) {
			session.user = {
				id: token.id,
				email: token.email,
				fullName: token.fullName,
				weight: token.weight,
				fitnessLevel: token.fitnessLevel,
			}
			return session
		},
	},
}

const handler = NextAuth(authOptions)
export { handler as GET, handler as POST }
