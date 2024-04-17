module.exports = {
  development: {
    client: "postgresql",
    connection: {
      // filename: "./dev.postgresql",
      host: "127.0.0.1",
      port: "5432",
      user: "postgres",
      password: "psql",
     // database: "testdel",
      database: "testot",
    },
    // client: "postgresql",
    // connection: {
    //   // filename: "./dev.postgresql",
    //   host: "127.0.0.1",
    //   port: "5432",
    //   user: "postgres",
    //   password: "123",
    //   database: "service-db",
    // },
  },

  staging: {
    client: "postgresql",
    connection: {
      host: "node12364-khedhri-livraison-test.my.p4d.click",
      port: "5432",
      user: "webadmin",
      password: "BPShav36687",
      database: "DB_TEST",
     
    },
    pool: {
      min: 2,
      max: 10,
    },
  },

  production: {
    client: "postgresql",
    connection: {
      host: "node12364-khedhri-livraison-test.my.p4d.click",
      port: "5432",
      user: "webadmin",
      password: "BPShav36687",
      database: "DB_TEST",
    },
    pool: { 
      min: 2,
      max: 10,
    },
  },
};