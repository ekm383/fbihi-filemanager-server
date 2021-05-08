// import express from "express";
const express = require("express");
const multer = require("multer");
const router = express.Router();

// middlewares
// TODO

// controllers
const {
  postUpload,
  getAllFiles,
  getAllBenefitsFiles,
  download,
} = require("../controllers/files");

// multer upload function
const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, "./files");
    },
    filename(req, file, cb) {
      cb(null, `${new Date().getTime()}_${file.originalname}`);
    },
  }),
  limits: {
    fileSize: 1000000, // max file size 1MB = 1000000 bytes
  },
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(jpeg|jpg|png|pdf|doc|docx|xlsx|xls)$/)) {
      return cb(
        new Error(
          "only upload files with jpg, jpeg, png, pdf, doc, docx, xslx, xls format."
        )
      );
    }
    cb(undefined, true); // continue with upload
  },
});

router.post("/upload", upload.single("file"), postUpload);
router.post("/getAllFiles", getAllFiles);
router.post("/getAllBenefitsFiles", getAllBenefitsFiles);
router.get("/download/:id", download);

module.exports = router;
