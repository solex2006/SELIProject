import CourseFilesCollection from "../../../lib/CourseFilesCollection";
import bakery from "openbadges-bakery-v2";
const debake = (img) => {
  return new Promise((resolve, reject) => {
    bakery.extract(img, function (err, data) {
      if (err) {
        return reject(err);
      } else {
        resolve(data);
      }
    });
  });
};
/// this.state.badgeInformation.image._id
const verifyBadge = (imageID) => {
  console.log("verify badge ", imageID);
  let uploadedImage = CourseFilesCollection.findOne({
    _id: imageID,
  });
  let image = uploadedImage.meta.buffer;
  return debake(image)
    .then((data) => {
      return data;
    })
    .catch((err) => {
      console.log(err);
    });
};

export default verifyBadge;
