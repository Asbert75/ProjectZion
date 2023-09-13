/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("eosd4swfqevnkfn");

  return dao.deleteCollection(collection);
}, (db) => {
  const collection = new Collection({
    "id": "eosd4swfqevnkfn",
    "created": "2023-09-08 18:43:22.599Z",
    "updated": "2023-09-12 11:33:15.761Z",
    "name": "permission",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "951glyq2",
        "name": "name",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "indexes": [
      "CREATE UNIQUE INDEX `idx_dLkRLPV` ON `permission` (`name`)"
    ],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
})
