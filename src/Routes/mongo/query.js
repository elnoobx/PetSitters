db.states.aggregate([
    {
        $match: {
            "_id": ObjectId("62d969dc1887ef93cf897550")
        }
    },
    {
        $lookup: {
            from: "cities",
            localField: "_id",
            foreignField: "state",
            as: "city"
        }
    },
    {
        $unwind:
        {
            path: "$city",
            preserveNullAndEmptyArrays: true
        }
    },
    {
        $lookup: {
            from: "petsitters",
            localField: "city._id",
            foreignField: "cityId",
            as: "petsitters"
        }
    },
    {
        $unwind:
        {
            path: "$petsitters",
            preserveNullAndEmptyArrays: true
        }
    },
])