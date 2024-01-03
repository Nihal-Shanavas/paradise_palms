const { response } = require("express");
const users = require("../models/userModel");
const jwt = require("jsonwebtoken");
const property = require("../models/propertyModel");
const feedback = require("../models/feedbackModel");

exports.register = async (req, res) => {
  const { userName, email, password } = req.body;

  try {
    const existingUser = await users.findOne({ email });
    if (existingUser) {
      res.status(400).json("user already exitis please login in !!");
    } else {
      const newUser = new users({
        userName,
        email,
        password,
        phoneNumber: "",
        address: "",
        additional: "",
        profile: "",
      });

      await newUser.save();
      res.status(200).json(newUser);
    }
  } catch (err) {
    res.status(401).json(`register api failed ${err}`);
  }

};

exports.login = async (req, res) => {
  console.log(req.body);

  const { email, password } = req.body;

  try {
    const existUser = await users.findOne({ email, password });
    if (existUser) {
      const token = jwt.sign({ _id: existUser._id }, "supersecretkey123");
      console.log(token);

      res.status(200).json({
        user: existUser,
        token,
      });
    } else {
      res.status(404).json("incorrect email or password");
    }
  } catch (err) {
    res.status(401).json(`register api failed ${err}`);
  }
};

exports.editProfile = async (req, res) => {
  const { userName, email, phoneNumber, address, additional, profile } =
    req.body;
  const _id = req.params;
  const profile1 = req.file ? req.file.filename : profile;

  console.log(userName);

  try {
    const selectedUser = await users.findOne({ _id });
    if (selectedUser) {
      selectedUser.userName = userName;
      selectedUser.email = email;
      selectedUser.phoneNumber = phoneNumber;
      selectedUser.address = address;
      selectedUser.additional = additional;
      selectedUser.profile = profile1;

      await selectedUser.save();
      res.status(200).json(selectedUser);
    } else {
      res.status(404).json(`${userName} is not present`);
    }
  } catch {
    res.status(401).json(`update api failed ${err}`);
  }
};

exports.getProfile = async (req, res) => {
  try {
    const userId = req.payload;
    const getprofile = await users.find({ userId });

    res.status(200).json(getprofile);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.addProperty = async (req, res) => {
  const {
    propertyName,
    propertyType,
    bedRooms,
    bathRooms,
    amount,
    address,
    city,
    state,
    squarefeet,
    phone,
    additional,
  } = req.body;

  const userId = req.payload;

  console.log(req.files);

  try {
    const existingProperty = await property.findOne({ propertyName });
    if (existingProperty) {
      return res
        .status(400)
        .json(`${existingProperty.propertyName} is already exist`);
    }

    const propertyImages = [
      req.files[0]?.filename || "",
      req.files[1]?.filename || "",
      req.files[2]?.filename || "",
      req.files[3]?.filename || "",
      req.files[4]?.filename || "",
    ];

    const newProperty = new property({
      propertyName,
      propertyType,
      bedRooms,
      bathRooms,
      amount,
      address,
      city,
      state,
      squarefeet,
      phone,
      additional,
      propertyImage1: propertyImages[0],
      propertyImage2: propertyImages[1],
      propertyImage3: propertyImages[2],
      propertyImage4: propertyImages[3],
      propertyImage5: propertyImages[4],
      userId,
    });

    await newProperty.save();
    res.status(200).json(newProperty);
  } catch (err) {
    res.status(401).json(`property add api failed ${err}`);
  }
};

exports.getUserProperties = async (req, res) => {
  try {
    const userId = req.payload;
    const userProperties = await property.find({
      $or: [
        { userId, $or: [{ sold: null }, { sold: false }] },
        { buyerId: userId },
      ],
    });

    res.status(200).json(userProperties);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getProperty = async (req, res) => {
  try {
    const _id = req.params.id;
    const data = await property.findOne({ _id });

    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.getThreeProperty = async (req, res) => {
  try {
    const userId = req.payload;

    const threeProperty = await property
      .find({ userId: { $ne: userId }, $or: [{ sold: null }, { sold: false }] })
      .limit(3);
    if (threeProperty) {
      res.status(200).json(threeProperty);
    } else {
      res.status(404).json("nothing registered");
    }
  } catch (err) {
    res.status(401).json("property api failed");
  }
};

exports.getAllProperty = async (req, res) => {
  try {
    const userId = req.payload;
    const allProperty = await property.find({
      userId: { $ne: userId },
      $or: [{ sold: null }, { sold: false }],
    });
    console.log(userId);
    allProperty.map((i) => console.log(i.userId));
    if (allProperty) {
      res.status(200).json(allProperty);
    } else {
      res.status(404).json("nothing here");
    }
  } catch (err) {
    res.status(401).json("property api failed");
  }
};
exports.getOneProperty = async (req, res) => {
  try {
    const userId = req.payload;
    const oneProperty = await property
      .find({ userId: { $ne: userId }, $or: [{ sold: null }, { sold: false }] })
      .limit(1);
    if (oneProperty) {
      res.status(200).json(oneProperty);
    } else {
      res.status(404).json("nothing here");
    }
  } catch (err) {
    res.status(401).json("property api failed");
  }
};

exports.deleteProperty = async (req, res) => {
  const { _id } = req.params;

  try {
    const response = await property.deleteOne({ _id });
    if (response) {
      res.status(200).json("project deleted !");
    }
  } catch (err) {
    res.status(401).json(`Project get Api Failed ${err}`);
  }
};

exports.updateProperty = async (req, res) => {
  const { id } = req.params;
  let {
    propertyName,
    propertyType,
    bedRooms,
    bathRooms,
    amount,
    address,
    city,
    state,
    squarefeet,
    phone,
    additional,
    images,
  } = req.body;

  try {
    const existingProperty = await property.findOne({ _id: id });

    if (!existingProperty) {
      return res.status(404).json("Property not found");
    }

    existingProperty.propertyName = propertyName;
    existingProperty.propertyType = propertyType;
    existingProperty.bedRooms = bedRooms;
    existingProperty.bathRooms = bathRooms;
    existingProperty.amount = amount;
    existingProperty.address = address;
    existingProperty.city = city;
    existingProperty.state = state;
    existingProperty.squarefeet = squarefeet;
    existingProperty.phone = phone;
    existingProperty.additional = additional;
    images = images.split(",");
    if (req.files && req.files.length > 0) {
      const propertyImages = req.files.map((file) => file.filename);
      existingProperty.propertyImage1 =
        images[0] == "true"
          ? propertyImages.shift()
          : existingProperty.propertyImage1;
      existingProperty.propertyImage2 =
        images[1] == "true"
          ? propertyImages.shift()
          : existingProperty.propertyImage2;
      existingProperty.propertyImage3 =
        images[2] == "true"
          ? propertyImages.shift()
          : existingProperty.propertyImage3;
      existingProperty.propertyImage4 =
        images[3] == "true"
          ? propertyImages.shift()
          : existingProperty.propertyImage4;
      existingProperty.propertyImage5 =
        images[4] == "true"
          ? propertyImages.shift()
          : existingProperty.propertyImage5;
    }

    await existingProperty.save();

    res.status(200).json(existingProperty);
  } catch (err) {
    console.error(err);
    res.status(500).json("Internal Server Error");
  }
};

exports.addFeedback = async (req, res) => {
  const { feedbacks } = req.body;
  const userId = req.payload;

  try {
    const newFeedback = new feedback({
      feedbacks,
      userId,
    });

    await newFeedback.save();
    res.status(200).json(newFeedback);
  } catch (err) {
    console.error(err);
    res.status(500).json("Internal Server Error");
  }
};

exports.getfeedback = async (req, res) => {
  try {
    const userfeedback = await feedback.find();

    res.status(200).json(userfeedback);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.purchaseProperty = async (req, res) => {
  try {
    const { propertyId } = req.params;
    const userId = req.payload;

    const propertyToPurchase = await property.findById(propertyId);

    if (!propertyToPurchase) {
      return res.status(404).json({ error: "Property not found" });
    }

    propertyToPurchase.sold = true;
    propertyToPurchase.buyerId = userId;

    await propertyToPurchase.save();

    res.status(200).json(propertyToPurchase);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.soldProperty = async (req, res) => {
  try {
    const userId = req.payload;
    const soldProperties = await property.find({ userId, sold: true });

    res.status(200).json(soldProperties);
  } catch {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
