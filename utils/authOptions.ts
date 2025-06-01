import GoogleProvider from 'next-auth/providers/google';
import connectDB from '@/config/database';
import User from '@/models/User';

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      authorization: {
        params: {
          prompt: 'consent',
          access_type: 'offline',
          response_type: 'code',
        }
      }
    }),
    // ...add more providers here
  ],
  callbacks: {
    async signIn({ profile } : { profile: any }) {
      await connectDB();

      const userExists = await User.findOne({ email: profile.email });

      console.log('profile exists', profile);
      console.log('userExists', userExists);

      if (!userExists) {
        const username = profile.name.slice(0, 20);
        await User.create({ email: profile.email, username, image: profile.picture });
      }

      return true;
    },
    async session({ session } : { session: any }) {
      const user = await User.findOne({ email: session.user.email });

      session.user.id = user._id.toString();

      return session;
    }
  }
}