import {SchoolCreateDto} from "../../src/school/domain/dto/school-request.dto";
import {faker} from "@faker-js/faker";
import {CreateClassDto} from "../../src/class/domain/dto/class-request.dto";
import {ClassCategoryEnum} from "../../src/class/domain/dto/class-service.dto";
import {StudentRequestDto} from "../../src/student/domain/dto/student-request.dto";
import {StudentVisitDto} from "../../src/meals/domain/dto/student.visit.dto";
import {CreateTypeMenuDto} from "../../src/typeMenu/domain/dto/typeMenu-request.dto";
import {MenuCreateDto} from "../../src/menu/domain/dto/menu-request.dto";

export class FakeDTO {
	
	 makeSchoolCreateDTO(): SchoolCreateDto {

		 return {
			name: faker.company.bsNoun() + ' N' + faker.random.numeric(2),
			region: faker.address.state(),
			area: faker.address.county(),
			city: faker.address.city(),
			street: faker.address.street(),
			homeNumber: +faker.address.buildingNumber()
		}
	}
	
	makeClassCreateDTO(schoolId: number, classNum: number): CreateClassDto {

		return {
			school_id: schoolId,
			number: classNum,
			type: 'A',
			get category(): ClassCategoryEnum {
				return [1, 2, 3, 4].includes(this.number) ? ClassCategoryEnum.junior : ClassCategoryEnum.elder
			}
		}
	}
	
	makeStudentCreateDTO(schoolId: number, classId: number): StudentRequestDto {

		return {
			 school_id: schoolId,
			 class_id: classId,
			 fname: faker.name.lastName(),
			 name: faker.name.firstName().slice(0, 19),
			 lname: faker.name.middleName(),
			 birthday: faker.date.birthdate(),
			 isLargeFamilies: false,
			 isBudget: false,
			 phoneParents: {
				 f_phone: faker.phone.number().slice(0, 19),
				 m_phone: faker.phone.number().slice(0, 19)
			 }
		 }
	}
	
	makeTypeMenuDTO (schoolId: number): CreateTypeMenuDto{

		return {
			 school_id: schoolId,
			 type_menu: faker.company.bsAdjective()
		 }
	}
	
	makeMenuDTO (schoolId: number, typeId: number): MenuCreateDto{

		return {
			school_id: schoolId,
			type_id: typeId,
			paid_price: +faker.commerce.price(50, 100),
			free_price: +faker.commerce.price(10, 50),
			date: new Date()
		}
	}
	
	makeStudentVisit (studentId: number, allMeals: number[]): StudentVisitDto {

		return {
			 student_id: studentId,
			 meals: allMeals
		 }
	}

}