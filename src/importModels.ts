import {School} from "./school/domain/entities/school.model";
import {Student} from "./student/domain/entities/student.model";
import {Admin} from "./admin/domain/entities/admin.model";
import {User} from "./users/domain/entities/user.model";
import {PhoneParents} from "./student/domain/entities/phone-parents.model";
import {Menu} from "./menu/domain/entity/menu.model";
import {TypeMenu} from "./typeMenu/domain/entity/type-menu.model";
import {Prices} from "./prices/domain/entity/prices.model";
import {Session} from "./session/domain/entities/session.model";
import {Meals} from "./meals/domain/entity/meals.model";
import {Class} from "./class/domain/entity/class.model";
import {BlockCabinet} from "./block_cabinet/domain/entity/blockCabinet.model";

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
    Session,
    Meals,
    BlockCabinet,
];
