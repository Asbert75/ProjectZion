/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("2ly9of5ls29ewr4")

  collection.name = "userRole"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("2ly9of5ls29ewr4")

  collection.name = "userRoles"

  return dao.saveCollection(collection)
})
