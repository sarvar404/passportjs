import User from '../model/user.js';

export const register = async (request, response) => {

    const user = await User.findOne({username: request.body.username});

    if (user) return response.status(400).send("User Already Exists");

    const newUser = new User(request.body);

    try {
        const onceResponse = await newUser.save();
        response.status(200).json(
            {
                success : true,
                message : "registeration is done",
                data : onceResponse
            }
        );
    } catch (error) {
        
        response.status(500).json({
            success : false,
            message : error.message + " error while registering",
        })

    }

}

export const login = async (request, response) => {
    const user = await User.findOne({username: request.body.username});
}