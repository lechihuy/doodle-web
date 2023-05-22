module.exports = {
  apps: [
      {
          name: 'Doodle Web',
          exec_mode: 'cluster',
          instances: 'max',
          script: './.output/server/index.mjs',
          env: {
              "PORT": 3001,
              "BASE_API_URL": "https://api.doodlevn.xyz"
          },
      }
  ]
}