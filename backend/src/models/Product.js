const mongoose = require('mongoose');
const slugify = require('slugify');

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
      minlength: [10, 'Product name can not be less than 10 characters'],
      maxlength: [50, 'Product name can not be more than 50 characters'],
      unique: true,
    },
    slug: String,
    description: {
      type: String,
      required: [true, 'Please add a description'],
      minlength: [10, 'Product description can not be less than 10 characters'],
      maxlength: [500, 'Product description can not be more than 500 characters'],
    },
    author: {
      type: String,
      required: [true, 'Please add an author'],
    },
    price: {
      type: Number,
      required: [true, 'Please add a price'],
    },
    image_path: {
      type: String,
      default:
        'https://file-examples.com/storage/fe4e1227086659fa1a24064/2017/10/file_example_JPG_100kB.jpg',
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// Create product slug from the name
ProductSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

module.exports = mongoose.model('Product', ProductSchema);
