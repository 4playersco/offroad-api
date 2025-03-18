import bcrypt from "bcryptjs";
import { HASH_SECRET } from "../constants";

const getHash = async (pw: string) => {
  const salt = await bcrypt.hash(HASH_SECRET, 10);
  return bcrypt.hash(pw, salt);
};

export default getHash;
