/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("mmm23w6023kuexk")

  collection.name = "UserRoles"
  collection.options = {
    "query": "SELECT \n  U.id AS [id], U.username, group_concat(R.name) AS [Roles]\nFROM\n  users U\nJOIN userRole UR ON\n  UR.userId = U.id\nJOIN role R ON\n  R.id = UR.roleId\n"
  }

  // remove
  collection.schema.removeField("xgflzhwf")

  // remove
  collection.schema.removeField("vcdnzc0v")

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

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("mmm23w6023kuexk")

  collection.name = "UserList"
  collection.options = {
    "query": "SELECT \n  U.id AS [id], U.username, group_concat(R.name) AS [Roles]\nFROM\n  users U\nJOIN userRoles UR ON\n  UR.userId = U.id\nJOIN roles R ON\n  R.id = UR.roleId\n"
  }

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "xgflzhwf",
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
    "id": "vcdnzc0v",
    "name": "Roles",
    "type": "json",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {}
  }))

  // remove
  collection.schema.removeField("kd0qvyyc")

  // remove
  collection.schema.removeField("gndsyeox")

  return dao.saveCollection(collection)
})
