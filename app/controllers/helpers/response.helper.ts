import {ResponseInterface, ResponsePagination, ResponsePaginationInterface} from "../../interfaces/response.interface";
import express from "express";
import {getReasonPhrase, StatusCodes} from "http-status-codes";
function buildBodyStructure(httpCode: number, data: any, message: string, errors: string[]): ResponseInterface {
    return {
        meta: {
            httpCode: httpCode,
            httpMessage: getReasonPhrase(httpCode),
            message: message,
            errors: errors,
            time: Math.floor(Date.now() / 1000),
        },
        data: data
    }
}
function buildBodyPagination(httpCode: number, data: any, message: string, pagination: ResponsePagination): ResponsePaginationInterface {
    return {
        ...buildBodyStructure(httpCode, data, message, []),
        pagination: pagination
    }
}
export function getResponse(response: express.Response, httpCode: number, data: any, message?: string, errors?: string[]) {
    message = typeof message == 'undefined' ? '' : message;
    errors = typeof errors == 'undefined' ? [] : errors;
    return response.status(httpCode).send(buildBodyStructure(httpCode, data, message, errors))
}
export function calcPagination(page: number, totalInPage: number, totalItems: number, limit: number): ResponsePagination {
    let limitAround = 5
    let totalPages = Math.ceil(totalItems / limit);
    const limitAroundPages = limitAround;
    const limitAroundPagesLess = (limitAround - 1);
    const range = (start: number, end: number, length = end - start + 1) =>
        Array.from({length}, (_, i) => start + i)
    let prevPage = page;
    page = Math.max(prevPage, 1);
    page = Math.min(page, totalPages);
    let previousStart = (page <= limitAroundPages) ? 1 : page - limitAroundPages;
    let previousLimit = (page <= limitAroundPages) ? (page - 1) : ((previousStart + limitAroundPages) - 1);
    previousLimit = prevPage > totalPages ? totalPages : previousLimit;
    let previousRange = previousLimit <= 0 ? [] : range(previousStart, previousLimit);
    let nextStart = page < totalPages ? (page + 1) : totalPages;
    let nextLimitNumber = (nextStart + limitAroundPagesLess);
    let nextLimit = nextLimitNumber <= totalPages ? nextLimitNumber : totalPages;
    let nextRange = page >= totalPages ? [] : range(nextStart, nextLimit);
    return {
        currentPage: page,
        prevPages: previousRange,
        nextPages: nextRange,
        totalPages: totalPages,
        totalItems: totalItems,
        itemsInPage: totalInPage,
        itemsPerPage: limit,
    };
}
export function getResponsePagination(response: express.Response, data: any, pagination: ResponsePagination, message?: string) {
    message = typeof message == 'undefined' ? '' : message;
    return response.status(StatusCodes.OK).send(buildBodyPagination(StatusCodes.OK, data, message, pagination))
}