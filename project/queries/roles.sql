USE miniProject;

CREATE ROLE "users"@"localhost", "admins"@"localhost", "governmentUsers"@"localhost";

GRANT ALL ON miniProject.* TO "admins"@"localhost";
GRANT SELECT ON miniProject.* TO "users"@"localhost";
GRANT INSERT ON miniProject.requests TO "users"@"localhost";
GRANT SELECT ON miniProject.* TO "governmentUsers"@"localhost";