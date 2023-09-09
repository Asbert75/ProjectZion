/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "ms43dlc7ot23fxa",
    "created": "2023-09-08 18:44:16.467Z",
    "updated": "2023-09-08 18:44:16.467Z",
    "name": "rolePermissions",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "6u3kmj7p",
        "name": "field",
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
      },
      {
        "system": false,
        "id": "ssoe6dlf",
        "name": "field1",
        "type": "relation",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "collectionId": "eosd4swfqevnkfn",
          "cascadeDelete": false,
          "minSelect": null,
          "maxSelect": 1,
          "displayFields": null
        }
      }
    ],
    "indexes": [
      "CREATE UNIQUE INDEX `idx_KO9DYj4` ON `rolePermissions` (\n  `field`,\n  `field1`\n)"
    ],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("ms43dlc7ot23fxa");

  return dao.deleteCollection(collection);
})
