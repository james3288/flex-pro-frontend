# Graph Report - frontend  (2026-08-30)

## Corpus Check
- 321 files · ~423,173 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 934 nodes · 2444 edges · 67 communities (64 shown, 3 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 30 edges (avg confidence: 0.8)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `3722cea1`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

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
- [[_COMMUNITY_Community 60|Community 60]]
- [[_COMMUNITY_Community 61|Community 61]]
- [[_COMMUNITY_Community 62|Community 62]]
- [[_COMMUNITY_Community 63|Community 63]]
- [[_COMMUNITY_Community 64|Community 64]]
- [[_COMMUNITY_Community 65|Community 65]]
- [[_COMMUNITY_Community 66|Community 66]]

## God Nodes (most connected - your core abstractions)
1. `remainingDays()` - 77 edges
2. `instance` - 75 edges
3. `$()` - 60 edges
4. `getSubscriptionDaysLeft()` - 53 edges
5. `getExtendedSubscription()` - 43 edges
6. `loadImageData()` - 41 edges
7. `getImagePath()` - 39 edges
8. `FormatDate()` - 32 edges
9. `formatTime()` - 27 edges
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

## Communities (67 total, 3 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.09
Nodes (56): ClientsOnline(), useFaceScannerNew(), FaceScanner(), FaceScannerNew(), ForRenewal(), getRemainingDaysLeftRaw(), CheckIfAlreadyIn(), getActiveAndInactiveUsers() (+48 more)

### Community 1 - "Community 1"
Cohesion: 0.06
Nodes (45): DayPassClientsOnline(), UserDayPassLogout(), UserLogout(), ClientsOnWorkout(), ClientsOnWorkoutDayPass(), ClientsOnWorkoutNew(), RemainingDaysComponent, LogoutButton (+37 more)

### Community 2 - "Community 2"
Cohesion: 0.13
Nodes (22): ExpiredUserItem(), AddButton, ExtendedTrainerDetails, getExtendedTrainerLabel(), iconButtonStyle, isMembership(), PersonalTrainerComponents(), RecyleBinIcon (+14 more)

### Community 3 - "Community 3"
Cohesion: 0.05
Nodes (33): getExtendedTrainerHistory(), getExtendedTrainerReport(), PT(), getSubscriptionReportByFreeTrainer(), getUserSubscriptionReport(), getUserSubscriptionReportByAll(), getter(), useOnWorkOutDataByDateRange() (+25 more)

### Community 4 - "Community 4"
Cohesion: 0.10
Nodes (27): ActiveUserPage(), ClientsOnWorkoutPage(), PageName, ExpiredUserPage(), ForRenewalPage(), MainLayout(), MainLayoutNew(), MyHeader() (+19 more)

### Community 5 - "Community 5"
Cohesion: 0.16
Nodes (11): { checkCredential }, ExtendSubscriptionModal(), SubscriptionComponents(), useCheckCredential(), useClearPasswordTextField(), useExtendSubscriptionModal(), { checkCredential }, CheckCredentialModal() (+3 more)

### Community 6 - "Community 6"
Cohesion: 0.16
Nodes (14): Cameras(), videoConstraints, MyUserImageRegSection(), AgreementContext, AgreementProvider(), getAgreements(), MyUserRegistrationSection(), initialFormData (+6 more)

### Community 7 - "Community 7"
Cohesion: 0.04
Nodes (45): dependencies, axios, bootstrap, dayjs, @emotion/react, @emotion/styled, face-api.js, framer-motion (+37 more)

### Community 8 - "Community 8"
Cohesion: 0.08
Nodes (31): ActiveUserComponent(), ClientsOnWorkoutComponent(), ExpiredUserComponent(), headerStyle, PersonalTrainerComponent(), RenewalComponent(), DashboardContext, DashboardProvider() (+23 more)

### Community 9 - "Community 9"
Cohesion: 0.14
Nodes (13): getUsers(), Loader3(), PdfGenerator(), styles, formReducer(), INITIAL_STATE, MyUsers(), useUsersInfrastructure() (+5 more)

### Community 10 - "Community 10"
Cohesion: 0.13
Nodes (9): $(), ae(), ct(), et(), fe(), Je(), lt(), Qe() (+1 more)

### Community 11 - "Community 11"
Cohesion: 0.12
Nodes (11): Loading6(), style1, style2, StaffBypassModal(), AlreadyLoginStatus, CheckStatus, ScanLoading, UserInfo (+3 more)

### Community 12 - "Community 12"
Cohesion: 0.17
Nodes (11): useToastifyMessageComponent(), RemainingDaysLeftComponent(), useLoginModal(), useToastifyMessage(), NumpadButton(), isMembership(), ListOfUserSubscriptionComponent, MembershipComponent (+3 more)

### Community 13 - "Community 13"
Cohesion: 0.14
Nodes (11): BackToDashboardButton(), RefreshSubscription(), SubscribedButton(), SessionDaysField(), ListOfTrainers, ListOfUsers(), useUsersServices(), isObjectNotEmpty() (+3 more)

### Community 14 - "Community 14"
Cohesion: 0.15
Nodes (14): DayPassUser(), updateDayPassPersonalTrainer(), deleteDayPassPT(), getDaypassUser(), getDayPassUserOnline2(), DayPassAddTrainerModal(), DayPassLoginModal(), DpUserInfo() (+6 more)

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
Cohesion: 0.17
Nodes (11): NeonCheckBox(), useGetDayPassActiveUsers(), useGetDayPassUsers(), useGetUserWithImage(), useLoginUsers(), useMyUserLoginSection(), useResetLogin(), Loading4() (+3 more)

### Community 19 - "Community 19"
Cohesion: 0.32
Nodes (7): FaceScannerNew3(), useFaceDetectionLogic(), useGetLabelFaceDescription(), useLoginAttempt(), initialState, useCurrentlyLoginStore, useGetIdFromCurrentlyLogin()

### Community 20 - "Community 20"
Cohesion: 0.27
Nodes (10): de(), Ie(), le(), m(), N(), Re(), ve(), W() (+2 more)

### Community 21 - "Community 21"
Cohesion: 0.18
Nodes (8): ExtendSubscriptionModal2(), ActiveMembershipComponent(), MyRenewalUser(), RenewalUsers(), useGetActiveMembership(), MembershipUser(), initialState, useMembershipStore

### Community 22 - "Community 22"
Cohesion: 0.23
Nodes (9): MyActiveUser(), UseDashBoard(), useDashBoardHook(), MyExpiredUser(), LoadingEffect(), MyUserDaypassLoginSection, MyUserLoginSection, NoDataFound() (+1 more)

### Community 23 - "Community 23"
Cohesion: 0.24
Nodes (10): be(), Ee(), ge(), he(), ne(), oe(), P(), se() (+2 more)

### Community 24 - "Community 24"
Cohesion: 0.44
Nodes (6): a(), i(), n(), o(), r(), t()

### Community 25 - "Community 25"
Cohesion: 0.23
Nodes (8): getSuscriptionPackages(), MySubscribedNow(), useMembershipServices(), useSubscribeNowServices(), ListOfPackages(), ListOfSubscriptions(), MySubscriptionPlan(), SubscriptionModal()

### Community 26 - "Community 26"
Cohesion: 0.26
Nodes (6): extendNewSubscription(), updateExtendSubscription(), getSpecificExtendedSubscription(), getSubscriptions(), extendSubscriptionReducer(), INITIAL_STATE

### Community 28 - "Community 28"
Cohesion: 0.17
Nodes (10): Backend coupling (critical), Commands, Duplication / legacy (check before adding), Git Workflow, Global Agent Rules (team-wide, always apply), Mandatory, Other gotchas, Path aliases (Vite) (+2 more)

### Community 29 - "Community 29"
Cohesion: 0.40
Nodes (5): a(), k(), t(), ut(), xt()

### Community 32 - "Community 32"
Cohesion: 0.67
Nodes (3): C(), jt(), x()

### Community 33 - "Community 33"
Cohesion: 0.50
Nodes (4): ce(), me(), e(), f()

### Community 60 - "Community 60"
Cohesion: 0.18
Nodes (9): Backend coupling (critical), Commands, Data & state architecture, Duplication / legacy (check before adding), Git workflow, Other gotchas, Path aliases (Vite, `vite.config.js`), Routing / pages (+1 more)

### Community 61 - "Community 61"
Cohesion: 0.36
Nodes (6): FaceScannerNew2(), useFaceApiModel(), useGetActiveAndInactiveUsers(), useVideoCapture(), initialState, useActiveCameraStore

### Community 62 - "Community 62"
Cohesion: 0.33
Nodes (4): { checkCredential }, RemoveExtendedSub(), deleteExtendedSub(), deleteExtendedTrainer()

### Community 63 - "Community 63"
Cohesion: 0.25
Nodes (7): Agent Session — 2026-08-16 (part 2: face-recognition performance fix), Branch, Commands run, Files changed, Goal, Status, Testing / verification

### Community 64 - "Community 64"
Cohesion: 0.32
Nodes (3): deleteUser(), { checkCredential }, DeleteUserModal()

### Community 65 - "Community 65"
Cohesion: 0.46
Nodes (4): useCheckIfAlreadyLogin(), useFetchLoginUser(), useLoginMutation(), useSaveTimeRecords()

### Community 66 - "Community 66"
Cohesion: 0.39
Nodes (5): useUserLoginModalNumpad(), initialState, useNumpadStore, initialState, useLoginWithoutCameraStore

## Knowledge Gaps
- **148 isolated node(s):** `name`, `private`, `version`, `type`, `dev` (+143 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **3 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `instance` connect `Community 0` to `Community 64`, `Community 1`, `Community 65`, `Community 3`, `Community 6`, `Community 9`, `Community 13`, `Community 14`, `Community 15`, `Community 16`, `Community 25`, `Community 26`, `Community 62`?**
  _High betweenness centrality (0.077) - this node is a cross-community bridge._
- **Why does `remainingDays()` connect `Community 0` to `Community 1`, `Community 2`, `Community 3`, `Community 8`, `Community 12`, `Community 14`, `Community 18`?**
  _High betweenness centrality (0.041) - this node is a cross-community bridge._
- **Why does `FormatDate()` connect `Community 1` to `Community 0`, `Community 2`, `Community 3`, `Community 5`, `Community 9`, `Community 14`, `Community 21`?**
  _High betweenness centrality (0.030) - this node is a cross-community bridge._
- **Are the 2 inferred relationships involving `$()` (e.g. with `afterClose()` and `afterOpen()`) actually correct?**
  _`$()` has 2 INFERRED edges - model-reasoned connections that need verification._
- **What connects `name`, `private`, `version` to the rest of the system?**
  _148 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `Community 0` be split into smaller, more focused modules?**
  _Cohesion score 0.08881163084702907 - nodes in this community are weakly interconnected._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.06060606060606061 - nodes in this community are weakly interconnected._