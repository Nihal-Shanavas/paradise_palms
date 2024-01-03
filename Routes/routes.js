const express = require("express");
const router = new express.Router();
const user = require("../controllers/userControle");
const upload = require("../middlewares/multerMiddleware");
const { jwtMiddleware } = require("../middlewares/jwtmiddleware");

//register
router.post("/user/register", user.register);
//login
router.post("/user/login", user.login);
//update
router.put(
  "/user/update-profile/:_id",
  jwtMiddleware,
  upload.single("profile"),
  user.editProfile
);

// get profile

router.get("/user/get-profile", jwtMiddleware, user.getProfile);

router.get("/user/property/:id", jwtMiddleware, user.getProperty);

// add new property
router.post(
  "/user/add-property",
  jwtMiddleware,
  upload.array("propertyImage", 5),
  user.addProperty
);

router.get("/user/properties", jwtMiddleware, user.getUserProperties);

// 3
router.get("/user/get-three-properties", jwtMiddleware, user.getThreeProperty);

// all

router.get("/user/all-property", jwtMiddleware, user.getAllProperty);

// one

router.get("/user/one-property", jwtMiddleware, user.getOneProperty);

// delete property

router.delete("/user/delete-property/:_id", jwtMiddleware, user.deleteProperty);

// update property
router.put(
  "/user/update-property/:id",
  jwtMiddleware,
  upload.array("propertyImage", 5),
  user.updateProperty
);

// add feedback

router.post(
  "/user/add-feedback",
  jwtMiddleware,
  upload.single("userImage"),
  user.addFeedback
);

// get feedback
router.get("/user/get-feedback", jwtMiddleware, user.getfeedback);

router.put(
  "/user/purchase-property/:propertyId",
  jwtMiddleware,
  user.purchaseProperty
);

router.get("/user/sold-property/", jwtMiddleware, user.soldProperty);

module.exports = router;
