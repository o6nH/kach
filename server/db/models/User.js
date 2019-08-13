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
        },
        unique: {
            args: true,
            msg: 'Email address already in use!'
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
        beforeCreate: user =>  {
            if (user.password){
                user.password = hash(user.password);
            } else {
                return user
            }
        },
        beforeUpdate: user => {
            user.password = hash(user.password);
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

User.signup = async function (user) {
    //if guest and wants to sign up then update user
    // if email is already taken the tell user that
        //console.log('USER $$$$$$$$ ', user)
        try {
            const thing = await this.update({
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: hash(user.password),
            streetAddress: user.streetAddress,
            city: user.city,
            zip: user.zip,
            state: user.state,
            suite: user.suite,
            isAuthenticated: true,
            isAdmin: false
        }, {
            // returning: true,
            where: {
                id: user.id
            }
        })
        console.log(thing);
    } catch (err){
        console.error(err)
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