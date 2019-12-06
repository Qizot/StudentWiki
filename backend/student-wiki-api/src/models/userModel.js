import mongoose from 'mongoose';

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true
    },
    lastname:  {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        validate: [validateEmail, "email must match standard"],
        index: {
            unique: true,
            collation: { locale: 'en', strength: 2 }
        }
    },
    password: {
        type: String,
        required: true
    },
    roles: {
        type: [
            {
                type: String,
                enum: ["user", "admin"]
            }
        ],
        default: ["user"]

    }
});

userSchema.methods.getSecureUser = function() {
    console.log(this);
    return {
        id: this._id.toString(),
        firstname: this.firstname,
        lastname: this.lastname,
        email: this.email,
        roles: this.roles
    };
  };

const User = mongoose.model('User', userSchema);

export default User;