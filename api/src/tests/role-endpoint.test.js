import { superRequest, apiUrl, getLoginToken, whitelist } from "./utils";

describe("Executive Officer Role Endpoint Tests", () => {
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

    test("retrieve-roles", async (done) => {
        request
            .post(endpoint)
            .send({
                query: `{
                roles {
                    id
                    name
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
                expect(res.body.data.roles.length).toEqual(6);
                done();
            });
    });

    test("retrieve-role-by-id", async (done) => {
        request
            .post(endpoint)
            .send({
                query: `{
                roleById(id: 4) {
                    id
                    name
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
                expect(res.body.data.roleById.name).toEqual("Space Manager");
                done();
            });
    });

    test("retrieve-role-by-name", async (done) => {
        request
            .post(endpoint)
            .send({
                query: `{
                roleByName(name: "Space Manager") {
                    id
                    name
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
                expect(res.body.data.roleByName.id).toEqual(4);
                done();
            });
    });

    test("create-role", async (done) => {
        request
            .post(endpoint)
            .send({
                query: `mutation {
                    addRole(name: "Tester", description: "Testing user role creation") {
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
                expect(res.body.data.addRole.id).toBeTruthy();
                id = res.body.data.addRole.id;
                done();
            });
    });

    test("create-role-duplicate-verification", async (done) => {
        request
            .post(endpoint)
            .send({
                query: `mutation {
                    addRole(name: "Tester", description: "Testing user role creation") {
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

    test("deactivate-role", async (done) => {
        request
            .post(endpoint)
            .send({
                query: `mutation {
                    deactivateRole(id: ${id}) {
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
