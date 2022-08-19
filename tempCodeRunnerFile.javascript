const password = "P@55word123"
const pattern = /^(?=.*[A-Za-z])(?=.*d)(?=.*[@$!%*#?&])[A-Za-zd@$!%*#?&]{8,}/g;

const found = password.match(pattern)
console.log("~ found", found)