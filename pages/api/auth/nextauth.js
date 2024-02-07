import NextAuth from 'next-auth';

import Providers from 'next-auth/providers';

import { verifyPassword } from '../../../lib/auth';

import { connectToDatabase } from '../../../lib/db';

const authOptions = {

Providers.Credentials({ name: 'Credentials', authorize: async (credentials) => { const client = await connectToDatabase(); const usersCollection = client.db.collection('users');

const user = await usersCollection.findOne({ email: credentials.email, });

if (!user) { client.close(); throw new Error('No user found with this email address.'); }

const isValid = await verifyPassword( credentials.password, user.password );

client.close();

if (!isValid) { throw new Error('Invalid password.'); }

return { email: user.email }; }, }); ],

session: { jwt: true, },

callbacks: { async jwt(token, user) { if (user) { token.id = user.id; } return token; },

async session(session, token) { session.user.id = token.id; return session; }, },

};

export default (req, res) => NextAuth(req, res, authOptions);
