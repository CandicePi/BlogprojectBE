const mongoose = require('mongoose')
const bcrypt = require('bcryptsjs')

const UserSchema = new mongoose. Schema({
    username: {
        type: String,
        required: true,
        unique: true
     },
     email: {
        type: String,
        require: true,
        unique: true
     },
     password: {
        type: String,
        required: true
     },
     blogPost:{
        type: String,
        required: true
     }
}, {timestamps: true});

UserSchema.pre("save", async function () {
if(this.isModified("password")) return;

const salt = await bcrypt.genSalt(10)
this.password = await bcrypt.hash(this.password, salt)

})

UserSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password)
}

module.exports = mongoose.model("User", UserSchema)
