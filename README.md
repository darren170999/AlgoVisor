# Algo Visor
Algo Visor allows students to visualise and learn computer science concepts. Additionally, it also allows users to attempt leetcode-styled questions.
•	Algo Visual: Visualize algorithms along with snippet codes. 
•	Algo Meets: Students can discuss different topics on algorithms in online meeting rooms.
•	Algo Concepts: Watch course lecture materials and new recordings. 
•	Algo Code: To write and implement code or practice for interviews.


By Darren Soh
# Current Tech Stacks:
Golang, Gin Framework, React, MongoDB, Typescript, Redis, Docker, Docker compose, Judge0, 

# Notable Features:
Code Compilation.
Test Case comparisons while tracking latency.
Algo Visualiser

# DevOps:
## In progress
Dev(Me) -> QA(Prof Shao) -> Production(Live)

# Installations:
Install Docker and Docker Compose

Gin Framework, ReactJS, MongoDB, GraphQL

## Bash Scripting for development: 
export PATH=$(go env GOPATH)/bin:$PATH

# Total LOC:
| File/Folder | Lines |
|-------------|-------|
| .DS_Store   | 0     |
| .idea/AlgoVisual.iml | 8 |
| .idea/inspectionProfiles/Project_Default.xml | 5 |
| .idea/modules.xml | 7 |
| .idea/vcs.xml | 5 |
| .idea/workspace.xml | 50 |
| .vscode/settings.json | 1 |
| README.md | 24 |
| client/.gitignore | 23 |
| client/README.md | 70 |
| client/package-lock.json | 36671 |
| client/package.json | 71 |
| client/public/android-chrome-192x192.png | 105 |
| client/public/android-chrome-512x512.png | 387 |
| client/public/apple-touch-icon.png | 123 |
| client/public/favicon-16x16.png | 4 |
| client/public/favicon-32x32.png | 13 |
| client/public/favicon.ico | 25 |
| client/public/image.png | 3294 |
| client/public/image1.png | 594 |
| client/public/image2.png | 2126 |
| client/public/imageItem.png | 1154 |
| client/public/index.html | 43 |
| client/public/manifest.json | 25 |
| client/public/robots.txt | 3 |
| client/src/AlgoVisual.gif | 16243 |
| client/src/App.tsx | 57 |
| client/src/api/createTutorialQuestion.tsx | 18 |
| client/src/api/deleteCourse.tsx | 16 |
| client/src/api/deleteQuestion.tsx | 16 |
| client/src/api/deleteTestcase.tsx | 16 |
| client/src/api/fetchAPI.tsx | 18 |
| client/src/api/fetchAllAttempts.tsx | 15 |
| client/src/api/fetchAllCourses.tsx | 15 |
| client/src/api/fetchAllQuestions.tsx | 15 |
| client/src/api/fetchAllSubscribers.tsx | 17 |
| client/src/api/fetchAllTestcases.tsx | 15 |
| client/src/api/fetchAllUsers.tsx | 15 |
| client/src/api/fetchAttempt.ts | 21 |
| client/src/api/pollJudge0ForResult.ts | 18 |
| client/src/api/pollJudge0ForSubmission.ts | 42 |
| client/src/api/saveAttempt.ts | 14 |
| client/src/api/sendQuestionNotifications.tsx | 12 |
| client/src/api/submitSourceCode.ts | 43 |
| client/src/api/subscribe.tsx | 21 |
| client/src/api/unsubscribe.tsx | 25 |
| client/src/api/updateAttempt.ts | 27 |
| client/src/api/updateStatus.ts | 24 |
| client/src/components/AccordionRows.tsx | 39 |
| client/src/components/AccordionRowsStandard.tsx | 38 |
| client/src/components/AlgoVisualFunctionBar.jsx | 95 |
| client/src/components/AlgoVisualPathFinder.jsx | 450 |
| client/src/components/AlgoVisualSortChart.jsx | 45 |
| client/src/components/AlgoVisualSortFunctionBar.jsx | 84 |
| client/src/components/AlgoVisualSorter.jsx | 438 |
| client/src/components/Announcements.tsx | 26 |
| client/src/components/CodeQuestion.tsx | 66 |
| client/src/components/FirstSection.tsx | 60 |
| client/src/components/Footer.tsx | 95 |
| client/src/components/FullScreenSection.tsx | 29 |
| client/src/components/FunctionBar.css | 48 |
| client/src/components/GraphComponent.tsx | 91 |
| client/src/components/Grid.css | 99 |
| client/src/components/Grid.jsx | 19 |
| client/src/components/Header.tsx | 80 |
| client/src/components/IntroComponent.tsx | 52 |
| client/src/components/LogOutButton.tsx | 13 |
| client/src/components/LoginButton.tsx | 12 |
| client/src/components/MonacoEditor.tsx | 443 |
| client/src/components/MyCarousel.tsx | 52 |
| client/src/components/Node.jsx | 75 |
| client/src/components/PathLegend.tsx | 22 |
| client/src/components/RedirectToHome.tsx | 24 |
| client/src/components/SecondSection.tsx | 89 |
| client/src/components/SortFunctionBar.css | 46 |
| client/src/components/SortLegend.tsx | 16 |
| client/src/components/SuccessModal.tsx | 32 |
| client/src/components/ThirdSection.tsx | 89 |
| client/src/components/TutorialQuestion.tsx | 44 |
| client/src/components/VideoPlayer.tsx | 45 |
| client/src/helper/arraysEqual.ts | 6 |
| client/src/helper/cDefault.ts | 16 |
| client/src/helper/cDriver.ts | 22 |
| client/src/helper/cppDefault.ts | 10 |
| client/src/helper/cppDriver.ts | 8 |
| client/src/helper/pythonDefault.ts | 4 |
| client/src/helper/pythonDriver.ts | 8 |
| client/src/index.css | 13 |
| client/src/index.tsx | 30 |
| client/src/pages/Accounts.tsx | 199 |
| client/src/pages/Admin.tsx | 98 |
| client/src/pages/AdminCourse.tsx | 170 |
| client/src/pages/AdminDatabase.tsx | 26 |
| client/src/pages/AdminDelete.tsx | 129 |
| client/src/pages/AdminQuestion.tsx | 170 |
| client/src/pages/AdminTestcase.tsx | 192 |
| client/src/pages/AdminTownhall.tsx | 50 |
| client/src/pages/AlgoVisual.css | 50 |
| client/src/pages/AlgoVisual.tsx | 71 |
| client/src/pages/AlgoVisualOpening.tsx | 25 |
| client/src/pages/Concepts.tsx | 194 |
| client/src/pages/Error404.tsx | 10 |
| client/src/pages/Home.tsx | 62 |
| client/src/pages/HomeLoggedIn.tsx | 296 |
| client/src/pages/Landing.tsx | 17 |
| client/src/pages/MonacoCode.tsx | 183 |
| client/src/pages/PerformancePage.tsx | 50 |
| client/src/pages/Townhall.tsx | 120 |
| client/src/pages/Tutorials.tsx | 112 |
| client/src/pages/basic.tsx | 10 |
| client/src/pathFinding.gif | 4493 |
| client/src/react-app-env.d.ts | 1 |
| client/src/reportWebVitals.ts | 15 |
| client/src/serviceWorker.ts | 146 |
| client/src/setupTests.ts | 5 |
| client/src/types/AccordionRowsProps.ts | 9 |
| client/src/types/AccordionRowsStandardProps.ts | 9 |
| client/src/types/ItemType.ts | 9 |
| client/src/types/QnType.ts | 9 |
| client/src/types/SaveAttemptDataProps.ts | 8 |
| client/src/types/StaticItemType.ts | 9 |
| client/src/types/TestCaseType.ts | 11 |
| client/src/types/loginFormDataProps.ts | 3 |
| client/src/types/signUpFormDataProps.ts | 6 |
| client/src/types/subscriberFormDataProps.ts | 2 |
| client/src/util/Buffer.js | 33 |
| client/src/util/GraphAlgorithms.js | 182 |
| client/src/util/GridDraw.js | 41 |
| client/src/util/MazeGenerationAlgorithms.js | 93 |
| client/src/util/PriorityQueue.js | 77 |
| client/src/util/SortBuffer.js | 35 |
| client/src/util/SortingAlgorithms.js | 190 |
| client/src/util/TownHallUtil.ts | 9 |
| client/tsconfig.json | 27 |
| client/webpack.config.js | 8 |
| gnulicense | 673 |
| license | 695 |
| server/.DS_Store | 3 |
| server/.env | 2 |
| server/.gitignore | 1 |
| server/configs/env.go | 17 |
| server/configs/setup.go | 65 |
| server/controllers/attempt_controller.go | 293 |
| server/controllers/course_controller.go | 259 |
| server/controllers/settings_controller.go | 63 |
| server/controllers/staticCourse_controller.go | 117 |
| server/controllers/subscriber_controller.go | 211 |
| server/controllers/testcase_controller.go | 211 |
| server/controllers/tutorial_controller.go | 225 |
| server/controllers/user_controller.go | 321 |
| server/data/requests/create_attempt_request.go | 12 |
| server/data/requests/create_course_request.go | 13 |
| server/data/requests/create_question_request.go | 12 |
| server/data/requests/create_subscriber_request.go | 6 |
| server/data/requests/create_testCases_request.go | 15 |
| server/data/requests/create_user_request.go | 17 |
| server/data/requests/create_video_request.go | 5 |
| server/data/requests/delete_question_request.go | 7 |
| server/data/requests/delete_subscriber_request.go | 7 |
| server/data/requests/delete_testCases_request.go | 6 |
| server/data/requests/edit_question_request.go | 12 |
| server/data/requests/edit_testCases_request.go | 7 |
| server/data/requests/edit_user_request.go | 11 |
| server/data/requests/get_question_request.go | 9 |
| server/data/requests/get_subscriber_request.go | 8 |
| server/data/requests/get_testCases_request.go | 7 |
| server/data/requests/get_user_request.go | 9 |
| server/data/requests/login_request.go | 9 |
| server/data/requests/update_attempt_request.go | 12 |
| server/data/requests/update_course_request.go | 13 |
| server/data/requests/update_question_request.go | 14 |
| server/data/requests/update_status_request.go | 10 |
| server/data/requests/update_testCases_request.go | 10 |
| server/data/requests/update_user_request.go | 11 |
| server/data/responses/attempt_response.go | 7 |
| server/data/responses/course_response.go | 7 |
| server/data/responses/response.go | 7 |
| server/data/responses/subscriber_response.go | 7 |
| server/data/responses/testCase_response.go | 7 |
| server/data/responses/tutorial_response.go | 7 |
| server/data/responses/user_response.go | 7 |
| server/docs/docs.go | 1166 |
| server/docs/swagger.json | 1141 |
| server/docs/swagger.yaml | 767 |
| server/go.mod | 29 |
| server/go.sum | 294 |
| server/helper/error.go | 6 |
| server/main | 62671 |
| server/main.go | 48 |
| server/models/attempt_model.go | 16 |
| server/models/course_model.go | 17 |
| server/models/metric_model.go | 12 |
| server/models/settings_model.go | 10 |
| server/models/staticCourse_model.go | 17 |
| server/models/status_model.go | 10 |
| server/models/subscriber_model.go | 11 |
| server/models/testCase_model.go | 20 |
| server/models/tutorial_model.go | 16 |
| server/models/user_model.go | 14 |
| server/models/video_model.go | 5 |
| server/routes/attempt_routes.go | 25 |
| server/routes/course_routes.go | 23 |
| server/routes/settings_routes.go | 13 |
| server/routes/staticCourse_routes.go | 15 |
| server/routes/subscriber_routes.go | 21 |
| server/routes/testCase_routes.go | 22 |
| server/routes/tutorial_routes.go | 23 |
| server/routes/user_routes.go | 25 |
| server/server | 97314 |
| server/service/StaticCourseService.go | 14 |
| server/service/attemptService.go | 12 |
| server/service/coursesService.go | 16 |
| server/service/settingsService.go | 11 |
| server/service/subscriberService.go | 14 |
| server/service/testCaseService.go | 14 |
| server/service/tutorialService.go | 14 |
| server/service/usersService.go | 15 |
| **Total** | **239959** |

