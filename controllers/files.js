const path = require("path");
const File = require("../models/file");

exports.postUpload = async (req, res) => {
  //   console.log("BODY---->", req.body);
  //   console.log("FILE---->", req.file);
  try {
    const { title, category } = req.body;
    const { path, mimetype } = req.file;
    const file = new File({
      title,
      category,
      file_path: path,
      file_mimetype: mimetype,
    });
    await file.save();
    res.send("file uploaded successfully.");
  } catch (error) {
    res.status(400).send("Error while uploading file. Try again later.");
  }
};

exports.getAllFiles = async (req, res) => {
  try {
    const { category } = req.body;
    const files = await File.find({ category: category });
    const sortedByCreationDate = files.sort(
      (a, b) => b.createdAt - a.createdAt
    );
    res.send(sortedByCreationDate);
  } catch (error) {
    res.status(400).send("Error while getting list of files. Try again later.");
  }
};

exports.getAllBenefitsFiles = async (req, res) => {
  try {
    const { category } = req.body;
    const files = await File.find({ category: category });
    const sortedByCreationDate = files.sort(
      (a, b) => b.createdAt - a.createdAt
    );
    res.send(sortedByCreationDate);
  } catch (error) {
    res.status(400).send("Error while getting list of files. Try again later.");
  }
};

exports.download = async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    res.set({
      "Content-Type": file.file_mimetype,
    });
    res.sendFile(path.join(__dirname, "..", file.file_path));
  } catch (error) {
    res.status(400).send("Error while downloading file. Try again later.");
  }
};
