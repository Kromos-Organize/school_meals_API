import {addYears} from "date-fns";

export class TestHelpersClass {
    createRandomString = (length: number) => {
        let result = "";
        const characters =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        let counter = 0;
        while (counter < length) {
            result += characters.charAt(
                Math.floor(Math.random() * characters.length),
            );
            counter += 1;
        }
        return result;
    };

    createFakeSA = () => {
        return {
            in: {
                email: this.createRandomString(5) + "@mail.ru",
                password: this.createRandomString(8),
                fname: this.createRandomString(10),
                name: this.createRandomString(10),
                position: this.createRandomString(5),
                chat_number: this.createRandomString(10)
            },
            accessToken: null,
            refreshToken: null,
            id: null,
            role: null,
            isActive: null
        }
    };

    createFakeSchoolAdmin = () => {
        return {
            in: {
                email: this.createRandomString(5) + "@mail.ru",
                password: this.createRandomString(8),
                phone: "(29)-748-58-75"
            },
            accessToken: null,
            refreshToken: null,
            id: null,
            role: null,
            isActive: null
        }
    };

    createFakeUser = () => {
        return {
            in: {
                email: this.createRandomString(5) + "@mail.ru",
                password: this.createRandomString(8),
                phone: "(29)-748-58-75"
            },
            accessToken: null,
            refreshToken: null,
            id: null,
            role: null,
            isActive: null
        }
    };

    createFakeSchool = () => {
        return {
            in: {
                name: this.createRandomString(15),
                region: this.createRandomString(8),
                area: this.createRandomString(8),
                city: this.createRandomString(8),
                street: this.createRandomString(8),
                homeNumber: Math.floor(Math.random() * 10) + 1
            },
            id: null,
        }
    };

    createFakeClass = () => {
        return {
            in: {
                school_id: null,
                number: Math.floor(Math.random() * 10) + 1,
                type: this.createRandomString(1)
            },
            id: null,
        }
    };

    createFakeStudents = (count: number) => {
        const students = []
        for (let i = 0; i < count; i++) {
            students.push({
                in: {
                    school_id: null,
                    class_id: null,
                    fname: this.createRandomString(10),
                    name: this.createRandomString(10),
                    lname: this.createRandomString(10),
                    birthday: addYears(new Date(), -Math.floor(Math.random() * 10 + 7)),
                    isLargeFamilies: false,
                    isBudget: false,
                    phoneParents: {m_phone: "375297485875", f_phone: "375297485875"}
                },
                id: null
            })
        }
        return students
    };


    createFakeTypeMenu = () => {
        return {
            in: {
                school_id: null,
                type_menu: this.createRandomString(10)
            },
            id: null,
        }
    };

    createFakeMenu = () => {
        return {
            in: {
                school_id: null,
                type_id: null,
                paid_price: Math.floor(Math.random() * 100),
                free_price: Math.floor(Math.random() * 50),
                date: new Date()
            },
            id: null,
        }
    };

}
