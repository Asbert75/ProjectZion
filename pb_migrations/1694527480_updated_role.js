/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("njrgmqs7dwsu2qx")

  collection.name = "roles"
  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_G1inQMT` ON `roles` (`name`)"
  ]

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("njrgmqs7dwsu2qx")

  collection.name = "role"
  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_G1inQMT` ON `role` (`name`)"
  ]

  return dao.saveCollection(collection)
})
