const { sql } = require("../dbConnection");

exports.createUser = async (newUser) => {
  const users = await sql`
INSERT INTO users ${sql(newUser, "username", "email", "password", "role")}
RETURNING *
`;
  return users[0];
};

exports.getUserByEmail = async (email) => {
  const [user] = await sql`
    SELECT users.* 
    FROM users 
    WHERE users.email = ${email}`;
  return user;
};

exports.getUserById = async (id) => {
  const [user] = await sql`
    SELECT users.* 
    FROM users 
    WHERE users.id = ${id}`;
  return user;
};


exports.getAllUsers = async () => {
  const users = await sql`
    SELECT *
    FROM users
    `;

  return users;
};

exports.deleteUser = async (id) => {
  const [user] = await sql`
    DELETE FROM users
    WHERE users.id = ${id}
    RETURNING *;
    `;
  return user;
};


// exports.filterUsers = async (filter, limit, offset) => {
//   const validStatuses = ["ADMIN", "USER"];
//   console.log(filter);
//   const roleFilter = validStatuses.includes(filter.role.toUpperCase())
//     ? filter.role.toUpperCase()
//     : null;

//   const users = await sql`
//     SELECT users.*
//     FROM users
//     WHERE UPPER(users.role) = ${roleFilter}
//     ORDER BY users.user_id
//     ${
//       !isNaN(limit) && !isNaN(offset)
//         ? sql`LIMIT ${limit} OFFSET ${offset}`
//         : sql``
//     } `;
//   const totalUsers =
//     await sql`SELECT COUNT(users.id) AS total FROM users
//     WHERE UPPER(users.role) = ${roleFilter}`;
//   const total_count = totalUsers[0].total;

//   return { users, total_count };
// };

exports.updateUserRole = async (id, updatedUser) => {
  const [user] = await sql`
    UPDATE users
    SET ${sql(updatedUser, "role")}
    WHERE users.id = ${id}
    RETURNING *;
    `;
  return user;
};



exports.filterUsersByStatus = async (filter, limit, offset) => {
  const validStatuses = ["DRAFT", "PENDING", "PAID"];
  console.log(filter);
  const statusFilter = validStatuses.includes(filter.status.toUpperCase())
    ? filter.status.toUpperCase()
    : null;

  const users = await sql`
    SELECT users.*
    FROM users
    WHERE UPPER(users.status) = ${statusFilter}
    ORDER BY users.id
    ${
      !isNaN(limit) && !isNaN(offset)
        ? sql`LIMIT ${limit} OFFSET ${offset}`
        : sql``
    } `;
  const totalUsers =
    await sql`SELECT COUNT(users.id) AS total FROM users
    WHERE UPPER(users.status) = ${statusFilter}`;
  const total_count = totalUsers[0].total;

  return { users, total_count };
};


