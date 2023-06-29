import { Base64 } from "js-base64"
const baseUrl = 'https://meituan.thexxdd.cn/api/'

// 获取token
function getToken(): string{
    const token = uni.getStorageSync('wxuser').user_token || ''
    const base64_token = Base64.encode(token + ':')
    return 'Basic ' + base64_token
}

function request(
    url:string,
    method: 'GET' | 'POST',
    data?: string | object | ArrayBuffer
){
    return new Promise((resolve, reject) => {
        uni.request({
            url: baseUrl + url,
            method,
            data,
            header: {
                Authorization: getToken()
            },
            success: (res:any) => {
                if(res.statusCode == 200){
                    resolve(res)
                }else if(res.statusCode == 401){
                    // 没有权限
                    reject(res)
                }else if(res.statusCode == 500){
                    uni.showToast({
                        title: '服务器发生未知错误',
                        icon: 'none',
                        duration: 1000
                    })
                    reject(res)
                }
            },
            fail: (err: any) => {

            }
        })
    })
}

// 接口
const RequestApi = {
    HomePage: () => request('frontpage','GET'),
    MinePage: () => request('department','GET')
}

export { RequestApi }