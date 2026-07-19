# Graph Report - .  (2026-06-14)

## Corpus Check
- 340 files · ~420,435 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 894 nodes · 2391 edges · 60 communities (56 shown, 4 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 29 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- [[_COMMUNITY_Community 0|Community 0]]
- [[_COMMUNITY_Community 1|Community 1]]
- [[_COMMUNITY_Community 2|Community 2]]
- [[_COMMUNITY_Community 3|Community 3]]
- [[_COMMUNITY_Community 4|Community 4]]
- [[_COMMUNITY_Community 5|Community 5]]
- [[_COMMUNITY_Community 6|Community 6]]
- [[_COMMUNITY_Community 7|Community 7]]
- [[_COMMUNITY_Community 8|Community 8]]
- [[_COMMUNITY_Community 9|Community 9]]
- [[_COMMUNITY_Community 10|Community 10]]
- [[_COMMUNITY_Community 11|Community 11]]
- [[_COMMUNITY_Community 12|Community 12]]
- [[_COMMUNITY_Community 13|Community 13]]
- [[_COMMUNITY_Community 14|Community 14]]
- [[_COMMUNITY_Community 15|Community 15]]
- [[_COMMUNITY_Community 16|Community 16]]
- [[_COMMUNITY_Community 17|Community 17]]
- [[_COMMUNITY_Community 18|Community 18]]
- [[_COMMUNITY_Community 19|Community 19]]
- [[_COMMUNITY_Community 20|Community 20]]
- [[_COMMUNITY_Community 21|Community 21]]
- [[_COMMUNITY_Community 22|Community 22]]
- [[_COMMUNITY_Community 23|Community 23]]
- [[_COMMUNITY_Community 24|Community 24]]
- [[_COMMUNITY_Community 25|Community 25]]
- [[_COMMUNITY_Community 26|Community 26]]
- [[_COMMUNITY_Community 27|Community 27]]
- [[_COMMUNITY_Community 28|Community 28]]
- [[_COMMUNITY_Community 29|Community 29]]
- [[_COMMUNITY_Community 30|Community 30]]
- [[_COMMUNITY_Community 32|Community 32]]
- [[_COMMUNITY_Community 33|Community 33]]
- [[_COMMUNITY_Community 34|Community 34]]

## God Nodes (most connected - your core abstractions)
1. `remainingDays()` - 77 edges
2. `instance` - 75 edges
3. `$()` - 60 edges
4. `getSubscriptionDaysLeft()` - 53 edges
5. `getExtendedSubscription()` - 43 edges
6. `loadImageData()` - 41 edges
7. `getImagePath()` - 39 edges
8. `FormatDate()` - 31 edges
9. `formatTime()` - 26 edges
10. `getExtendedTrainer()` - 22 edges

## Surprising Connections (you probably didn't know these)
- `afterClose()` --calls--> `$()`  [INFERRED]
  src/assets/js/jquery.slicknav.js → src/assets/js/jquery-3.3.1.min.js
- `afterOpen()` --calls--> `$()`  [INFERRED]
  src/assets/js/jquery.slicknav.js → src/assets/js/jquery-3.3.1.min.js
- `formatTimeOut()` --calls--> `formatTimeToString()`  [INFERRED]
  src/pages/reportPage/ByClientsOnWorkout.jsx → src/others/formatTimeToString.js
- `a()` --calls--> `l()`  [INFERRED]
  src/assets/js/jquery-3.3.1.min.js → src/assets/js/bootstrap.min.js
- `o()` --calls--> `G()`  [INFERRED]
  src/assets/js/bootstrap.min.js → src/assets/js/jquery-3.3.1.min.js

## Import Cycles
- None detected.

## Communities (60 total, 4 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.09
Nodes (53): ClientsOnline(), useFaceScannerNew(), FaceScanner(), FaceScannerNew(), ForRenewal(), getRemainingDaysLeftRaw(), CheckIfAlreadyIn(), getActiveAndInactiveUsers() (+45 more)

### Community 1 - "Community 1"
Cohesion: 0.06
Nodes (42): DayPassClientsOnline(), UserDayPassLogout(), UserLogout(), ClientsOnWorkout(), ClientsOnWorkoutDayPass(), ClientsOnWorkoutNew(), RemainingDaysComponent, LogoutButton (+34 more)

### Community 2 - "Community 2"
Cohesion: 0.06
Nodes (40): ExtendSubscriptionModal2(), MyActiveUser(), DayPassUser(), ExpiredUserItem(), ActiveMembershipComponent(), MyRenewalUser(), AddButton, ExtendedTrainerDetails (+32 more)

### Community 3 - "Community 3"
Cohesion: 0.06
Nodes (27): getSubscriptionReportByFreeTrainer(), getUserSubscriptionReport(), getUserSubscriptionReportByAll(), getter(), useOnWorkOutDataByDateRange(), Loading5(), GenerateReportModal(), animatedComponents (+19 more)

### Community 4 - "Community 4"
Cohesion: 0.10
Nodes (27): ActiveUserPage(), ClientsOnWorkoutPage(), PageName, ExpiredUserPage(), ForRenewalPage(), MainLayout(), MainLayoutNew(), MyHeader() (+19 more)

### Community 5 - "Community 5"
Cohesion: 0.07
Nodes (24): extendNewSubscription(), { checkCredential }, ExtendSubscriptionModal(), { checkCredential }, RemoveExtendedSub(), updateExtendSubscription(), deleteExtendedSub(), deleteExtendedTrainer() (+16 more)

### Community 6 - "Community 6"
Cohesion: 0.08
Nodes (29): Cameras(), videoConstraints, MyUserImageRegSection(), AgreementContext, AgreementProvider(), UseDashBoard(), useDashBoardHook(), MyExpiredUser() (+21 more)

### Community 7 - "Community 7"
Cohesion: 0.04
Nodes (45): dependencies, axios, bootstrap, dayjs, @emotion/react, @emotion/styled, face-api.js, framer-motion (+37 more)

### Community 8 - "Community 8"
Cohesion: 0.08
Nodes (29): ActiveUserComponent(), ExpiredUserComponent(), headerStyle, PersonalTrainerComponent(), RenewalComponent(), DashboardContext, DashboardProvider(), DashboardPageNew() (+21 more)

### Community 9 - "Community 9"
Cohesion: 0.13
Nodes (14): getUsers(), Loader3(), Loading4(), PdfGenerator(), styles, formReducer(), INITIAL_STATE, MyUsers() (+6 more)

### Community 10 - "Community 10"
Cohesion: 0.13
Nodes (9): $(), ae(), ct(), et(), fe(), Je(), lt(), Qe() (+1 more)

### Community 11 - "Community 11"
Cohesion: 0.16
Nodes (10): useCheckIfAlreadyLogin(), useFetchLoginUser(), useLoginMutation(), useSaveTimeRecords(), Loading6(), AlreadyLoginStatus, CheckStatus, ScanLoading (+2 more)

### Community 12 - "Community 12"
Cohesion: 0.16
Nodes (13): useUserLoginModalNumpad(), useVideoCapture(), isMembership(), ListOfUserSubscriptionComponent, MembershipComponent, PrivateRemainingDays(), UserLoginIDVerificationModal, initialState (+5 more)

### Community 13 - "Community 13"
Cohesion: 0.14
Nodes (11): BackToDashboardButton(), RefreshSubscription(), SubscribedButton(), SessionDaysField(), ListOfTrainers, ListOfUsers(), useUsersServices(), isObjectNotEmpty() (+3 more)

### Community 14 - "Community 14"
Cohesion: 0.20
Nodes (11): updateDayPassPersonalTrainer(), deleteDayPassPT(), getDayPassUserOnline2(), useGetUserWithImage(), useMyUserLoginSection(), useResetLogin(), DayPassAddTrainerModal(), RemoveModal() (+3 more)

### Community 15 - "Community 15"
Cohesion: 0.17
Nodes (9): deleteTrainer(), formReducer(), INITIAL_STATE, DeleteTrainerModal(), MyTrainors(), SaveTrainers(), Trainers(), TrainersModal() (+1 more)

### Community 16 - "Community 16"
Cohesion: 0.21
Nodes (10): AddTrainerModal(), extendPersonalTrainer(), updateExtendedTrainer(), updatePersonalTrainer(), getSpecificExtendedTrainer(), getSpecificUserSubscription(), getTrainors(), FormatDateISO() (+2 more)

### Community 17 - "Community 17"
Cohesion: 0.18
Nodes (13): e(), i(), l(), n(), o(), s(), t(), we() (+5 more)

### Community 18 - "Community 18"
Cohesion: 0.27
Nodes (6): NeonCheckBox(), useGetDayPassActiveUsers(), useGetDayPassUsers(), AlreadyLoginStatus, CheckStatus, ScanLoadingNew()

### Community 19 - "Community 19"
Cohesion: 0.32
Nodes (7): FaceScannerNew3(), useFaceDetectionLogic(), useGetLabelFaceDescription(), useLoginAttempt(), initialState, useCurrentlyLoginStore, useGetIdFromCurrentlyLogin()

### Community 20 - "Community 20"
Cohesion: 0.23
Nodes (12): ce(), de(), Ie(), le(), m(), me(), N(), Re() (+4 more)

### Community 21 - "Community 21"
Cohesion: 0.33
Nodes (6): useToastifyMessageComponent(), RemainingDaysLeft2(), RemainingDaysLeftComponent(), useRemainingDaysLeft(), useToastifyMessage(), RemainingDaysLeftComponent()

### Community 22 - "Community 22"
Cohesion: 0.38
Nodes (5): FaceScannerNew2(), useFaceApiModel(), useGetActiveAndInactiveUsers(), LoadingEffect(), NoDataFound()

### Community 23 - "Community 23"
Cohesion: 0.24
Nodes (10): be(), Ee(), ge(), he(), ne(), oe(), P(), se() (+2 more)

### Community 24 - "Community 24"
Cohesion: 0.44
Nodes (6): a(), i(), n(), o(), r(), t()

### Community 25 - "Community 25"
Cohesion: 0.32
Nodes (4): style1, style2, CheckCircleFillSvg(), ExclamationSvg()

### Community 26 - "Community 26"
Cohesion: 0.43
Nodes (4): GETDATA(), useLoginModal(), NumpadButton(), UserLoginModal2()

### Community 28 - "Community 28"
Cohesion: 0.70
Nodes (3): getDaypassUser(), DayPassLoginModal(), postDayPassTimeRecords()

### Community 29 - "Community 29"
Cohesion: 0.40
Nodes (5): a(), k(), t(), ut(), xt()

### Community 32 - "Community 32"
Cohesion: 0.67
Nodes (3): C(), jt(), x()

## Knowledge Gaps
- **123 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+118 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `instance` connect `Community 0` to `Community 1`, `Community 2`, `Community 3`, `Community 5`, `Community 6`, `Community 9`, `Community 11`, `Community 13`, `Community 14`, `Community 15`, `Community 16`, `Community 18`, `Community 28`?**
  _High betweenness centrality (0.083) - this node is a cross-community bridge._
- **Why does `remainingDays()` connect `Community 0` to `Community 1`, `Community 2`, `Community 8`, `Community 18`, `Community 21`, `Community 28`?**
  _High betweenness centrality (0.044) - this node is a cross-community bridge._
- **Why does `FormatDate()` connect `Community 2` to `Community 0`, `Community 1`, `Community 3`, `Community 5`, `Community 9`?**
  _High betweenness centrality (0.033) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `$()` (e.g. with `afterClose()` and `afterOpen()`) actually correct?**
  _`$()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _123 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.09433962264150944 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.06012176560121765 - nodes in this community are weakly interconnected._