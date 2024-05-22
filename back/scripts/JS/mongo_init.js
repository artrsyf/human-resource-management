let username = process.env.MONGODB_USER;
let password = process.env.MONGODB_PASSWORD;
let database = process.env.MONGODB_DATABASE;

print("Adding New Users");
db = db.getSiblingDB("admin");
db.createUser({
  user: username,
  pwd: password,
  roles: [{ role: "readWrite", db: database }],
});
print("End Adding the User Roles.");