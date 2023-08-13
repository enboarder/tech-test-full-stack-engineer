require('dotenv').config();


app.listen(process.env.PORT, () => {
    console.log(`Listening on port: ${process.env.PORT}, wait for the development server to be up...`);
});
