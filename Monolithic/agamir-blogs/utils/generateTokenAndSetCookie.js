import jwt from "jsonwebtoken";

const generateTokenAndSetCookie = (userId, isAdmin, res) => {
  const token = jwt.sign(
    { id: userId, isAdmin: isAdmin },
    process.env.JWT_SECRET,
    {
      expiresIn: "15d",
    }
  );

  res.cookie("access_token", token, {
    httpOnly: true,

    maxAge: 15 * 24 * 60 * 60 * 1000,

    sameSite: "strict",
  });

  return token;
};

export default generateTokenAndSetCookie;
