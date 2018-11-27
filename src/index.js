
const interval = setInterval(() => console.log(`${process.pid} Ping.`), 1000);

const sleep = async ms => new Promise(resolve => setTimeout(() => resolve(), ms));


process.once('SIGUSR2', async () => {
  console.log('Shutting down.');

  clearInterval(interval);

  // Do some async stuff to gracefully shut-down the application.
  await sleep(5000);

  console.log('Done.');

  process.kill(process.pid, 'SIGUSR2');
});
