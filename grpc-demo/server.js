const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const packageDefinition = protoLoader.loadSync('todo.proto', {});
const grpcObject = grpc.loadPackageDefinition(packageDefinition);
const todo = grpcObject.todo;

const server = new grpc.Server();

server.bindAsync('0.0.0.0:40000', grpc.ServerCredentials.createInsecure(), (error, port) => {
    if (error) {
        console.error(error);
        return;
    }
    console.log(`Server running at http://127.0.0.1:${port}`);
});


server.addService(todo.Todo.service, {
    "createTodo": createTodo,
    "readTodos": readTodos,
    "readTodosStream": readTodosStream,

});

const todos = [];
function createTodo(call, callback) {
    const todoItem = {
        id: todos.length + 1,
        text: call.request.text,
    };
    todos.push(todoItem);
    callback(null, todoItem);
}

function readTodos(call, callback) {
    callback(null, { items: todos });
}

function readTodosStream(call, callback) {
    todos.forEach(todo => {
        call.write(todo);
    });
    call.end();
}