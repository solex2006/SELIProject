module.exports = {
  servers: {
    one: {
      // TODO: set host address, username, and authentication method
      host: 'localhost',
      username: 'root',
      // pem: './path/to/pem'
      password: 'Seli.2019',
      // or neither for authenticate from ssh-agent
      opts:{
      port: 4422,
      } 
   }
  },

  app: {
    // TODO: change app name and path
    name: 'Seli',
    path: '../',

    servers: {
      one: {},
    },

    buildOptions: {
      serverOnly: true,
    },

    env: {
      // TODO: Change to your app's url
      // If you are using ssl, it needs to start with https://
     // PORT: 80,
      ROOT_URL: 'https://seli.espe.edu.ec',
      MONGO_URL: 'mongodb://localhost/meteor',
     // MONGO_OPLOG_URL: 'mongodb://mongodb/local',
    },

    docker: {
      // change to 'abernix/meteord:base' if your app is using Meteor 1.4 - 1.5
      image: 'abernix/meteord:node-8.11.3-base',
      // image: 'abernix/meteord:node-8.15.1-base',
    },

    // Show progress bar while uploading bundle to server
    // You might need to disable it on CI servers
    enableUploadProgressBar: true
  },

  mongo: {
    version: '3.4.1',
    servers: {
      one: {}
    }
  },

  // (Optional)
  // Use the proxy to setup ssl or to route requests to the correct
  // app when there are several apps

   proxy: {
     domains: 'seli.espe.edu.ec,www.seli.espe.edu.ec',

     ssl: {
       // Enable Let's Encrypt
       //letsEncryptEmail: 'mauro3g@hotmail.com',
crt: './server.crt',
key: './server.key',       
//cer: 'ServerCertificate.cer',
//key: 'cacerts.key',
forceSSL: true
     }
   }
};
