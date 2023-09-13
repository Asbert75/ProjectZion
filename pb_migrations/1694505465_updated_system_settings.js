/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("66wm36vxeos1tc1")

  collection.name = "systemSettings"
  collection.indexes = [
    "CREATE INDEX `idx_K0MALaY` ON `systemSettings` (`name`)"
  ]

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("66wm36vxeos1tc1")

  collection.name = "system_settings"
  collection.indexes = [
    "CREATE INDEX `idx_K0MALaY` ON `system_settings` (`name`)"
  ]

  return dao.saveCollection(collection)
})
