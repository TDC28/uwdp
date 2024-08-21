# UWDP - Backend

Default port: 8000

## Endpoints
- /api/auth/login/
    - Login a user (POST)
        - "username": CharField
        - "password": CharField

- /api/auth/register/
    - Create a new user (POST)
        - "username": CharField
        - "password": CharField
        - "email": CharField

- /api/courses/
    - Add a course (POST)
        - "subject": CharField
        - "code": IntegerField
        - "prereqs": CharField (default: "")
        - "antireqs": CharField (default: "")
        - "coreqs": CharField (default: "")

    - List all courses (GET)
