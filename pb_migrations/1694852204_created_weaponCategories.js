/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "4z7ycauyjak9b16",
    "created": "2023-09-16 08:16:44.490Z",
    "updated": "2023-09-16 08:16:44.490Z",
    "name": "weaponCategories",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "cm97ejnp",
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
      },
      {
        "system": false,
        "id": "eomyrfsj",
        "name": "priority",
        "type": "number",
        "required": true,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "noDecimal": true
        }
      }
    ],
    "indexes": [
      "CREATE UNIQUE INDEX `idx_6laBo7s` ON `weaponCategories` (`name`)"
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
  const collection = dao.findCollectionByNameOrId("4z7ycauyjak9b16");

  return dao.deleteCollection(collection);
})
