import {Test, TestingModule} from "@nestjs/testing";
import {INestApplication, ValidationPipe} from "@nestjs/common";
import {AppModule} from "../src/app.module";
import {FakeDTO} from "./dbBootstrap/fakeDTO";
import {Sequelize} from "sequelize-typescript";
import {SchoolRepository} from "../src/school/infrastructure/school.repository";
import {ClassRepository} from "../src/class/infrastructure/class.repository";
import {StudentRepository} from "../src/student/infrastructure/student.repository";
import {TypeMenuRepository} from "../src/typeMenu/infrastructure/typeMenu.repository";
import {MenuRepository} from "../src/menu/infrastructure/menu.repository";
import {MealsRepository} from "../src/meals/infrastructure/meals.repository";
import _ from "lodash";

const cookieParser = require("cookie-parser");

const fakers = new FakeDTO()

describe("Bootstrapping db (e2e)", () => {
	let app: INestApplication;
	beforeAll(async () => {
		const moduleFixture: TestingModule = await Test.createTestingModule({
			imports: [AppModule],
		}).compile();
		app = moduleFixture.createNestApplication();
		app.use(cookieParser());
		app.useGlobalPipes(
			new ValidationPipe({
				transform: true,
				stopAtFirstError: true,
				validateCustomDecorators: true,
				validationError: {target: false},
			}),
		);
		await app.init();
	});
	
	test.skip("Drop DB", async () => {
		const seq = app.get(Sequelize)
		await seq.query(`
    	DROP SCHEMA public CASCADE;
			CREATE SCHEMA public;
    `)
	})
	
	let schoolId: number = null
	
	test("Create school", async () => {
		let dto = fakers.makeSchoolCreateDTO()
		const schRep = app.get(SchoolRepository)
		const res = await schRep.createSchool(dto)
		schoolId = res.school_id;
	})
	
	let classIdArr: number[] = []
	
	test("Create 11 classes", async () => {
		const classRep = app.get(ClassRepository)
		for (let i = 1; i < 12; i++) {
			let dto = fakers.makeClassCreateDTO(schoolId, i)
			const res = await classRep.createClass(dto)
			classIdArr.push(res.class_id)
		}
	})
	
	const studentsArr: number[] = []
	
	test("Create 10 students for each class", async () => {
		const studentRep = app.get(StudentRepository)
		for (let i = 0; i < classIdArr.length; i++) {
			for (let j = 0; j < 10; j++) {
				let dto = fakers.makeStudentCreateDTO(schoolId, classIdArr[i])
				const res = await studentRep.createStudent(dto)
				studentsArr.push(res.student_id)
			}
		}
	})
	
	let typeMenuArr: number[] = []
	
	test("Create 5 typeMenu", async () => {
		const typeMenuRepo = app.get(TypeMenuRepository)
		for (let i = 0; i < 5; i++) {
			let dto = fakers.makeTypeMenuDTO(schoolId)
			const res = await typeMenuRepo.createTypeMenu(dto)
			typeMenuArr.push(res.type_id)
		}
	})
	
	let menuArr: number[] = []
	
	test("Create 5 menu from typeMenu", async () => {
		const menyRepo = app.get(MenuRepository)
		for (let i = 0; i < typeMenuArr.length; i++) {
			let dto = fakers.makeMenuDTO(schoolId, typeMenuArr[i])
			const res = await menyRepo.createMenu(dto)
			menuArr.push(res.menu_id)
		}
	})
	
	test("Create student meals visits ", async () => {
		const mealRepo = app.get(MealsRepository)
		for (const student of studentsArr) {
			let mealsMenu = _.sampleSize(menuArr, 3)
			let dto = fakers.makeStudentVisit(student, mealsMenu)
			await mealRepo.addStudentVisit(dto)
		}
	})
	
});
