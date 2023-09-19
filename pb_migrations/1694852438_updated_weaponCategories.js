/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4z7ycauyjak9b16")

  // remove
  collection.schema.removeField("eomyrfsj")

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("4z7ycauyjak9b16")

  // add
  collection.schema.addField(new SchemaField({
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
  }))

  return dao.saveCollection(collection)
})
