import {School} from "./school/domain/entities/school.model";
import {Student} from "./student/domain/entities/student.model";
import {Admin} from "./admin/domain/entities/admin.model";
import {Class} from "./class/domain/entities/class.model";
import {User} from "./users/domain/entities/user.model";

export const allModels = [Admin, User, School, Student, Class];
