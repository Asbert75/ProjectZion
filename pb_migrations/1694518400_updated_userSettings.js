/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("q56ujd5kwk34qp8")

  collection.name = "userSetting"

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("q56ujd5kwk34qp8")

  collection.name = "userSettings"

  return dao.saveCollection(collection)
})
