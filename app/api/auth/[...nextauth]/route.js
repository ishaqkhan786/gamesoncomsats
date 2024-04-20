import NextAuth from "next-auth";
import { connectToDatabase } from "@/lib/database";
import { confirmPassword } from "@/lib/hashPass";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "@/lib/database/models/user.model";

export const authOptions = {
  session: {
    strategy: "jwt",
  },

  secret: "my-secret-123",
  providers: [
    CredentialsProvider({
      // The name to display on the sign in form (e.g. 'Sign in with...')
      name: "Credentials",
      id: "credentials",
      credentials: {
        email: {},
        username: {},
        password: {},
        role: {},
      },
      async authorize(credentials) {
        const { email, password, } = credentials

        await connectToDatabase();
        const user = await User.findOne({ email });
        if (!user) {
          throw new Error("Wrong Credentials ");
        }
        console.log('user found', user);
    
        const isValid = await confirmPassword(password, user.password);
        if (!isValid) {
          throw new Error("Wrong Credentials");
        }
        return {
          id: user._id,
          email: user.email,
          name: user.username,
          role: user.role,
          address:user.address,
        };
      },
    }),
  ],
  callbacks: {
    async session({ session }) {
      await connectToDatabase();
      const userData = await User.findOne({
        email: session.user?.email,
      });

      session.user.id = userData?._id;
      session.user.firstName = userData?.firstName;
      session.user.lastName = userData?.lastName;
      session.user.role = userData.role;
      session.user.address = userData.address;

      return session;
    },
  },
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };