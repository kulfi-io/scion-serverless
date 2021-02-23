import { superRequest, apiUrl, getLoginToken, whitelist } from "./utils";

describe("Executive Officer Comm Status Endpoint Tests", () => {
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

    test("retrieve-comm-statuses", async (done) => {
        request
            .post(endpoint)
            .send({
                query: `{
                commStatuses {
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
                expect(res.body.data.commStatuses.length).toEqual(5);
                done();
            });
    });

    test("retrieve-comm-status-by-id", async (done) => {
        request
            .post(endpoint)
            .send({
                query: `{
                commStatusById(id: 2) {
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
                expect(res.body.data.commStatusById.displayName).toEqual(
                    "Request"
                );
                done();
            });
    });

    test("retrieve-comm-status-by-name", async (done) => {
        request
            .post(endpoint)
            .send({
                query: `{
                commStatusByName(name: "Request") {
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
                expect(res.body.data.commStatusByName.id).toEqual(2);
                done();
            });
    });

    test("create-comm-status", async (done) => {
        request
            .post(endpoint)
            .send({
                query: `mutation {
                    addCommStatus(name: "Tester Comm Status", description: "Testing comm status creation") {
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
                expect(res.body.data.addCommStatus.id).toBeTruthy();
                id = res.body.data.addCommStatus.id;
                done();
            });
    });

    test("create-comm-status-duplicate-verification", async (done) => {
        request
            .post(endpoint)
            .send({
                query: `mutation {
                    addCommStatus(name: "Tester Comm Status", description: "Testing comm status creation") {
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

    test("deactivate-comm-status", async (done) => {
        request
            .post(endpoint)
            .send({
                query: `mutation {
                    deactivateCommStatus(id: ${id}) {
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
