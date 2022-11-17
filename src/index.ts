import app from "./app";
import connectDB from "./database/db";

//Set port
const PORT = process.env.PORT || 5000;

//Connect to database
connectDB();

//Start listening
app.listen(PORT, () =>
  console.log(`🚀 Apollo server ready at http://localhost:${PORT}`)
);
