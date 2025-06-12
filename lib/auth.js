import CredentialsProvider from "next-auth/providers/credentials";
import User from "./models/User.js";
import bcrypt from "bcrypt";
export const authOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "your@email.com" },
        password: { label: "Password", type: "password" },
      },
 async authorize(credentials, req) {
  if (req.method === "POST" && req.body?.action === "login") {
    if (!credentials?.email || !credentials?.password) {
      console.log('Missing credentials');
      return null;
    }

    const user = await User.findOne({ email: credentials.email }).select("+password");
    if (!user) {
      console.log('User not found');
      return null;
    }
    if (!user.isActive) {
      console.log('User inactive');
      return null;
    }

   
    // Debugging password comparison
    const isValidPassword = await user.comparePassword(credentials.password);
    console.log('Password comparison result:', isValidPassword);
    if (!isValidPassword) {
      console.log('Invalid password');
      return null;
    }
    user.lastLogin = new Date();
    await user.save();

    return {
      id: user._id.toString(),
      email: user.email,
      name: user.name,
      role: user.role,
    };
  }

  return null;
}
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
    signOut: "/logout",
    error: "/login?error=Unauthorized",
    newUser: "/admin", // Redirect after first sign up
  },
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  events: {
    async createUser({ user }) {
      // Send welcome email or perform other post-signup actions
      console.log(`New user created: ${user.email}`);
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
};