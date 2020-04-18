// Pass all configuration settings to AdminBro
const AdminBro = require("admin-bro");
const User = require("../models/User");
const Product = require("../models/Product");
// Admin
AdminBro.registerAdapter(require("admin-bro-mongoose"));

const adminBro = new AdminBro({
  resources: [
    {
      resource: Product,
    },
    {
      resource: User,
      options: {
        properties: {
          password: {
            isVisible: false,
          },
          password: {
            type: "string",
            isVisible: {
              list: false,
              edit: true,
              filter: false,
              show: false,
            },
          },
        },
        actions: {
          new: {
            before: async (request) => {
              if (request.payload.record.password) {
                request.payload.record = {
                  ...request.payload.record,
                  password: await bcrypt.hash(
                    request.payload.record.password,
                    10
                  ),
                  password: undefined,
                };
              }
              return request;
            },
          },
        },
      },
    },
  ],
  rootPath: "/admin",
});
module.exports = adminBro;
