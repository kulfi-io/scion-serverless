import { superRequest, apiUrl, getLoginToken, whitelist } from "./utils";

describe("Executive Officer Work Type Endpoint Tests", () => {
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

    test("retrieve-work-types", async (done) => {
        request
            .post(endpoint)
            .send({
                query: `{
                workTypes {
                    id
                    displayName
                    description
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
                expect(res.body.data.workTypes.length).toEqual(2);
                done();
            });
    });

    test("retrieve-work-type-by-id", async (done) => {
        request
            .post(endpoint)
            .send({
                query: `{
                workTypeById(id: 2) {
                    id
                    displayName
                    description
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
                expect(res.body.data.workTypeById.displayName).toEqual(
                    "Recurring"
                );
                done();
            });
    });

    test("retrieve-work-type-by-name", async (done) => {
        request
            .post(endpoint)
            .send({
                query: `{
                workTypeByName(name: "Recurring") {
                    id
                    displayName
                    description
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
                expect(res.body.data.workTypeByName.id).toEqual(2);
                done();
            });
    });

    test("create-work-type", async (done) => {
        request
            .post(endpoint)
            .send({
                query: `mutation {
                    addWorkType(name: "Tester type", description: "Testing type creation") {
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
                expect(res.body.data.addWorkType.id).toBeTruthy();
                id = res.body.data.addWorkType.id;
                done();
            });
    });

    test("create-work-type-duplicate-verification", async (done) => {
        request
            .post(endpoint)
            .send({
                query: `mutation {
                    addWorkType(name: "Tester type", description: "Testing type creation") {
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

    test("deactivate-work-type", async (done) => {
        request
            .post(endpoint)
            .send({
                query: `mutation {
                    deactivateWorkType(id: ${id}) {
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
