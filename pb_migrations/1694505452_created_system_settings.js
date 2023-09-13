/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "66wm36vxeos1tc1",
    "created": "2023-09-12 07:57:32.065Z",
    "updated": "2023-09-12 07:57:32.065Z",
    "name": "system_settings",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "77emlnrj",
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
      },
      {
        "system": false,
        "id": "mklupkk4",
        "name": "defaultvalue",
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
      "CREATE INDEX `idx_K0MALaY` ON `system_settings` (`name`)"
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
  const collection = dao.findCollectionByNameOrId("66wm36vxeos1tc1");

  return dao.deleteCollection(collection);
})
