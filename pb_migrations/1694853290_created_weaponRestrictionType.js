/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "jqsex815kbg1zku",
    "created": "2023-09-16 08:34:50.362Z",
    "updated": "2023-09-16 08:34:50.362Z",
    "name": "weaponRestrictionType",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "rgcybmof",
        "name": "name",
        "type": "text",
        "required": true,
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
      "CREATE UNIQUE INDEX `idx_WouV6aa` ON `weaponRestrictionType` (`name`)"
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
  const collection = dao.findCollectionByNameOrId("jqsex815kbg1zku");

  return dao.deleteCollection(collection);
})
