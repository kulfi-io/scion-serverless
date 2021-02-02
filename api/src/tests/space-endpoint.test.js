import { DMSToDoubleConverter } from "../utils";
import { superRequest, apiUrl, getLoginToken, whitelist } from "./utils";

describe("Executive Officer Space Endpoint Tests", () => {
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

    test("authentication-failure-for-retrieve-spaces", async (done) => {
        request
            .post(endpoint)
            .send({
                query: `{
                spaces {
                    id
                }
            }`,
            })
            .set("Content-Type", "application/json")
            .set("Origin", origin)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);

                expect(res.body.errors[0].message).toEqual("Not Authenticated");
                done();
            });
    });

    test("retrieve-spaces", async (done) => {
        request
            .post(endpoint)
            .send({
                query: `{
                spaces {
                    id
                    displayName
                    description
                    latitude
                    longitude
                    private
                    address
                    address2
                    city
                    state
                    zip
                    phone
                    cell
                    email
                    webPresence
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
                expect(res.body.data.spaces.length).toEqual(2);
                expect(res.body.data.spaces[0].latitude).toEqual("37.7723° N");
                done();
            });
    });

    test("authentication-failure-for-retrieve-space-by-Id", async (done) => {
        request
            .post(endpoint)
            .send({
                query: `{
                spaceById(id: 1 ) {
                    id
                    displayName
                    description
                    latitude
                    longitude
                    private
                    address
                    address2
                    city
                    state
                    zip
                    phone
                    cell
                    email
                    webPresence
                    createdAt
                    createdBy{id, firstName lastName email}
                    updatedAt
                    updatedBy{id firstName lastName email}
                }
            }`,
            })
            .set("Content-Type", "application/json")
            .set("Origin", origin)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);

                expect(res.body.errors[0].message).toEqual("Not Authenticated");
                done();
            });
    });

    test("retrieve-space-by-id", async (done) => {
        request
            .post(endpoint)
            .send({
                query: `{
                spaceById(id: 2 ) {
                    id
                    displayName
                    description
                    latitude
                    longitude
                    private
                    address
                    address2
                    city
                    state
                    zip
                    phone
                    cell
                    email
                    webPresence
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
                expect(res.body.data.spaceById.id).toEqual(2);
                done();
            });
    });

    test("authentication-failure-for-retrieve-space-by-name", async (done) => {
        request
            .post(endpoint)
            .send({
                query: `{
                spaceByName(name: "Conservatory of Flowers" ) {
                    id
                }
            }`,
            })
            .set("Content-Type", "application/json")
            .set("Origin", origin)
            .expect(200)
            .end((err, res) => {
                if (err) return done(err);

                expect(res.body.errors[0].message).toEqual("Not Authenticated");
                done();
            });
    });

    test("retrieve-space-by-name", async (done) => {
        request
            .post(endpoint)
            .send({
                query: `{
                spaceByName(name: "Conservatory of Flowers" ) {
                    id
                    displayName
                    description
                    latitude
                    longitude
                    private
                    address
                    address2
                    city
                    state
                    zip
                    phone
                    cell
                    email
                    webPresence
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
                expect(res.body.data.spaceByName.displayName).toEqual(
                    "Conservatory of Flowers"
                );
                done();
            });
    });

    test("create-space", async (done) => {
        const geo = DMSToDoubleConverter(/37°48'16.3"N 122°26'57.2"W/);
        request
            .post(endpoint)
            .send({
                query: `mutation {
                    addSpace(
                        name: "Sample Space"
                        description: "Space created for testing insert"
                        geo: "${geo}"
                        private: false
                        address: "123 test street"
                        address2: "2"
                        city: "San Francisco"
                        state: "CA"
                        zip: "94123"
                        phone: "415-555-1212"
                        cell: "415-555-1212"
                        email: "tester@test.com"
                        webPresence: "http://www.sample-space.com"
                    ) {
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
                expect(res.body.data.addSpace.id).toBeTruthy();
                done();
            });
    });
});
