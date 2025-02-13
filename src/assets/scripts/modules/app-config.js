const app = {
    isProd: process.env.NODE_ENV === 'production',
    server: process.env.NODE_ENV === 'production'? `https://api.restaurantcollective.io` : `http://localhost:4000`
}
export { app }
