// const { BadRequest } = require("./errors")

// function capitalize(str) {
//     if (!str) return ''; 
//     return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
//   }

// function getStringValue(variable){
//     return Object.keys(Object.values(Object.values({variable})[0])[0])[0]
// }

// const notNullValidator = (target)=>{
    
//     if (!Object.values(Object.values({target})[0])[0]) {
//         throw new BadRequest(`${capitalize(getStringValue({target}))} field must not be null`)
//     }
// }

// module.exports = {notNullValidator}