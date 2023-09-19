/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jqsex815kbg1zku")

  collection.name = "weaponRestrictionTypes"
  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_WouV6aa` ON `weaponRestrictionTypes` (`name`)"
  ]

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("jqsex815kbg1zku")

  collection.name = "weaponRestrictionType"
  collection.indexes = [
    "CREATE UNIQUE INDEX `idx_WouV6aa` ON `weaponRestrictionType` (`name`)"
  ]

  return dao.saveCollection(collection)
})
