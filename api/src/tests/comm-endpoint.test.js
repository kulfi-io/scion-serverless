import { superRequest, apiUrl, getLoginToken, whitelist } from "./utils";

describe("Executive Officer Comm Endpoint Tests", () => {
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

    test("retrieve-comms", async (done) => {
        request
            .post(endpoint)
            .send({
                query: `{
                comms {
                    id
                    displayName
                    description
                    commType{id, displayName, description}
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
                expect(res.body.data.comms.length).toEqual(3);
                expect(res.body.data.comms[0].displayName).toEqual(
                    "Registration Verification"
                );
                done();
            });
    });

    test("retrieve-comm-by-id", async (done) => {
        request
            .post(endpoint)
            .send({
                query: `{
                commById(id: 2) {
                    id
                    displayName
                    description
                    commType{id, displayName, description}
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
                expect(res.body.data.commById.displayName).toEqual(
                    "Change Password"
                );
                done();
            });
    });

    test("retrieve-comm-by-name", async (done) => {
        request
            .post(endpoint)
            .send({
                query: `{
                commByName(name: "Change Password") {
                    id
                    displayName
                    description
                    commType{id, displayName, description}
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
                expect(res.body.data.commByName.id).toEqual(2);
                done();
            });
    });

    test("create-comm", async (done) => {
        request
            .post(endpoint)
            .send({
                query: `mutation {
                    addComm(name: "Tester comm", description: "Tester comm creation", type: 1) {
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
                expect(res.body.data.addComm.id).toBeTruthy();
                id = res.body.data.addComm.id;
                done();
            });
    });

    test("create-comm-duplicate-verification", async (done) => {
        request
            .post(endpoint)
            .send({
                query: `mutation {
                    addComm(name: "Tester comm", description: "Tester comm creation", type: 1) {
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

    test("deactivate-comm", async (done) => {
        request
            .post(endpoint)
            .send({
                query: `mutation {
                    deactivateComm(id: ${id}) {
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
