import { Role } from "src/app/share/enum/role";

export class User {
  id: number;
  name: string;
  email: string;
  password: string;
  role: Role;
}

export class Login {
  name: string;
  password: string;
}
