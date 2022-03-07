const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const studyMaterialSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    link: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    source: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    tags: [String],
    contributor: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
studyMaterialSchema.plugin(toJSON);
studyMaterialSchema.plugin(paginate);

/**
 * @typedef StudyMaterial
 */
const StudyMaterial = mongoose.model('study-material', studyMaterialSchema);

module.exports = StudyMaterial;
