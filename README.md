## Nodemon Issue: Docker + Inspector + Restart

This repo demonstrates and reproduces an [outstanding issue](https://github.com/remy/nodemon/issues/1346) with Nodemon. To reliably produce this issue, the following criteria must be met:

1. Nodemon must be running in a Docker container.
2. The `--inspect` flag must be passed.
3. The application must register an asynchronous listener for the `SIGUSR2` signal to handle shutting down, and this function must take some non-trivial amount of time to run.

When run outside of Docker (ie: conditions 2 and 3 are still met), Nodemon works as expected and will wait for the shutdown handler to finish, and for the process to exit, before starting a new process.

However, when run in Docker, Nodemon will attempt to start a new process immediately, without waiting for the current process to exit. Because we are using the Node debugger, the new process will attempt to open a server on a port that is still in use by the previous process, causing the new process to immediately crash.

To demonstrate the differences between these two behaviors, you may run `npm start` to run this application on the host machine, and `npm run start:docker` to run it in a Docker container.

## Requirements

This was tested with the following software:

```
$ node -v
v10.13.0

$ docker -v
Docker version 18.09.0, build 4d60db4

$ docker-compose -v
docker-compose version 1.23.1, build b02f1306
```
