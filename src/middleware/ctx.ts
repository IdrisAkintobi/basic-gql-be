import { Request } from "express-jwt";
//Adding jwt payload to context
const context = ({ req }: { req: Request }) => {
  const userId = req.auth?.userId;
  return { userId };
};

export default context;
