/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("goxx3nqpjzcck6h")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "nmitbndj",
    "name": "price",
    "type": "number",
    "required": true,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "noDecimal": true
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("goxx3nqpjzcck6h")

  // remove
  collection.schema.removeField("nmitbndj")

  return dao.saveCollection(collection)
})
