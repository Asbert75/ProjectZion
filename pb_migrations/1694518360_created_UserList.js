/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "mmm23w6023kuexk",
    "created": "2023-09-12 11:32:40.360Z",
    "updated": "2023-09-12 11:32:40.360Z",
    "name": "UserList",
    "type": "view",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "xgflzhwf",
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
        "id": "vcdnzc0v",
        "name": "Roles",
        "type": "json",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {}
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {
      "query": "SELECT \n  U.id AS [id], U.username, group_concat(R.name) AS [Roles]\nFROM\n  users U\nJOIN userRoles UR ON\n  UR.userId = U.id\nJOIN roles R ON\n  R.id = UR.roleId\n"
    }
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("mmm23w6023kuexk");

  return dao.deleteCollection(collection);
})
