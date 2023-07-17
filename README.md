# zawilian

## description
e learning application for a teacher to explain his courses, follow
and exam students.
## technologies
### restfull Api technologies 
* express.js
* sequelize
* postgreSql

### dashboard technologies
* react
* rtk-query
* bootstrap

## features
* teacher can add and delete grade and add specific course for each grade.
* teacher can accept or refuse applying students.
* teacher can manage course like manage units, lessons and revisions of the course.
* teacher can manage students and show exam score for each student
* student can apply in his grade.
* accepting students only can show their course.
* student must pass exam after each unit and lesson and revision.

## Architecture layers
request =====> guards =====> validation =====> controller =====> repository =====> model


## to run the project in your device
## Prerequisites

Before getting started, ensure that you have the following prerequisites installed:

- [docker]
- [docker-compose]


## Installation

To install and set up the project, follow these steps:

1. Clone the repository:

   ```shell
   git clone [[https](https://github.com/Ahmedhaggg/zawilian/)]
2. sure docker and docker-compose are starting
3. create .env file in ./server directory and type variables values
    ```sh
   JWT_SECRET= 
    BCRYPT_SALT= 
    DB_HOST=
    SERVER_PORT=
    DB_PORT=
    DB_NAME= 
    DB_PASS=
    DB_USER=
    ADMIN_EMAIL=
    ADMIN_PASSWORD=
   ```
4. create .env file in ./dahsboard directory 
   ```sh
      REACT_APP_API_URL= "http://localhost/api/"
   ```
5. run

   ```shell
   docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d

6. run database migration

   ```shell
   docker-compose exec server npm run db:migrate

7. can run test cases
    
    ```shell
    docker-compose exec server npm run test

## tables
### users
* id
* name (quadruple)
* email
* phoneNumber
* password
* accepted

### studentCourse 
* studentId
* courseId
* unitArrangement
* sectionArrangement

### Grade
* id
* name
* courseId

### Course
* id
* name
* term
* lastUnitArrangement
* lastRevisionArrangement
* gradeId

### Unit
* id
* name
* description
* arrangement
* lastSectionArrangement
* exam
* courseId

### Section
* id
* name
* description
* arrangement
* video
* exam
* unitId
* type ["lesson", "revision"]

### CourseRevision
* id
* name
* description
* arrangement
* video
* exam
* courseId

### ExamScore
* id
* studentId
* unitId
* sectionId
* courseRevisionId
* score
* createdAt


