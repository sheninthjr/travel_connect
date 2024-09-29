import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

const handler = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_ID as string,
      clientSecret: process.env.GOOGLE_SECRET as string,
    }),
  ],
  callbacks: {
    async session({ session }) {
      try {
        if (session) {
          // Database login
        }
      } catch (e) {
        console.error("Error while storing the user in the database", e);
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };
