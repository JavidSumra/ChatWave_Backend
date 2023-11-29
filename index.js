const server = require("./src/main");
const PORT = process.env.PORT || 3007;

server.listen(PORT, () => {
  console.log(`Server Started on PORT : ${PORT}`);
});
