import {School} from "./school/domain/entities/school.model";
import {Student} from "./student/domain/entities/student.model";
import {Admin} from "./admin/domain/entities/admin.model";
import {Class} from "./class/domain/entities/class.model";
import {User} from "./users/domain/entities/user.model";
import {PhoneParents} from "./student/domain/entities/phone-parents.model";
import {Menu} from "./menu/domain/entity/menu.model";
import {TypeMenu} from "./typeMenu/domain/entity/type-menu.model";
import {Prices} from "./prices/domain/entity/prices.model";
import {CalcClassMenu} from "./calculate/domain/entity/calcClassMenu.model";
import {CalcClassSum} from "./calculate/domain/entity/calcClassSum.model";
import {CalcSchoolSum} from "./calculate/domain/entity/calcSchoolSum.model";

export const allModels = [
    Admin,
    User,
    School,
    Student,
    Class,
    PhoneParents,
    Menu,
    TypeMenu,
    Prices,
    CalcClassMenu,
    CalcClassSum,
    CalcSchoolSum,
];
