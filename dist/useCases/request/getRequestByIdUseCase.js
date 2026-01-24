"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getRequestByIdUseCase = getRequestByIdUseCase;
const databaseManager_1 = require("../../libs/databaseManager");
async function getRequestByIdUseCase(id) {
    const request = await databaseManager_1.databaseManager.getDatabase().request.findFirst({
        where: {
            OR: [{ id }, { referenceNumber: id }],
            deletedAt: null,
        },
        include: {
            responses: {
                orderBy: {
                    createdAt: "desc",
                },
                include: {
                    employee: {
                        select: {
                            id: true,
                            name: true,
                            email: true,
                        },
                    },
                    isp: {
                        select: {
                            name: true,
                            logo: true,
                        },
                    },
                },
            },
            isp: {
                select: {
                    name: true,
                    logo: true,
                },
            },
            respondedBy: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
            analyticMetrics: {
                orderBy: {
                    createdAt: "desc",
                },
                take: 10,
            },
        },
    });
    if (!request) {
        throw new Error("Request not found");
    }
    console.log(request);
    return request;
}
