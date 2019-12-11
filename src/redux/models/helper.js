export const getStorageAsync = ({ key }) => {
    return new Promise((resolve, reject) => {
            wx.getStorage({
                key,
                success: ({ errMsg, data }) => 'getStorage:ok' === errMsg && resolve(data) || reject(data),
                fail: error => reject(`getStorage: fail to get ${key}`)
            })
        })
}

export const setStorageAsync = ({ key, value }) => {
    return new Promise((resolve, reject) => {
            wx.setStorage({
                key,
                data: value,
                success: ({ errMsg }) => 'setStorage:ok' === errMsg && resolve() || reject(errMsg),
                fail: error => reject(`setStorage: fail to get ${key}`)
            })
        })
}
