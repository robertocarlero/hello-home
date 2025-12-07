export default () => ({
  supra: {
    baseUrl: process.env.SUPRA_API_URL,
    apiType: process.env.SUPRA_API_TYPE ?? 'public',
    clientSecret: process.env.SUPRA_CLIENT_SECRET,
    clientId: process.env.SUPRA_CLIENT_ID,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
});
