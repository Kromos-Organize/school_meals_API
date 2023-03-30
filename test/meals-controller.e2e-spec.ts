import {Test, TestingModule} from "@nestjs/testing";
import {INestApplication, ValidationPipe} from "@nestjs/common";
import request from "supertest";
import {AppModule} from "../src/app.module";
import * as process from "process";
import {TestHelpersClass} from "./helpers/testHelpers";

const cookieParser = require("cookie-parser");

// jest.runAllTimers()

let helper = new TestHelpersClass()

let studentsCounter = 3
let sa = helper.createFakeSA()
let schooladmin = helper.createFakeSchoolAdmin()
let school = helper.createFakeSchool()
let prepod = helper.createFakeUser()
let klass = helper.createFakeClass()
let students = helper.createFakeStudents(studentsCounter)
let typeMenu1 = helper.createFakeTypeMenu()
let typeMenu2 = helper.createFakeTypeMenu()
let typeMenu3 = helper.createFakeTypeMenu()
let menu1 = helper.createFakeMenu()
let menu2 = helper.createFakeMenu()
let menu3 = helper.createFakeMenu()

let classVisits = []


describe("Meals tests (e2e)", () => {
    let app: INestApplication;

    beforeAll(async () => {
        // jest.resetModules()

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


    test("Some test name", async () => {
        // const test = await app.get(Sequelize).query(`select count(*) from public.user`, {plain: true})
        // console.log(test)
        expect(process.env.POSTGRES_HOST).toBe("localhost")
    })

    it(`(POST -> /admin Регистрация SuperAdmin)`, () => {
        return request(app.getHttpServer())
            .post("/admin")
            .send(JSON.stringify(sa.in))
            .set("Content-Type", "application/json")
            .set("Accept", "application/json")
            .expect(201)
            .then((res) => {
                sa.id = res.body.id
                sa.role = res.body.role
                sa.isActive = res.body.isActive
                // console.log(res.body)
            });
    });

    it(`(POST -> /auth/registration Регистрация schooladmin)`, () => {
        return request(app.getHttpServer())
            .post("/auth/registration")
            .send(JSON.stringify(schooladmin.in))
            .set("Content-Type", "application/json")
            .set("Accept", "application/json")
            .expect(201)
            .then((res) => {
                schooladmin.id = res.body.id
                schooladmin.role = res.body.role
                schooladmin.isActive = res.body.isActive
                // console.log(res.body)
            });
    });


    it(`(POST -> /auth/login  LOGIN SuperAdmin)`, () => {
        return request(app.getHttpServer())
            .post("/auth/login")
            .send(JSON.stringify({email: sa.in.email, password: sa.in.password, isAdminDev: true}))
            .set("Content-Type", "application/json")
            .set("Accept", "application/json")
            .set("user-Agent", "deviceTitle")
            .expect(201)
            .then((res) => {
                // console.log(res.body)
                sa.accessToken = res.body.accessToken
                sa.refreshToken = res.headers["set-cookie"][0]
                    .split("=")[1]
                    .split(";")[0];
                // console.log(superadmin)
            });
    });

    it(`(GET -> /user/moderation )`, () => {
        return request(app.getHttpServer())
            .get("/user/moderation")
            .set("Content-Type", "application/json")
            .set("Accept", "application/json")
            .set("Authorization", `Bearer ${sa.accessToken}`)
            .expect(200)
            .then((res) => {
                // console.log(res.body)
            });
    });

    it(`(PUT -> /user/activate/{user_id} )`, () => {
        return request(app.getHttpServer())
            .put(`/user/activate/${schooladmin.id}`)
            .send(JSON.stringify({isActive: true}))
            .set("Content-Type", "application/json")
            .set("Accept", "application/json")
            .set("Authorization", `Bearer ${sa.accessToken}`)
            .expect(200)
            .then((res) => {
                schooladmin.isActive = res.body.isActive
                // console.log(res.body)
            });
    });

    it(`(POST -> /auth/login  LOGIN schoolAdmin)`, () => {
        return request(app.getHttpServer())
            .post("/auth/login")
            .send(JSON.stringify({email: schooladmin.in.email, password: schooladmin.in.password, isAdminDev: false}))
            .set("Content-Type", "application/json")
            .set("Accept", "application/json")
            .set("user-Agent", "deviceTitle")
            .expect(201)
            .then((res) => {
                // console.log(res.body)
                schooladmin.accessToken = res.body.accessToken
                schooladmin.refreshToken = res.headers["set-cookie"][0]
                    .split("=")[1]
                    .split(";")[0];
                // console.log(superadmin)
            });
    });

    it(`(POST -> /school)`, () => {
        return request(app.getHttpServer())
            .post("/school")
            .send(JSON.stringify(school.in))
            .set("Content-Type", "application/json")
            .set("Accept", "application/json")
            .set("Authorization", `Bearer ${schooladmin.accessToken}`)
            .expect(201)
            .then((res) => {
                school.id = res.body.school_id
                klass.in.school_id = res.body.school_id
                typeMenu1.in.school_id = res.body.school_id
                typeMenu2.in.school_id = res.body.school_id
                typeMenu3.in.school_id = res.body.school_id
                menu1.in.school_id = res.body.school_id
                menu2.in.school_id = res.body.school_id
                menu3.in.school_id = res.body.school_id
                // console.log(res.body)
            });
    });

    it(`(POST -> /user/create )`, () => {
        return request(app.getHttpServer())
            .post("/user/create")
            .send(JSON.stringify(prepod.in))
            .set("Content-Type", "application/json")
            .set("Accept", "application/json")
            .set("Authorization", `Bearer ${schooladmin.accessToken}`)
            .expect(201)
            .then((res) => {
                prepod.id = res.body.id
                prepod.role = res.body.role
                // console.log(res.body)
            });
    });

    it(`(POST -> /class )`, async () => {
        return request(app.getHttpServer())
            .post("/class")
            .send(JSON.stringify(klass.in))
            .set("Content-Type", "application/json")
            .set("Accept", "application/json")
            .set("Authorization", `Bearer ${schooladmin.accessToken}`)
            .expect(201)
            .then(async (res) => {
                // console.log(res.body)
                klass.id = res.body.class_id
                for await (const s of students) {
                    s.in.class_id = res.body.class_id;
                    s.in.school_id = res.body.school_id;
                }
            })
    });


    for (const student of students) {

        it(`(POST -> /student )`, () => {
            return request(app.getHttpServer())
                .post("/student")
                .send(JSON.stringify(student.in))
                .set("Content-Type", "application/json")
                .set("Accept", "application/json")
                .set("Authorization", `Bearer ${schooladmin.accessToken}`)
                .expect(201)
                .then((res) => {
                    student.id = res.body.student_id
                });
        });

    }

    it(`(POST -> /type-menu )`, () => {
        return request(app.getHttpServer())
            .post("/type-menu")
            .send(JSON.stringify(typeMenu1.in))
            .set("Content-Type", "application/json")
            .set("Accept", "application/json")
            .set("Authorization", `Bearer ${schooladmin.accessToken}`)
            .expect(201)
            .then((res) => {
                typeMenu1.id = res.body.type_id
                menu1.in.type_id = res.body.type_id
                // console.log(res.body)
            });
    });


    it(`(POST -> /type-menu )`, () => {
        return request(app.getHttpServer())
            .post("/type-menu")
            .send(JSON.stringify(typeMenu2.in))
            .set("Content-Type", "application/json")
            .set("Accept", "application/json")
            .set("Authorization", `Bearer ${schooladmin.accessToken}`)
            .expect(201)
            .then((res) => {
                typeMenu2.id = res.body.type_id
                menu2.in.type_id = res.body.type_id
                // console.log(res.body)
            });
    });

    it(`(POST -> /type-menu )`, () => {
        return request(app.getHttpServer())
            .post("/type-menu")
            .send(JSON.stringify(typeMenu3.in))
            .set("Content-Type", "application/json")
            .set("Accept", "application/json")
            .set("Authorization", `Bearer ${schooladmin.accessToken}`)
            .expect(201)
            .then((res) => {
                typeMenu3.id = res.body.type_id
                menu3.in.type_id = res.body.type_id
                // console.log(res.body)
            });
    });

    it(`(POST -> /menu )`, () => {
        return request(app.getHttpServer())
            .post("/menu")
            .send(JSON.stringify(menu1.in))
            .set("Content-Type", "application/json")
            .set("Accept", "application/json")
            .set("Authorization", `Bearer ${schooladmin.accessToken}`)
            .expect(201)
            .then((res) => {
                menu1.id = res.body.menu_id
                // console.log(res.body)
            });
    });

    it(`(POST -> /menu )`, () => {
        return request(app.getHttpServer())
            .post("/menu")
            .send(JSON.stringify(menu2.in))
            .set("Content-Type", "application/json")
            .set("Accept", "application/json")
            .set("Authorization", `Bearer ${schooladmin.accessToken}`)
            .expect(201)
            .then((res) => {
                menu2.id = res.body.menu_id
                // console.log(res.body)
            });
    });

    it(`(POST -> /menu )`, () => {
        return request(app.getHttpServer())
            .post("/menu")
            .send(JSON.stringify(menu3.in))
            .set("Content-Type", "application/json")
            .set("Accept", "application/json")
            .set("Authorization", `Bearer ${schooladmin.accessToken}`)
            .expect(201)
            .then((res) => {
                menu3.id = res.body.menu_id
                // console.log(res.body)
            });
    });

    it(`(POST -> /meals/student  )`, () => {
        return request(app.getHttpServer())
            .post(`/meals/student`)
            .send(JSON.stringify({student_id: students[0].id, meals: [typeMenu1.id, typeMenu3.id]}))
            .set("Content-Type", "application/json")
            .set("Accept", "application/json")
            .set("Authorization", `Bearer ${schooladmin.accessToken}`)
            .expect(200)
            .then((res) => {
                console.log(res.body)
            });
    });


    it(`(POST -> /meals/student/:student_id )`, () => {
        return request(app.getHttpServer())
            .post(`/meals/student`)
            .send(JSON.stringify({student_id: students[0].id, meals: [12312312, typeMenu1.id]}))
            .set("Content-Type", "application/json")
            .set("Accept", "application/json")
            .set("Authorization", `Bearer ${schooladmin.accessToken}`)
            .expect(404)
            .then((res) => {
                // console.log(res.body)
            });
    });

    // it(`(DELETE -> /meals/student/:student_id  )`, () => {
    //     return request(app.getHttpServer())
    //         .delete(`/meals/student/${students[0].id}`)
    //         .query({date: '2023-03-26'})
    //         .set("Content-Type", "application/json")
    //         .set("Accept", "application/json")
    //         .set("Authorization", `Bearer ${schooladmin.accessToken}`)
    //         // .expect(404)
    //         .then((res) => {
    //             console.log(res.body)
    //         });
    // });

    it(`(GET -> /meals  )`, () => {
        return request(app.getHttpServer())
            .get(`/meals/`)
            .query({date: '2023-03-27'})
            .set("Content-Type", "application/json")
            .set("Accept", "application/json")
            .set("Authorization", `Bearer ${schooladmin.accessToken}`)
            .expect(200)
            .then((res) => {
                // console.log(res.body)
            });
    });

    it(`(GET -> /meals  )`, () => {
        return request(app.getHttpServer())
            .get(`/meals/`)
            // .query({date: '2023-03-26'})
            .set("Content-Type", "application/json")
            .set("Accept", "application/json")
            .set("Authorization", `Bearer ${schooladmin.accessToken}`)
            .expect(200)
            .then((res) => {
                // console.log(res.body)
                
                for (let i = 0; i < studentsCounter; i++) {
                    classVisits.push({
                        student_id: students[i].id,
                        meals: [typeMenu1.id, i % 2 ? typeMenu2.id : typeMenu3.id]
                    })
                }
            });
    });



    it(`(POST -> /meals/class/:class_id )`, () => {
        return request(app.getHttpServer())
            .post(`/meals/class/${klass.id}`)
            .send(JSON.stringify(classVisits))
            .set("Content-Type", "application/json")
            .set("Accept", "application/json")
            .set("Authorization", `Bearer ${schooladmin.accessToken}`)
            .expect(200)
            .then((res) => {
                console.log( res.body)
            });
    });

    // it(`(DELETE -> /meals/class/:class_id )`, () => {
    //     return request(app.getHttpServer())
    //         .delete(`/meals/class/${klass.id}`)
    //         .query({date: '2023-03-29'})
    //         .set("Content-Type", "application/json")
    //         .set("Accept", "application/json")
    //         .set("Authorization", `Bearer ${schooladmin.accessToken}`)
    //         // .expect(200)
    //         .then((res) => {
    //             console.log( res.body)
    //         });
    // });

});
