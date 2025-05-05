const argon2 = require("argon2");
const {
  createUser,
  getUserByEmail,
  getUserById,
  // getUser,
  getAllUsers,
  // filterUsers,
  deleteUser,
  updateUserRole,
  filterUsersByStatus
} = require("../models/userModel");
const jwt = require("jsonwebtoken");
const AppError = require("../utilities/appError");



const signToken = (id) => {
  const token = jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return token;
};

const sendCookie = (token, res) => {
  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    //cookio nesimatys narsyklej, neprieis js kodas, tik uzklausa matys
  };
  res.cookie("jwt", token, cookieOptions);
};

exports.signToken = signToken;
exports.sendCookie = sendCookie;

exports.signup = async (req, res, next) => {
  try {
    const newUser = req.body;
    newUser.password = await argon2.hash(newUser.password);

    newUser.role = "user";
    const createdUser = await createUser(newUser);

    // if(!createdUser) throw new AppError('User not created', 500);

    //logins after sign up
    const token = signToken(createdUser.id);
    //issiunciame cookie su token
    sendCookie(token, res);
    createdUser.password = undefined;
    createdUser.id = undefined;

    res.status(201).json({
      status: "success",
      data: createdUser,
    });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email } = req.body;
    const user = await getUserByEmail(email);

    const token = signToken(user.id);
    sendCookie(token, res);

    user.password = undefined;
    user.id = undefined;

    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

exports.protect = async (req, res, next) => {
  try {
    const token = req.cookies?.jwt;

    if (!token) {
      throw new AppError(
        "You are not logged in. Please login to get access",
        401
      );
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const currentUser = await getUserById(decoded.id);

    if (!currentUser) {
      throw new AppError(
        "The user belonging to this token does no longer exist",
        404
      );
    }
    req.user = currentUser;
    next();
  } catch (error) {
    next(error);
  }
};

exports.allowAccessTo = (...roles) => {
  return (req, res, next) => {
    try {
      if (!roles.includes(req.user.role)) {
        throw new AppError(
          "You do not have permission to perform this action",
          403
        );
      }
      next();
    } catch (error) {
      next(error);
    }
  };
};

exports.logout = (req, res) => {
  return res.clearCookie("jwt").status(200).json({
    message: "You are logged out",
  });
};

exports.getAuthenticatedUser = async (req, res, next) => {
  try {
    const authUser = req.user;
    authUser.password = undefined;
    res.status(200).json({
      status: "success",
      data: authUser,
    });
  } catch (error) {
    next(error);
  }
};

  exports.me = async (req, res, next) => {
    const { id } = req.params;
    try {
      const user = await getUser(id);
      res.status(200).json({
        status: "success",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  };



  exports.getUser = async (req, res, next) => {
    const { id } = req.params;
    try {
      const user = getUser(id);
      res.status(200).json({
        status: "success",
        data: user,
      });
    } catch (error) {
      next(error);
    }
  };

  exports.getAllUsers = async (req, res, next) => {
    try {
      const users = await getAllUsers();
  
      res.status(200).json({
        status: "success",
        allUsers: users,
      });
    } catch (error) {
      next(error);
    }
  };

  exports.deleteThisUser = async (req, res, next) => {
    const { id } = req.params;
    try {
      await deleteUser(id);
      res.status(200).send();
    } catch (error) {
      next(error);
    }
  };


  exports.filterUsersByRole = async (req, res, next) => {
    try {
      let { role, page, limit } = req.query;
  
      let filter = null;
      page = parseInt(page, 10) || 1;
      limit = parseInt(limit, 10) || 5;
  
      if (isNaN(page) || page < 1 || isNaN(limit) || limit < 1) {
        return res.status(400).json({
          status: "error",
          message: "Invalid page or limit values",
        });
      }
  
      const offset = (page - 1) * limit;
  
      if (!filter && role) {
        filter = { role: role.trim().toUpperCase() };
      } else if (typeof filter === "string") {
        try {
          filter = JSON.parse(filter);
        } catch (error) {
          return res.status(400).json({
            status: "error",
            message: "Invalid filter format",
          });
        }
      }
  
      const filteredUsers = await filterUsers(filter, limit, offset);
  
      console.log("Filtered Users:", filteredUsers);
  
      res.status(200).json({
        status: "success",
        data: filteredUsers,
      });
    } catch (error) {
      next(error);
    }
  };

  exports.updateUserRole = async (req, res, next) => {
    const { id } = req.params;
    const { role } = req.body;
  
    try {
      const updatedUser = await updateUserRole(id, role);
  
      if (!updatedUser) {
        return res.status(404).json({
          status: "error",
          message: "User not found",
        });
      }
  
      res.status(200).json({
        status: "success",
        data: updatedUser,
      });
    } catch (error) {
      next(error);
    }
  };

exports.filterUsersByStatus = async (req, res, next) => {
  try {
    let { status, page, limit } = req.query;

    let filter = null;
    page = parseInt(page, 10) || 1;
    limit = parseInt(limit, 10) || 5;

    if (isNaN(page) || page < 1 || isNaN(limit) || limit < 1) {
      return res.status(400).json({
        status: "error",
        message: "Invalid page or limit values",
      });
    }

    const offset = (page - 1) * limit;

    if (!filter && status) {
      filter = { status: status.trim().toUpperCase() };
    } else if (typeof filter === "string") {
      try {
        filter = JSON.parse(filter);
      } catch (error) {
        return res.status(400).json({
          status: "error",
          message: "Invalid filter format",
        });
      }
    }
  

    const filteredUsers = await filterUsersByStatus(filter, limit, offset);

    console.log("Filtered Users:", filteredUsers);

    res.status(200).json({
      status: "success",
      data: filteredUsers,
    });
  } catch (error) {
    next(error);
  }
};

