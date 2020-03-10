import app from './app';

const server = app.listen(app.get("port"), () => {
  console.log('App is running on port ::%d', app.get("port"));
  console.log('Press CTRL - C to stop the server');
})

export default server;