/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("goxx3nqpjzcck6h")

  // remove
  collection.schema.removeField("szgbm6ql")

  // add
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
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("goxx3nqpjzcck6h")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "szgbm6ql",
    "name": "restrictionType",
    "type": "number",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": 0,
      "max": 2,
      "noDecimal": true
    }
  }))

  // remove
  collection.schema.removeField("fnagts9b")

  return dao.saveCollection(collection)
})
