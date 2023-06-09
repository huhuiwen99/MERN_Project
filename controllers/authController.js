import User from '../models/User.js'
import { StatusCodes } from 'http-status-codes';
import { BadRequestError, UnAuthenticatedError } from '../errors/index.js';
import attachCookie from '../utils/attachCookie.js';

const register = async (req, res) => {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
        throw new BadRequestError('Please provide all values.')
    }
    const userAlreadyExists = await User.findOne({email});
    if (userAlreadyExists){
        throw new BadRequestError('Email already in use.')
    }
    const user = await User.create({ name, email, password });

    const token = user.createJWT()
    attachCookie({ res, token });

    res.status(StatusCodes.CREATED).json({
        user: {
            email: user.email, 
            lastName: user.lastName, 
            location: user.location, 
            name: user.name
        }, 
        location: user.location,
    });
}

const login = async (req, res) => {
    // res.send('Login user.');
    const { email, password } = req.body;
    // console.log(email, password);
    if (!email || !password) {
      throw new BadRequestError('Please provide all');
    }
    const user = await User.findOne({ email }).select('+password');
  
    if (!user) {
      throw new UnAuthenticatedError('User not exists');
      // Invalid Credentials
    }
    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      console.log("password not matching")
      throw new UnAuthenticatedError('Password not matching');
    }
    const token = user.createJWT();
    user.password = undefined;
    attachCookie({ res, token });

    res.status(StatusCodes.OK).json({ user, location: user.location });
};

const updateUser = async (req, res) => {
    const { email, name, lastName, location } = req.body;
    if (!email || !name || !lastName || !location) {
      throw new BadRequestError('Please provide all values');
    }
    console.log(email, name, lastName, location)
  
    const user = await User.findOne({ _id: req.user.userId });
    console.log(user)
  
    user.email = email;
    user.name = name;
    user.lastName = lastName;
    user.location = location;
  
    await user.save();
  
    const token = user.createJWT();
    attachCookie({ res, token });

    res.status(StatusCodes.OK).json({ user, location: user.location });
};

const getCurrentUser = async (req, res) => {
  const user = await User.findOne({ _id: req.user.userId });
  res.status(StatusCodes.OK).json({ user, location: user.location });
};

const logout = async (req, res) => {
  res.cookie('token', 'logout', {
    httpOnly: true,
    expires: new Date(Date.now()),
  });
  res.status(StatusCodes.OK).json({ msg: 'user logged out!' });
};

export { register, login, updateUser, getCurrentUser, logout };
