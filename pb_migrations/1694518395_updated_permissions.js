/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("eosd4swfqevnkfn")

  collection.name = "permission"
  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_dLkRLPV` ON `permission` (`name`)"
  ]

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("eosd4swfqevnkfn")

  collection.name = "permissions"
  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_dLkRLPV` ON `permissions` (`name`)"
  ]

  return dao.saveCollection(collection)
})
