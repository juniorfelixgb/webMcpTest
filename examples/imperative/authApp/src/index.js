import User from "./models/user.js";
import { onUserLogin } from "./tools/authTool.js";

const users = await User.loadUsers();
console.log(users);

await onUserLogin(users[0]);