const isAuthenticatedUser = async (req, res, next) => {
  try {
    // here we could authorize the requested user, but for now im bypassing the authorization
    if (true) {
      next();
    } else {
      return res.status(401).send();
    }
  } catch (error) {
    return res
      .status(500)
      .send({ msg: "something went wrong during user authentication" });
  }
};

module.exports = isAuthenticatedUser;
