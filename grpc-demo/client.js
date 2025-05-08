const grpc = require("@grpc/grpc-js");
const protoLoader = require("@grpc/proto-loader");
const packageDefinition = protoLoader.loadSync("todo.proto", {});
const grpcObject = grpc.loadPackageDefinition(packageDefinition);
const todo = grpcObject.todo;

const text = process.argv[2];
const client = new todo.Todo(
  "localhost:40000",
  grpc.credentials.createInsecure()
);

client.createTodo({ text }, (error, response) => {
  if (error) {
    console.error("Error creating todo:", error);
  } else {
    console.log("Todo created:", response);
  }
});

client.readTodos({}, (error, response) => {
  if (error) {
    console.error("Error reading todos:", error);
  } else {
    console.log("Todos:", response);
  }
});

const call = client.readTodosStream({});
call.on("data", (todo) => {
  console.log("Todo from stream:", todo);
});
call.on("end", () => {
  console.log("Stream ended");
});
call.on("error", (error) => {
  console.error("Stream error:", error);
});
