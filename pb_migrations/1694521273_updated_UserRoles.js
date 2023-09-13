/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("mmm23w6023kuexk")

  collection.listRule = ""
  collection.viewRule = ""

  // remove
  collection.schema.removeField("kd0qvyyc")

  // remove
  collection.schema.removeField("gndsyeox")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "0gpoen5u",
    "name": "username",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "6x80jdv4",
    "name": "Roles",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("mmm23w6023kuexk")

  collection.listRule = null
  collection.viewRule = null

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "kd0qvyyc",
    "name": "username",
    "type": "text",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "min": null,
      "max": null,
      "pattern": ""
    }
  }))

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "gndsyeox",
    "name": "Roles",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // remove
  collection.schema.removeField("0gpoen5u")

  // remove
  collection.schema.removeField("6x80jdv4")

  return dao.saveCollection(collection)
})
