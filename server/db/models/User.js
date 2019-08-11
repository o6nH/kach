const db = require('../index');
const Sequelize = require('sequelize');
const hash = require('../../../script/hash');

const User = db.define('user', {
    id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
    },
    firstName: {
        type: Sequelize.STRING,
    },
    lastName: {
        type: Sequelize.STRING,
    },
    email: {
        type: Sequelize.STRING,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: Sequelize.STRING,
    },
    streetAddress: {
        type: Sequelize.STRING,
    },
    suite: {
        type: Sequelize.STRING,
    },
    city: {
        type: Sequelize.STRING,
    },
    state: {
        type: Sequelize.STRING,
    },
    zip: {
        type: Sequelize.INTEGER,
    },
    imageUrl: {
        type: Sequelize.STRING,
    },
    isAdmin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    },
    isAuthenticated: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
    },
}, {
    hooks: {
        beforeCreate: user => {
            if (user.password){
                user.password = hash(user.password);
            } else {
                return user
            }
        }
    }
});

User.login = function (email, password) {
    return  this.findOne({
      where: {
        email, 
        password: hash(password)
      }
    })
}

User.signup = function (user) {
    //if guest and wants to sign up then update user
    // if email is already taken the tell user that
    const ifUser = this.findOne({
        where: {
            id: user.id
        }
    })
    const ifUsedEmail = this.findOne({
        where: {
            email: user.email,
        }
    })
    if (!ifUsedEmail){
        const updatedUser = ifUser.update(user)
        console.log(updatedUser);
        return updatedUser[0];
    } else {
        return 'Email already in use, please use another'
    }
}

User.createGuest = async function () {
    const guest = await this.create();
    return guest;
}

User.remove = async function (id) {
    const user = await this.findByPk(id);
    await user.destroy();
  };


module.exports = User;