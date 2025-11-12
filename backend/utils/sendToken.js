export const sendToken = (user, statusCode, res) => {
  const token = user.generateJsonWebToken();

  const options = {
    httpOnly: true,
    secure: false,
    sameSite: "strict",
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    message: statusCode === 200 ? "Logged in successfully" : "User registered successfully",
    user
  });
};
