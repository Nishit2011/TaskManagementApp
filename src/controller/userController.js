const User = require("../models/user");
const { sendAccountConfirmationMail } = require("../emails/account");
const ErrorResponse = require("../utils/ErrorResponse");

exports.addUser = async (req, res, next) => {
  const user = await new User(req.body);
  try {
    await user.save();
    await sendAccountConfirmationMail(user.email, user.name);
    const token = await user.getAuthToken();
    res.status(201).send({ user, token });
  } catch (error) {
    next(new ErrorResponse("Cannot add user", 401))
  }
};

exports.loginUser = async (req, res, next) => {
  try {
    //We are creating a new method on User model because we want this method to be applied to the collection and not restrict it to only a single user
    const user = await User.findUserByLoginPassword(
      req.body.email,
      req.body.password
    );
    const token = await user.getAuthToken();

    res.send({ user, token });
  } catch (error) {
   next(error)
  }
};

exports.logoutUser = async (req, res, next) => {
  try {
    req.user.tokens = await req.user.tokens.filter(
      (token) => token.token !== req.token
    );

    await req.user.save();
    console.log(req.user);
    res.send();
  } catch (error) {
    next(error)
  }
};

exports.logoutAll = async (req, res, next) => {
  try {
    req.user.tokens = [];
    await req.user.save();
    res.send();
  } catch (error) {
    next(error)
  }
};

exports.getMe = async (req, res) => {
  res.send(req.user);
};

// exports.getUserById = async(req,res)=>{
//     try {
//         const user = await User.findById(req.params.id);
//         if(!user) return res.status(400).send()
//         res.status(200).send({name:user.name})
//     } catch (error) {
//         res.status(500).send()
//     }

// }

exports.updateUser = async (req, res, next) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["name", "email", "password", "isIndian"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates" });
  }
  try {
    const user = await User.findById(req.user._id);
    updates.forEach((update) => (user[update] = req.body[update]));
    await user.save();

    res.status(200).send(user);
  } catch (error) {
    next(error)
  }
};

exports.deleteUser = async (req, res, error) => {
  try {
    await req.user.remove();
    sendAccountDeletionMail(req.user.email, req.user.name);
    res.status(200).send();
  } catch (error) {
    next(error)
  }
};
// GET //user/getTasks?isCompleted=true
// GET /user/getTasks?limit=2&skip=3
exports.getOwnTasks = async (req, res, next) => {
  const match = {};
  const sort = {};
  if (req.query.isCompleted) {
    match.isCompleted = req.query.isCompleted === "true";
  }
  const sortByParams = req.query.sortBy;
  // const sortByFieldName = sortByParams.split(":")[0];
  // const sortCriteria = sortByParams.split(":")[1] === "asc"? 1: -1;
  // console.log(sortByFieldName, sortCriteria)

  if (sortByParams) {
    const parts = req.query.sortBy.split(":");
    sort[parts[0]] = parts[1] === "desc" ? -1 : 1;
  }

  try {
    await req.user
      .populate({
        path: "tasks",
        match,
        options: {
          limit: parseInt(req.query.limit),
          skip: parseInt(req.query.skip),
          sort,
        },
      })
      .execPopulate();
    res.send(req.user.tasks);
  } catch (error) {
    rnext(error)
  }
};
