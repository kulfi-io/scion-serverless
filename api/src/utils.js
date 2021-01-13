import bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { GraphQLScalarType } from "graphql";
import config from "../env.config";

/**
 * getReource
 * @param {Object} data // {user: user, model:model}
 * returns targeted resource for the selected role
 */
const getResource = (data) => {
    return data.user.selected[0].resources.filter((x) => x.name === data.model);
};

/**
 *
 * @param {string} token
 * return decrpted token value
 */
const getTokenPayload = (token) => {
    return jwt.verify(token, config.jwtSecret);
};

/**
 *
 * @param {object} data // {user: user, model:model}
 * return resource
 */
const verifyResourceAccess = (data) => {
    const result = getResource(data);
    if (!result.length)
        throw new Error(`User does not have access to resource`);

    return result;
};

/**
 *
 * @param {model} data // {user: user, model: model}
 * return managerial permissions
 */
const authorizedToManage = (data) => {
    if (!data || !data.length) throw new Error("Not Authorized");

    const perms = data[0].permissions;

    if (
        perms.indexOf("canManage") !== -1 ||
        perms.indexOf("canManageAccrossAll") !== -1
    ) {
        return true;
    }

    throw new Error("User is not authorized");
};

/**
 *
 * @param {model} data // {user: user, model: model}
 * return managerial permissions across all
 */
const authorizedToManageAccrossAll = (data) => {
    if (!data || !data.length) throw new Error("Not Authorized");

    const perms = data[0].permissions;

    if (perms.indexOf("canManageAccrossAll") !== -1) {
        return true;
    }

    throw new Error("User is not authorized");
};

/**
 *
 * @param {object} data // {user: user model: model}
 * returns self manage permissions
 */
const authorizedToManageSelf = (data) => {
    if (!data || !data.length) throw new Error("Not Authorized");

    const perms = data[0].permissions;

    if (perms.indexOf("canManageSelf") !== -1) {
        return true;
    }

    throw new Error("User is not authorized");
};

/**
 *
 * @param {string} data
 * retuns hash
 */
export const createHash = async (data) => {
    return await bcrypt.hash(data.toString(), parseInt(config.cryptSalt));
};

/**
 *
 * @param {string} data
 * @param {sting} hashed
 * returns compared value
 */
export const compareData = async (data, hashed) => {
    return await bcrypt.compare(data.toString(), hashed.toString());
};

/**
 *
 * @param {object|string} data
 * return token
 */
export const createLoginToken = (data) => {
    return jwt.sign(data, config.jwtSecret);
};

/**
 *
 * @param {object} req // request object
 * returns
 * {user: userId, selected: selected, roles:roles} as crypted tolen
 */
export const getLoginTokenData = (req) => {
    if (req) {
        const authHeader = req.headers.authorization;
        if (authHeader) {
            const token = authHeader.replace("Bearer ", "");
            if (!token) {
                throw new Error("No token found");
            }

            const data = getTokenPayload(token);

            return {
                userId: data.userId,
                selected: data.payload.selected.map((sel) => {
                    return {
                        id: sel.id,
                        name: sel.name,
                        isDefault: sel.isDefault,
                        resources: sel.resources.map((res) => {
                            return {
                                id: res.id,
                                name: res.name,
                                permissions: res.permissions.join(),
                            };
                        }),
                    };
                }),
                roles: data.payload.roles,
            };
        }
    }
};

/**
 * GraphQLScalarDate
 * return graphQlObject for date datatype
 */
export const GraphQLScalarDate = new GraphQLScalarType({
    name: "GraphQLScalarDate",
    description: "Return date",
    parseValue: (data) => {
        return data;
    },
    serialize: (data) => {
        return new Date(Number(data));
    },
});

/**
 *
 * @param {object} data // {user: user, model:modelName}
 * checks to see if user is authorized
 * to alter resource
 * Return Boolean/Error
 */
export const isValid = async (data) => {
    if (!data || !data.user) throw new Error("Not Authenticated");

    const resource = verifyResourceAccess(data);
    return authorizedToManage(resource);
};

/**
 *
 * @param {object} data // {user: user, model:modelName}
 * checks to see if user is authorized
 * to alter resource
 * Return Boolean/Error
 */
export const isValidAcrossAll = async (data) => {
    if (!data || !data.user) throw new Error("Not Authenticated");

    const resource = verifyResourceAccess(data);
    return authorizedToManageAccrossAll(resource);
};

/**
 *
 * @param {object} data // {user: user, model:modelName}
 * checks to see if user is authorized
 * to maage self
 * Return Boolean/Error
 */
export const isValidSelf = async (data) => {
    if (!data || !data.user) throw new Error("Not Authenticated");

    /**
     * TODO log action to database
     * TODO force web app to alert as illegal action
     * TODO force web app to logout user
     * TODO reset tageted user
     * TODO notify admin and targeted user
     */

    if (data.user.userId !== data.targetUserId)
        throw new Error("Illegal Action");

    const resource = verifyResourceAccess(data);
    return authorizedToManageSelf(resource);
};

/**
 * TODO Create shared function for Illegal actions
 */

/**
 * DMS Converter: converst latitude or longitude to double
 * input {object} /41°24'12.2"N 2°10'26.5"E/
 * output {object} {lat: xxx.xxxx, long: xxx.xxxx} / null
 */
export const DMSConverter = (input) => {
    if (!input || typeof input !== "object") return null;

    const latLong = input.source.split(" ");
    const coords = {};

    const parseCoords = (data, direction) => {
        const neg = data.toLowerCase().indexOf(direction.toLowerCase()) !== -1;

        const sections = data.split(/[^\d+(\,\d+)\d+(\.\d+)?\w]+/);
        const hr = sections[0] ? parseFloat(sections[0]) : 0;
        const min = sections[1] ? parseFloat(sections[1]) : 0;
        const sec = sections[2] ? parseFloat(sections[2].replace(",", ".")) : 0;

        const value =
            hr + (min > 0 ? min / 60 : 0) + (sec > 0 ? sec / 3600 : 0);

        return parseFloat((neg ? value * -1 : value).toFixed(6));
    };

    if (latLong.length) {
        const lat = parseCoords(latLong[0], "S");
        const long = parseCoords(latLong[1], "W");

        coords["lat"] = lat;
        coords["long"] = long;
    }

    return coords;
};
