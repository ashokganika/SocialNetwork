
function mapUser(originalUser, updateUser){
    if(updateUser.name)
        originalUser.name= updateUser.name;
    if(updateUser.email)    
        originalUser.email= updateUser.email;
    if(updateUser.username)    
        originalUser.username= updateUser.username;
    if(updateUser.password)    
        originalUser.password= updateUser.password;
    if(updateUser.gender)
        originalUser.gender= updateUser.gender;
    if(updateUser.address)
        originalUser.address= updateUser.address;
    if(updateUser.dob)
        originalUser.dob= updateUser.dob;
    if(updateUser.phone)
        originalUser.phone= updateUser.phone;
    if(updateUser.role)
        originalUser.role= updateUser.role;    

    return originalUser;    
}

module.exports = mapUser;