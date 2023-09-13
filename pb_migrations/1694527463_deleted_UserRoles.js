/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("mmm23w6023kuexk");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "mmm23w6023kuexk",
    "created": "2023-09-12 11:32:40.360Z",
    "updated": "2023-09-12 12:21:13.327Z",
    "name": "UserRoles",
    "type": "view",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "0gpoen5u",
        "name": "username",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "6x80jdv4",
        "name": "Roles",
        "type": "json",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {}
      }
    ],
    "indexes": [],
    "listRule": "",
    "viewRule": "",
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {
      "query": "SELECT \n  U.id AS [id], U.username, group_concat(R.name) AS [Roles]\nFROM\n  users U\nJOIN userRole UR ON\n  UR.userId = U.id\nJOIN role R ON\n  R.id = UR.roleId\n"
    }
  });

  return Dao(db).saveCollection(collection);
})
