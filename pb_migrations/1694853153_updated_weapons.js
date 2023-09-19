/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("goxx3nqpjzcck6h")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "mhrwt9sv",
    "name": "restrictionType",
    "type": "bool",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("goxx3nqpjzcck6h")

  // remove
  collection.schema.removeField("mhrwt9sv")

  return dao.saveCollection(collection)
})
