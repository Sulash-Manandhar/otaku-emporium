const asyncHandler = require("express-async-handler");

//@desc POST Upload File(images)
//@route POST /api/file/upload
const uploadFile = asyncHandler(async (req, res) => {
  //request's file property
  if (!req.files) {
    res.status(400);
    throw new Error("No file found.");
  }

  //file is (key)reference name
  const file = req.files.file;
  await file.mv(`./client/public/uploads/${file.name}`, (err) => {
    if (err) {
      res.status(500);
      throw new Error(err);
    }
  });
  return res
    .status(200)
    .json({ fileName: file.name, filePath: `/uploads/${file.name}` });
});

module.exports = {
  uploadFile,
};
