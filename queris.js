// 1.Find all the topics and tasks which are thought in the month of October
db.tasks.aggregate([
    {
        $match: { month: "October" },
    },
    {
        $project: {
            _id: 0,
            task_name: 1,
            topic_title: 1,
        }
    }
]);

// 2.Find all the company drives which appeared between 15 oct-2020 and 31-oct-2020
db.company_drives.aggregate([
    {
        $match: { drive_date: { $lte: "2020-10-31", $gte: "2020-10-15" } },
    },
    {
        $project: {
            _id: 0,
            company_name: 1,
        }
    }
]);

// 3.Find all the company drives and students who are appeared for the placement.
db.company_drives.aggregate([
    {
        $project: {
            _id: 0,
            company_name: 1,
            student_appeared: 1,

        }
    }
]);

// 4.Find the number of problems solved by the user in codekata
db.codekata.aggregate([
    {
        $group: {
            _id: '$userid',
            problems_solved: { $sum: "$code_completed_count" }
        }
    }
]);


// 5.Find all the mentors with who has the mentee's count more than 15
db.mentor.aggregate([
    {
        $match: {
            mentees_count: { $gte: 15 },
        }
    },
    {
        $project: {
            _id: 0,
            mentor_name: 1,
            mentees_count: 1,
        }
    }
]);

// 6.Find the number of users who are absent and task is not submitted  between 15 oct-2020 and 31-oct-2020
db.attendance.aggregate([
    {
        $match: {
            present: "true",
            date: { $gte: "2020-10-15", $lte: "2020-10-31" }
        }
    },
    {
        $group: {
            _id: "$userid",
            number_of_students: { $count: {} }
        }
    },
]);
