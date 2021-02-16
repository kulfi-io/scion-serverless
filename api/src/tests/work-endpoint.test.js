import { superRequest, apiUrl, getLoginToken, whitelist } from "./utils";

describe("Executive Officer Work Endpoint Tests", () => {
    let id, token, request, endpoint, origin;
    beforeAll(() => {
        request = superRequest();
        endpoint = apiUrl();
        origin = whitelist();
    });

    afterAll(() => {
        if (request) {
            request.close();
        }
    });

    test("login", (done) => {
        request
            .post(endpoint)
            .send({
                query: `{
                login(email: "admin@scion.com" password:"password") {
                    token
                    user {id firstName lastName fullName}
                    roles{id name isDefault resources {
                        id name permissions
                    }}
                }
            }`,
            })
            .set("Content-type", "application/json")
            .set("Origin", origin)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);

                if (res.body.errors) return done(res.body.errors[0].message);

                expect(res.body).toBeInstanceOf(Object);
                expect(res.body.data.login.user.firstName).toEqual("Admin");
                expect(res.body.data.login.roles.length).toEqual(1);
                expect(res.body.data.login.token).toBeTruthy();
                token = getLoginToken(err, res);
                done();
            });
    });

    test("retrieve-works", async (done) => {
        request
            .post(endpoint)
            .send({
                query: `{
                works {
                    id
                    displayName
                    description
                    rate
                    workCategory{id, displayName, description}
                    workStatus{id, displayName, description}
                    workType{id, displayName, description}
                    createdAt
                    createdBy{id, firstName lastName email}
                    updatedAt
                    updatedBy{id firstName lastName email}
                }
            }`,
            })
            .set("Content-Type", "application/json")
            .set("authorization", token)
            .set("Origin", origin)

            .expect(200)
            .end((err, res) => {
                if (err) return done(err);

                if (res.body.errors) return done(res.body.errors[0].message);

                expect(res.body).toBeInstanceOf(Object);
                expect(res.body.data.works.length).toEqual(1);
                expect(res.body.data.works[0].workCategory.displayName).toEqual(
                    "Maintenance"
                );
                expect(res.body.data.works[0].workStatus.displayName).toEqual(
                    "Requested"
                );
                expect(res.body.data.works[0].workType.displayName).toEqual(
                    "One Time"
                );
                done();
            });
    });

    test("retrieve-work-by-id", async (done) => {
        request
            .post(endpoint)
            .send({
                query: `{
                workById(id: 1) {
                    id
                    displayName
                    description
                    rate
                    workCategory{id, displayName, description}
                    workStatus{id, displayName, description}
                    workType{id, displayName, description}
                    createdAt
                    createdBy{id, firstName lastName email}
                    updatedAt
                    updatedBy{id firstName lastName email}
                }
            }`,
            })
            .set("Content-Type", "application/json")
            .set("authorization", token)
            .set("Origin", origin)

            .expect(200)
            .end((err, res) => {
                if (err) return done(err);

                if (res.body.errors) return done(res.body.errors[0].message);

                expect(res.body).toBeInstanceOf(Object);
                expect(res.body.data.workById.displayName).toEqual(
                    "Pool cleaning"
                );
                done();
            });
    });

    test("retrieve-work-by-name", async (done) => {
        request
            .post(endpoint)
            .send({
                query: `{
                workByName(name: "Pool cleaning") {
                    id
                    displayName
                    description
                    rate
                    workCategory{id, displayName, description}
                    workStatus{id, displayName, description}
                    workType{id, displayName, description}
                    createdAt
                    createdBy{id, firstName lastName email}
                    updatedAt
                    updatedBy{id firstName lastName email}
                }
            }`,
            })
            .set("Content-Type", "application/json")
            .set("authorization", token)
            .set("Origin", origin)

            .expect(200)
            .end((err, res) => {
                if (err) return done(err);

                if (res.body.errors) return done(res.body.errors[0].message);

                expect(res.body).toBeInstanceOf(Object);
                expect(res.body.data.workByName.id).toEqual(1);
                done();
            });
    });

    test("create-work", async (done) => {
        request
            .post(endpoint)
            .send({
                query: `mutation {
                    addWork(name: "Tester Work", description: "Tester work creation", rate: 40.50, status: 2, type: 1, category: 2) {
                        id
                    }
                }`,
            })
            .set("Content-Type", "application/json")
            .set("authorization", token)
            .set("Origin", origin)

            .expect(200)
            .end((err, res) => {
                if (err) return done(err);

                if (res.body.errors) return done(res.body.errors[0].message);

                expect(res.body).toBeInstanceOf(Object);
                expect(res.body.data.addWork.id).toBeTruthy();
                id = res.body.data.addWork.id;
                done();
            });
    });

    test("create-work-duplicate-verification", async (done) => {
        request
            .post(endpoint)
            .send({
                query: `mutation {
                    addWork(name: "Tester Work", description: "Tester work creation", rate: 40.00, status: 2, type: 1, category: 2) {
                        id
                    }
                }`,
            })
            .set("Content-Type", "application/json")
            .set("authorization", token)
            .set("Origin", origin)

            .expect(200)
            .end((err, res) => {
                if (err) return done(err);

                expect(res.body.errors).toBeTruthy();
                done();
            });
    });

    test("deactivate-work", async (done) => {
        request
            .post(endpoint)
            .send({
                query: `mutation {
                    deactivateWork(id: ${id}) {
                        id
                    }
                }`,
            })
            .set("Content-Type", "application/json")
            .set("authorization", token)
            .set("Origin", origin)

            .expect(200)
            .end((err, res) => {
                if (err) return done(err);

                if (res.body.errors) return done(res.body.errors[0].message);

                expect(res.body).toBeInstanceOf(Object);
                done();
            });
    });
});
