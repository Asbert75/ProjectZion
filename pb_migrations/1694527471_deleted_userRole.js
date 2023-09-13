/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("2ly9of5ls29ewr4");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "2ly9of5ls29ewr4",
    "created": "2023-09-08 18:45:04.559Z",
    "updated": "2023-09-12 11:32:59.265Z",
    "name": "userRole",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "kkmekj74",
        "name": "userId",
        "type": "relation",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "_pb_users_auth_",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      },
      {
        "system": false,
        "id": "l9tsxxyx",
        "name": "roleId",
        "type": "relation",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "njrgmqs7dwsu2qx",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      }
    ],
    "indexes": [],
    "listRule": "",
    "viewRule": "",
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
})
