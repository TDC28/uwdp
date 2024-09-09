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
    - List all courses (GET)

    - Add a course (POST)
        - "subject": CharField
        - "code": IntegerField
        - "prereqs": CharField (default: "")
        - "antireqs": CharField (default: "")
        - "coreqs": CharField (default: "")

- /api/terms/ (Authentication required)
    - List the user's terms (GET)

    - Add a term (POST)
        - "username": CharField (Read only)
        - "study_term": CharField
        - "courses": JSONField

- /api/terms/all-terms/
    - List all the terms on the database (GET)
