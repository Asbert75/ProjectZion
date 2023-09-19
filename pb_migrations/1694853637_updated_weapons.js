/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("goxx3nqpjzcck6h")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "fnagts9b",
    "name": "restrictionType",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "jqsex815kbg1zku",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("goxx3nqpjzcck6h")

  // update
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "fnagts9b",
    "name": "restrictionType",
    "type": "relation",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "jqsex815kbg1zku",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
})
