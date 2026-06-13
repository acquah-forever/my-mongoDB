async (req, res, next) => {
    try {
        // throw Error("trums")
        const notes = await Note.find().exec();
        res.status(200).json(notes);
    } catch (error) {
        next(error);
    }
}