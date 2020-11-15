module.exports = [
      { name: "admin", permission: [

      	{ name: "dashboard", resource: ["administrator"] },
      	{ name: "administrator:list", resource: ["administrator"] },
      	{ name: "administrator:create", resource: ["administrator"] },
      	{ name: "administrator:edit", resource: ["administrator"] },
      	{ name: "administrator:delete", resource: ["administrator"] },
      	{ name: "administrator:status", resource: ["administrator"] },
            { name: "permissions", resource: ["permissions"] }

      ] },
      { name: "user", permission: [
      	{ name: "dashboard", resource: ["administrator"] }
      ] }
]