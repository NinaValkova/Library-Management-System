import { User } from "../db/schemas/users";
import { SafeUser } from "../dto/response/SafeUser";

export class UserMapper {
  static toSafeUser(user: User): SafeUser {
    return {
      id: user.id,
      firstName: user.firstName,
      secondName: user.secondName,
      username: user.username,
      email: user.email,
      role: user.role,
      birthNumber: user.birthNumber ?? null,
      createdAt: user.createdAt,
    };
  }
}