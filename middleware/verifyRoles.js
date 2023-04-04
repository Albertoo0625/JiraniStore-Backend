const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req?.roles) return res.status(401).json({"message":"req roles not found"});
        const rolesArray = [...allowedRoles];
        console.log(rolesArray);
        console.log(req.roles);

        const obj = req.roles;
        const arr = [];
        
        for (let key in obj) {
          arr.push(obj[key]);
        }
        // arr is now [1, 2, 3]


       
        const result =arr.map(role => rolesArray.includes(role)).find(val => val === true);
        if (!result) return res.status(401);
        next();
    }
}

module.exports = verifyRoles