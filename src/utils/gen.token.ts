import jwt from "jsonwebtoken";

//Token generator <string>

function genToken(userId: string) {
  return jwt.sign({ userId }, process.env.JWT_SECRET as string, {
    expiresIn: "12h",
  });
}

export default genToken;
