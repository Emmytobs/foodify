const fs = require('fs');
const path = require('path')

function getUsersSeedData() {
    const rawUserData = fs.readFileSync(path.join(__dirname, 'users.json'))
    const parsedData = JSON.parse(rawUserData);
    return formatUserData(parsedData);
}

module.exports = {
    getUsersSeedData
}


function formatUserData (parsedData) {
    return parsedData.map(data => ({
            ...data,
            roles: [data.roles],
            lastLogin: new Date(data.lastLogin),
            createdAt: new Date(data.createdAt),
            updatedAt: new Date(data.updatedAt),
        })
    )
}