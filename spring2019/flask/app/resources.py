training_data = [
    ("How do I join ACC?",                              "CLUB_MEMBERSHIP"),
    ("Do I have to go to meetings to be in the club?",  "CLUB_MEMBERSHIP"),
    ("Is it okay if I don't go to meetings?",           "CLUB_MEMBERSHIP"),
    ("Do I have to pay any dues to be in ACC?",         "CLUB_MEMBERSHIP"),
    ("Do I have to be a cs major to be in ACC?",        "CLUB_MEMBERSHIP"),
    ("Can I join if I'm not in computer science?",      "CLUB_MEMBERSHIP"),
    ("When is the next meeting?",                   "MEETING_TIME"),
    ("When are meetings?",                          "MEETING_TIME"),
    ("What time is the meeting?",                   "MEETING_TIME"),
    ("When are projects assigned?",                 "PROJECTS"),
    ("How do I join a project?",                    "PROJECTS"),
    ("Can I switch projects?",                      "PROJECTS"),
    ("How do I change to another project?",         "PROJECTS"),
    ("Can I move to a different project?",          "PROJECTS"),
    ("Do I need experience to join a project?",     "PROJECTS"),
    ("Where can I find the repository for workshops?", "WORKSHOPS"),
    ("What is the next workshop going to be?",         "WORKSHOPS"),
    ("I missed some of the workshops and I'm behind",  "WORKSHOPS"),
    ("I want to learn more about coding",              "WORKSHOPS")
]

intent = {
    "CLUB_MEMBERSHIP": {
        "contact": "Gabriel Britain",
        "reply": (
            "All it takes to be a member of ACC is to join our Slack and email"
            " list! You don't need any prior experience in programming, and you"
            " do not have to be a computer science major. There are no dues, and"
            " you don't have to be at every meeting."
        )
    },

    "MEETING_TIME": {
        "contact": "Gabriel Britain",
        "reply": (
            "Aggie Coding Club general meetings are every Monday 7-8 p.m. followed"
            " by a workshop 8-9 p.m. in HRBB 113."
        )
    },

    "PROJECTS": {
        "contact": "Feras Khemakhem",
        "reply": (
            "Projects are assigned around a month after the semester begins. Keep"
            " an eye out for sign ups or message Feras Khemakhem"
        )
    },

    "WORKSHOPS": {
        "contact": "Edgar Martinez",
        "reply": (
            "You can find the workshop repository on the ACC github. It should "
            "include all the instructions you need to catch up on the readme. "
            "Workshops are from 8-9 p.m. in HRBB 113."
        )
    }
}