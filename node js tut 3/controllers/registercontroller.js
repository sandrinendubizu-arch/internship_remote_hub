const usersDB = {
  users: require('../data/users.json'),
  setUsers: function (data) { this.users = data }
};
const fsPromises = require('fs').promises;
const path = require('path');
const bcrypt = require('bcrypt');

const handleNewUser = async (req, res) => {
  const { user, pwd, username, password } = req.body || {};
  const newUserName = user || username;
  const newPassword = pwd || password;

  if (!newUserName || !newPassword) {
    return res.status(400).json({ message: 'Username and password are required.' });
  }

  const duplicate = usersDB.users.find(person => person.username === newUserName);
  if (duplicate) {
    return res.status(409).json({ message: `Username ${newUserName} already exists.` });
  }

  try {
    const hashedPwd = await bcrypt.hash(newPassword, 10);
    console.log('Hashed password:', hashedPwd);
    const newUser = { username: newUserName, password: hashedPwd };
    usersDB.setUsers([...usersDB.users, newUser]);
    await fsPromises.writeFile(
      path.join(__dirname, '..', 'data', 'users.json'),
      JSON.stringify(usersDB.users, null, 2)
    );
    console.log('Updated users:', usersDB.users);

    res.status(201).json({ success: `New user ${newUserName} created!` });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { handleNewUser };