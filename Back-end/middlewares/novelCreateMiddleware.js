const NovelModel = require('../model/novelModel');

const novelExistChecker = async (req, res, next) => {
  try {
    const titleToCheck = req.params.title;
    const idToExclude = req.params.id;

    if (idToExclude) {
      // When updating: check for another novel with the same title (case-insensitive), excluding current novel
      const checkExist = await NovelModel.findOne({
        title: { $regex: new RegExp(`^${titleToCheck}$`, 'i') }, // exact match, case-insensitive
        _id: { $ne: idToExclude }
      });

      if (checkExist) {
        return res.json({ status: false, message: 'Title Already Exist' });
      }
      return next();
    } else {
      // When creating: check if title already exists (case-insensitive)
      const checkExist = await NovelModel.findOne({
        title: { $regex: new RegExp(`^${titleToCheck}$`, 'i') }
      });

      if (checkExist) {
        return res.json({ status: false, message: 'Title Already Exist' });
      }
      return next();
    }
  } catch (error) {
    console.error('Error in novelExistChecker:', error);
    return res.status(500).json({ status: false, message: 'Server error' });
  }
};

module.exports = novelExistChecker;
