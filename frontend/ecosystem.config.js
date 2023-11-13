module.exports = {
  apps: [
    {
      name: "faucet",
      script: "node_modules/next/dist/bin/next",
      args: "start",
      env: {
        PORT: "3004",
      },
    },
  ],
};
