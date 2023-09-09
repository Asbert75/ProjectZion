/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ms43dlc7ot23fxa")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_KO9DYj4` ON `rolePermissions` (\n  `roleId`,\n  `permissionId`\n)"
  ]

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "6u3kmj7p",
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
  }))

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "ssoe6dlf",
    "name": "permissionId",
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
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("ms43dlc7ot23fxa")

  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_KO9DYj4` ON `rolePermissions` (\n  `field`,\n  `field1`\n)"
  ]

  // update
  collection.schema.addField(new SchemaField({
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
  }))

  // update
  collection.schema.addField(new SchemaField({
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
  }))

  return dao.saveCollection(collection)
})
