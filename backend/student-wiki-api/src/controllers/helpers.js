
export const unauthorizedUser = (res) => {
    return res.status(401).json({
        success: false,
        message: "unauthorized user"
    });
}