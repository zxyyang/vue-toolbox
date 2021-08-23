
import request from "@/utils/request";

export function list(params) {
    return request({
        url: '/note/list',
        method: 'get',
        params
    })
}
